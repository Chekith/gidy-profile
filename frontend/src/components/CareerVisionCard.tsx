import { Sparkles } from 'lucide-react'
import type { Profile } from '../types'

interface Props {
  profile: Profile
}

export default function CareerVisionCard({ profile }: Props) {
  const careerTitle = profile.title || 'Head of Technology'

  return (
    <div className="bg-white dark:bg-[#0f1b2d] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs text-gray-500 dark:text-gray-400">You’re Career Vision</div>
          <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white truncate">{careerTitle}</div>
        </div>

        <button
          type="button"
          className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white/10 inline-flex items-center justify-center"
          aria-label="Career vision"
        >
          <Sparkles size={16} className="text-amber-500" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">What you’re growing into right now</div>
          <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">Entry Level Professional</div>
        </div>
        <div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">The space you want to grow in</div>
          <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">Data &amp; Analytics</div>
        </div>
        <div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">Inspired by</div>
          <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">Ratan TATA</div>
        </div>
      </div>
    </div>
  )
}
