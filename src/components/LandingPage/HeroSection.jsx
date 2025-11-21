import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { AnimatedGroup } from '../ui/animated-group';
import { ShinyButton } from '../ui/shiny-button';
import { cn } from '../../lib/utils';
import { logout } from '../../store/slices/authSlice';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden="true"
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src="https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block opacity-30"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to="/dashboard"
                    className="hover:bg-dark-card bg-dark-cardHover group mx-auto flex w-fit items-center gap-4 rounded-full border border-dark-border p-1 pl-4 shadow-md transition-all duration-300"
                  >
                    <span className="text-dark-text text-sm">
                      Introducing AI-Powered Task Management
                    </span>
                    <span className="block h-4 w-0.5 border-l bg-dark-border"></span>

                    <div className="bg-dark-card group-hover:bg-dark-cardHover size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-teal-400" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-teal-400" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-bold text-dark-text bg-gradient-to-r from-teal-400 via-green-400 to-purple-500 bg-clip-text text-transparent">
                    AI that Converts Conversations into Workflows
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-dark-textSecondary">
                    Transform your emails and meetings into actionable tasks automatically. 
                    Kairo uses AI to extract tasks, set priorities, and keep you organized.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <Link to="/login">
                    <ShinyButton className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border border-teal-500/20 px-8 py-3 text-base">
                      Get Started Free
                    </ShinyButton>
                  </Link>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b to-dark-bg absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-dark-border p-4 shadow-lg bg-dark-card">
                  <img
                    className="aspect-video relative rounded-2xl border border-dark-border/25"
                    src="https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75"
                    alt="Kairo Dashboard Preview"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        
        <section className="bg-dark-bg pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                to="/about"
                className="block text-sm duration-150 hover:opacity-75 text-teal-400"
              >
                <span>Trusted by Teams Worldwide</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-sm sm:gap-x-16 sm:gap-y-14">
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">Gemini</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">Gmail</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">GoogleMeet</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">GoogleEvents</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">TaskManager</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">AgileHub</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">ReactJs</span>
              </div>
              <div className="flex">
                <span className="mx-auto h-5 text-dark-textSecondary/60 font-bold text-xl">Python</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const menuItems = [

  { name: 'Tasks', to: '/dashboard' },
  { name: 'Meetings', to: '/dashboard/meetings' },

];

// User Avatar Dropdown Component
const UserAvatar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  // Get user initials
  const getInitials = () => {
    if (!user) return 'U';
    if (user.name) {
      const names = user.name.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-green-600 p-0.5 hover:from-teal-700 hover:to-green-700 transition-all duration-300 hover:scale-105"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-dark-card text-teal-400 font-bold text-sm">
          {getInitials()}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-dark-border bg-dark-cardHover">
            <p className="text-sm font-semibold text-dark-text truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-dark-textSecondary truncate">
              {user?.email || ''}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-dark-textSecondary hover:text-dark-text hover:bg-dark-cardHover transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-dark-textSecondary hover:text-dark-text hover:bg-dark-cardHover transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-dark-border py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-dark-cardHover transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-dark-card/80 max-w-4xl rounded-2xl border border-dark-border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link to="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-dark-text"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.to.startsWith('#') ? (
                      <a
                        href={item.to}
                        className="text-dark-textSecondary hover:text-dark-text block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className="text-dark-textSecondary hover:text-dark-text block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-card group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-dark-border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.to.startsWith('#') ? (
                        <a
                          href={item.to}
                          className="text-dark-textSecondary hover:text-dark-text block duration-150"
                        >
                          <span>{item.name}</span>
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          className="text-dark-textSecondary hover:text-dark-text block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {isAuthenticated ? (
                  // Show User Avatar when logged in
                  <UserAvatar />
                ) : (
                  // Show Login/Signup buttons when not logged in
                  <>
                    <Link to="/login" className={cn(isScrolled && 'lg:hidden')}>
                      <ShinyButton className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border border-teal-500/20 h-9 px-3 text-xs w-full sm:w-auto">
                        Login
                      </ShinyButton>
                    </Link>
                    <Link to="/login" className={cn(isScrolled && 'lg:hidden')}>
                      <ShinyButton className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border border-teal-500/20 h-9 px-3 text-xs w-full sm:w-auto">
                        Sign Up
                      </ShinyButton>
                    </Link>
                    <Link to="/dashboard" className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                      <ShinyButton className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 border border-teal-500/20 h-9 px-3 text-xs">
                        Get Started
                      </ShinyButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Logo = ({ className }) => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="/kairo-logo.png" 
        alt="Kairo Logo" 
        className={cn("h-8 w-auto", className)}
      />
      <span className="text-xl font-bold text-dark-text bg-gradient-to-r from-teal-400 via-green-400 to-purple-500 bg-clip-text text-transparent">
        Kairo
      </span>
    </div>
  );
};
