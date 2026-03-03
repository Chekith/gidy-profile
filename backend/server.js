import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import profileRouter from './src/routes/profile.js'

dotenv.config()

const app = express()

app.use(cors({ origin: true }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/profile', profileRouter)

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
