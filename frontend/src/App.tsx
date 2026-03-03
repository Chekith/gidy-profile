import { useState, useEffect } from 'react'
import './App.css'
import ProfileCard from './components/ProfileCard'
import type { Profile } from './types'
import TopNav from './components/TopNav'
import ProfileHeaderCard from './components/ProfileHeaderCard'
import CareerVisionCard from './components/CareerVisionCard'
import LevelUpCard from './components/LevelUpCard'
import ExperienceCard from './components/ExperienceCard'

function App() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
        return
      }
      if (saved === 'light') {
        setDarkMode(false)
        document.documentElement.classList.remove('dark')
        return
      }

      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
      if (prefersDark) {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleEndorseSkill = async (skillId: string) => {
    try {
      await fetch(`http://localhost:3001/api/profile/skills/${skillId}/endorse`, {
        method: 'POST',
      })
      await fetchProfile()
    } catch (error) {
      console.error('Error endorsing skill:', error)
    }
  }

  const handleToggleDarkMode = () => {
    setDarkMode((v) => !v)
  }

  const handleSave = async (updatedProfile: Profile) => {
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      })
      const data = await response.json()
      setProfile(data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  return (
    <div className="h-screen bg-[#f6f7f9] dark:bg-[#0b1220] flex flex-col overflow-hidden">
      <TopNav darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

      <main className="gidy-scroll flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
        {profile && (
          <div className="space-y-5">
            <ProfileHeaderCard profile={profile} onEdit={() => setIsEditing(true)} />
            <CareerVisionCard profile={profile} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-1">
                <LevelUpCard />
              </div>
              <div className="md:col-span-2">
                <ExperienceCard profile={profile} />
              </div>
            </div>
          </div>
        )}

        </div>

        {profile && isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsEditing(false)}
            />
            <div className="relative w-full max-w-2xl">
              <ProfileCard
                profile={profile}
                isEditing={true}
                onEdit={() => setIsEditing(true)}
                onSave={handleSave}
                onEndorseSkill={handleEndorseSkill}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
