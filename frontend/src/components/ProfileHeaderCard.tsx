import { useMemo, useState, useEffect, useRef } from 'react'
import { Mail, Download, MoreVertical, ChevronRight } from 'lucide-react'
import type { Profile } from '../types'

interface Props {
  profile: Profile
  onEdit: () => void
}

export default function ProfileHeaderCard({ profile, onEdit }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const initials = useMemo(() => {
    const parts = (profile.name || '').trim().split(/\s+/)
    const a = parts[0]?.[0] || 'U'
    const b = parts[1]?.[0] || ''
    return (a + b).toUpperCase()
  }, [profile.name])

  return (
    <div className="bg-white dark:bg-[#0f1b2d] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-6 relative">
      <div className="absolute top-4 right-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Open menu"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-10">
              <button onClick={() => { setMenuOpen(false); onEdit() }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10">Edit Profile</button>
              <button onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10">Share Profile</button>
              <button onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10">Add Socials</button>
              <button onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10">Career Vision</button>
              <button onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10">Settings</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-10 pr-12">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-semibold text-yellow-900">{initials}</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-base font-semibold text-gray-900 dark:text-white truncate">{profile.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">( Intern )</div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <Mail size={16} className="text-blue-600" />
                <span className="truncate">{profile.email}</span>
              </div>

              <button className="w-fit inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-200 text-xs font-medium border border-blue-100 dark:border-blue-400/20 hover:bg-blue-100 dark:hover:bg-blue-500/20">
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end">
          <div className="bg-white dark:bg-[#0b1628] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 w-[220px]">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">League</div>
                <div className="mt-1 text-[12px] font-semibold text-gray-900 dark:text-white">Bronze</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">Rank</div>
                <div className="mt-1 text-[12px] font-semibold text-gray-900 dark:text-white">33</div>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">Points</div>
                <div className="mt-1 text-[12px] font-semibold text-gray-900 dark:text-white">50</div>
              </div>
            </div>
          </div>

          <a href="#" className="mt-2 inline-flex items-center gap-1 text-[12px] text-amber-600 hover:underline">
            View My Rewards
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
