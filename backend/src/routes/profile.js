import { Router } from 'express'
import { pool } from '../../db.js'

const router = Router()

async function replaceRows(conn, table, profileId, rows, toInsert) {
  if (!Array.isArray(rows)) return
  await conn.query(`DELETE FROM ${table} WHERE profile_id = ?`, [profileId])
  for (let i = 0; i < rows.length; i += 1) {
    const values = toInsert(rows[i], i)
    await conn.query(values.sql, values.params)
  }
}

async function getProfileRow() {
  const [rows] = await pool.query('SELECT * FROM profiles LIMIT 1')
  return rows?.[0] || null
}

router.get('/', async (_req, res) => {
  try {
    const profile = await getProfileRow()
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Seed the database.' })
    }

    const [socialLinks] = await pool.query(
      'SELECT id, platform, url, icon FROM social_links WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [profile.id]
    )

    const [skills] = await pool.query(
      'SELECT id, name, level, endorsements FROM skills WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [profile.id]
    )

    const [experience] = await pool.query(
      'SELECT company, position, duration, description FROM experience WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [profile.id]
    )

    const [education] = await pool.query(
      'SELECT school, degree, duration FROM education WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [profile.id]
    )

    return res.json({
      id: String(profile.id),
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      avatar: profile.avatar,
      location: profile.location,
      email: profile.email,
      socialLinks: socialLinks.map((x) => ({ ...x, id: String(x.id) })),
      skills: skills.map((x) => ({ ...x, id: String(x.id) })),
      experience,
      education,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.put('/', async (req, res) => {
  const { name, title, bio, avatar, location, email, socialLinks, skills, experience, education } = req.body || {}

  try {
    const profile = await getProfileRow()
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Seed the database.' })
    }

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()

      await conn.query(
        'UPDATE profiles SET name = ?, title = ?, bio = ?, avatar = ?, location = ?, email = ? WHERE id = ?',
        [name, title, bio, avatar, location, email, profile.id]
      )

      await replaceRows(conn, 'social_links', profile.id, socialLinks, (row, index) => ({
        sql: 'INSERT INTO social_links (profile_id, platform, url, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
        params: [profile.id, row.platform, row.url, row.icon || 'link', row.sort_order ?? index + 1],
      }))

      await replaceRows(conn, 'skills', profile.id, skills, (row, index) => ({
        sql: 'INSERT INTO skills (profile_id, name, level, endorsements, sort_order) VALUES (?, ?, ?, ?, ?)',
        params: [profile.id, row.name, Number(row.level ?? 50), Number(row.endorsements ?? 0), row.sort_order ?? index + 1],
      }))

      await replaceRows(conn, 'experience', profile.id, experience, (row, index) => ({
        sql: 'INSERT INTO experience (profile_id, company, position, duration, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        params: [profile.id, row.company, row.position, row.duration, row.description || '', row.sort_order ?? index + 1],
      }))

      await replaceRows(conn, 'education', profile.id, education, (row, index) => ({
        sql: 'INSERT INTO education (profile_id, school, degree, duration, sort_order) VALUES (?, ?, ?, ?, ?)',
        params: [profile.id, row.school, row.degree, row.duration, row.sort_order ?? index + 1],
      }))

      await conn.commit()
    } catch (e) {
      await conn.rollback()
      throw e
    } finally {
      conn.release()
    }

    const updated = await getProfileRow()
    const [updatedSocialLinks] = await pool.query(
      'SELECT id, platform, url, icon FROM social_links WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [updated.id]
    )
    const [updatedSkills] = await pool.query(
      'SELECT id, name, level, endorsements FROM skills WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [updated.id]
    )
    const [updatedExperience] = await pool.query(
      'SELECT company, position, duration, description FROM experience WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [updated.id]
    )
    const [updatedEducation] = await pool.query(
      'SELECT school, degree, duration FROM education WHERE profile_id = ? ORDER BY sort_order ASC, id ASC',
      [updated.id]
    )

    return res.json({
      id: String(updated.id),
      name: updated.name,
      title: updated.title,
      bio: updated.bio,
      avatar: updated.avatar,
      location: updated.location,
      email: updated.email,
      socialLinks: updatedSocialLinks.map((x) => ({ ...x, id: String(x.id) })),
      skills: updatedSkills.map((x) => ({ ...x, id: String(x.id) })),
      experience: updatedExperience,
      education: updatedEducation,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/skills/:skillId/endorse', async (req, res) => {
  const { skillId } = req.params
  try {
    await pool.query('UPDATE skills SET endorsements = endorsements + 1 WHERE id = ?', [skillId])
    const [rows] = await pool.query('SELECT id, name, level, endorsements FROM skills WHERE id = ? LIMIT 1', [skillId])
    return res.json({ ok: true, skill: rows?.[0] ? { ...rows[0], id: String(rows[0].id) } : null })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
