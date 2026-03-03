import { ChevronDown, Moon, Sun } from 'lucide-react'
import gidyLogo from '../assets/Gidy_logo_full_transparent.png'

interface Props {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function TopNav({ darkMode, onToggleDarkMode }: Props) {
  return (
    <div className="bg-white dark:bg-[#0b1220] border-b border-gray-200 dark:border-white/10">
      <div className="w-full px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 ">
            <img src={gidyLogo} alt="Gidy" className="h-6 w-auto" />
          </div>
          <div className="ml-4"></div>
          <div className="hidden md:flex items-center gap-5 text-[12px] text-gray-700 dark:text-gray-200">
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Jobs</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Hackathons</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Projects</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Tasks</a>
            <a className="hover:text-gray-900 dark:hover:text-white" href="#">Organization</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="h-8 w-8 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 inline-flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/10"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={16} className="text-gray-700 dark:text-gray-200" />
            ) : (
              <Moon size={16} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>

          <button className="flex items-center gap-2 text-[12px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">C</div>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
