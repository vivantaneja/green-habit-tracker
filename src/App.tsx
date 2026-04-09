import { useState } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { Leaf } from './components/Icons'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import Impact from './pages/Impact'
import ReTurn from './pages/ReTurn'
import Suggestions from './pages/Suggestions'
import Settings from './pages/Settings'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f3ef]">
      <nav className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <NavLink
            to="/"
            end
            className="flex items-center gap-3 font-semibold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-700 text-white">
              <Leaf className="h-4 w-4" size={20} />
            </span>
            <span className="font-display text-sm sm:text-base">Green Habit Tracker</span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/habits"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Habits
            </NavLink>
            <NavLink
              to="/impact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Impact
            </NavLink>
            <NavLink
              to="/return"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Re-turn
            </NavLink>
            <NavLink
              to="/suggestions"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Request option
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Settings
            </NavLink>
            <a
              href="https://github.com/vivantaneja"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              GitHub
            </a>
            <a
              href="https://vivantaneja.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Website
            </a>
            <Link
              to="/habits"
              className="ml-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              Log today
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="space-y-1">
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${mobileOpen ? 'translate-y-1 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${mobileOpen ? '-translate-y-1 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/habits"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Habits
              </NavLink>
              <NavLink
                to="/impact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Impact
              </NavLink>
              <NavLink
                to="/return"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Re-turn
              </NavLink>
              <NavLink
                to="/suggestions"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Request option
              </NavLink>
              <NavLink
                to="/settings"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                Settings
              </NavLink>
              <a
                href="https://github.com/vivantaneja"
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                GitHub
              </a>
              <a
                href="https://vivantaneja.com"
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Website
              </a>
              <Link
                to="/habits"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
              >
                Log today
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/return" element={<ReTurn />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
