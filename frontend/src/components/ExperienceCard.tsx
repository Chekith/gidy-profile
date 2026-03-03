import { Building2, Plus, MoreVertical } from 'lucide-react'
import type { Profile } from '../types'

interface Props {
  profile: Profile
}

export default function ExperienceCard({ profile }: Props) {
  return (
    <div className="bg-white dark:bg-[#0f1b2d] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">Experience</div>
        <button className="h-8 w-8 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Add experience">
          <Plus size={16} className="text-gray-700" />
        </button>
      </div>

      <div className="mt-4 divide-y divide-gray-100 dark:divide-white/10">
        {(profile.experience || []).map((exp, idx) => (
          <div key={idx} className="py-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-400/20 flex items-center justify-center">
                <Building2 size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{exp.position}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{exp.company}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">{exp.duration}</div>
              </div>
            </div>

            <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" aria-label="More">
              <MoreVertical size={16} className="text-gray-500" />
            </button>
          </div>
        ))}

        {(!profile.experience || profile.experience.length === 0) && (
          <div className="py-8 text-sm text-gray-500 dark:text-gray-400">No experience added yet.</div>
        )}
      </div>
    </div>
  )
}
