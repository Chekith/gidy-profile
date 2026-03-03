import { useState } from 'react'
import { MapPin, Mail, Briefcase, GraduationCap, Edit2, Save, X, Star, ExternalLink } from 'lucide-react'
import type { Profile } from '../types'

interface ProfileCardProps {
  profile: Profile
  isEditing: boolean
  onEdit: () => void
  onSave: (profile: Profile) => void
  onEndorseSkill: (skillId: string) => void
  onCancel: () => void
}

export default function ProfileCard({ profile, isEditing, onEdit, onSave, onEndorseSkill, onCancel }: ProfileCardProps) {
  const [editedProfile, setEditedProfile] = useState<Profile>(profile)

  const handleChange = (field: keyof Profile, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(editedProfile)
  }

  const endorseSkill = (skillId: string) => {
    onEndorseSkill(skillId)
  }

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={editedProfile.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea
              value={editedProfile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input
                type="text"
                value={editedProfile.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
            <img src={editedProfile.avatar} alt={editedProfile.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={onEdit}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 text-white"
          >
            <Edit2 size={20} />
          </button>
        </div>
      </div>

      <div className="pt-20 px-8 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{editedProfile.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{editedProfile.title}</p>
          <p className="text-gray-700 dark:text-gray-400 mt-2">{editedProfile.bio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={18} />
            <span>{editedProfile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Mail size={18} />
            <span>{editedProfile.email}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {editedProfile.skills.map(skill => (
              <div key={skill.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <button
                    onClick={() => endorseSkill(skill.id)}
                    className="flex items-center gap-1 text-xs text-yellow-600 hover:text-yellow-700"
                  >
                    <Star size={14} fill="currentColor" />
                    {skill.endorsements}
                  </button>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1 mt-1">
                  <div 
                    className="bg-blue-600 h-1 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Social Links</h3>
          <div className="flex flex-wrap gap-3">
            {editedProfile.socialLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ExternalLink size={16} />
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Briefcase size={20} />
              Experience
            </h3>
            <div className="space-y-3">
              {editedProfile.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{exp.position}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{exp.duration}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <GraduationCap size={20} />
              Education
            </h3>
            <div className="space-y-3">
              {editedProfile.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{edu.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
