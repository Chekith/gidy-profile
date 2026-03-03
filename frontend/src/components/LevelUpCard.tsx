import { Plus } from 'lucide-react'

export default function LevelUpCard() {
  return (
    <div className="bg-white dark:bg-[#0f1b2d] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-5">
      <div className="text-sm font-semibold text-gray-900 dark:text-white">Level Up Profile</div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Just a few clicks away from awesomeness, complete your profile!</div>

      <div className="mt-4">
        <div className="text-[11px] text-gray-500 dark:text-gray-400">Progress: 80%</div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div className="h-2 bg-green-500" style={{ width: '80%' }} />
        </div>
      </div>

      <div className="mt-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-gray-900 dark:text-white">Complete Your Bio</div>
          <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">Tell us about yourself in a few words!</div>
        </div>
        <button className="h-8 w-8 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Add">
          <Plus size={16} className="text-blue-600" />
        </button>
      </div>
    </div>
  )
}
