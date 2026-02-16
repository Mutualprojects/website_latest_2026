"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "../../components/AdminLayout";

import {
  Home,
  Users,
  Settings,
  Moon,
  Sun,
  Calendar,
  Building2,
  Briefcase,
  FolderKanban,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  User,
  NewspaperIcon,
  ContactRoundIcon,
} from "lucide-react";
import { ProjectFilled, ProjectOutlined } from "@ant-design/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // Mobile: < 640px
      setIsTablet(width >= 640 && width < 1024); // Tablet: 640px - 1024px

      // Auto-close mobile menu on desktop
      if (width >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const navigationItems = [
    {
      path: "/super-admin",
      label: "Dashboard",
      icon: Home,
      tooltip: "Dashboard Overview",
    },
    {
      path: "/super-admin/users",
      label: "Categories",
      icon: Users,
      tooltip: "Manage Categories",
    },
    {
      path: "/super-admin/Add-items",
      label: "Items",
      icon: FileText,
      tooltip: "Manage Items",
    },
    {
      path: "/super-admin/Add-events",
      label: "Events",
      icon: Calendar,
      tooltip: "Manage Events",
    },
    {
      path: "/super-admin/Add-departments",
      label: "Departments",
      icon: Building2,
      tooltip: "Manage Departments",
    },
    {
      path: "/super-admin/Add-teams",
      label: "Teams",
      icon: Briefcase,
      tooltip: "Manage Teams",
    },
    {
      path: "/super-admin/Add-sectors",
      label: "Sectors",
      icon: FolderKanban,
      tooltip: "Manage Sectors",
    },
    {
      path: "/super-admin/casestudy",
      label: "Case Studies",
      icon: Settings,
      tooltip: "Manage Case Studies",
    },
    {
      path: "/super-admin/Addprojects",
      label: "Projects",
      icon: ProjectOutlined,
      tooltip: "Manage projects",
    },
    {
      path: "/super-admin/latestNews",
      label: "Latest-News",
      icon: NewspaperIcon,
      tooltip: "News",
    },
    {
      path: "/super-admin/contactresponses",
      label: "contact Responses",
      icon: ContactRoundIcon,
      tooltip: "contact responses",
    },
    {
      path: "/super-admin/Testimonials",
      label: "Testimonials",
      icon: ProjectOutlined,
      tooltip: "Testimonials",
    },
  ];

  const getPageTitle = () => {
    const currentItem = navigationItems.find((item) =>
      pathname.startsWith(item.path)
    );
    return currentItem?.label || "Admin Panel";
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile || isTablet) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <SidebarProvider>
        {/* Mobile/Tablet Overlay */}
        {(isMobile || isTablet) && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Desktop: Collapsible, Mobile/Tablet: Drawer */}
        <Sidebar
          collapsible={isMobile || isTablet ? "offcanvas" : "icon"}
          className={`
            bg-white dark:bg-gray-900 border-r shadow-2xl
            ${isMobile || isTablet ? "fixed inset-y-0 left-0 z-50" : ""}
            ${isMobile || isTablet
              ? isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : ""
            }
            transition-transform duration-300 ease-in-out
            ${isMobile ? "w-[280px]" : isTablet ? "w-[300px]" : ""}
          `}
        >
          {/* Sidebar Header */}
          <SidebarHeader className="relative flex items-center justify-between py-4 px-4 bg-gradient-to-r from-[#07518a] to-[#0b6fb0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <span className="text-white font-bold text-lg truncate group-data-[collapsible=icon]:hidden">
                Admin Panel
              </span>
            </div>
            {(isMobile || isTablet) && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            )}
          </SidebarHeader>

          <SidebarSeparator />

          {/* Sidebar Content */}
          <SidebarContent className="overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupLabel className="pl-2 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider group-data-[collapsible=icon]:hidden">
                Navigation
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          tooltip={item.tooltip}
                          isActive={active}
                          onClick={() => handleNavigation(item.path)}
                          className={`
                            relative overflow-hidden transition-all duration-200
                            ${active
                              ? "bg-gradient-to-r from-[#07518a] to-[#0b6fb0] text-white shadow-lg"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }
                            ${isMobile || isTablet ? "py-3 px-4" : ""}
                          `}
                        >
                          <Icon
                            className={`mr-2 h-5 w-5 ${active ? "text-white" : ""
                              }`}
                          />
                          <span className={`${active ? "font-semibold" : ""}`}>
                            {item.label}
                          </span>
                          {active && (
                            <ChevronRight className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Quick Actions Section - Only on Desktop */}
            {!isMobile && !isTablet && (
              <>
                <SidebarSeparator className="my-4" />
                <SidebarGroup>
                  <SidebarGroupLabel className="pl-2 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider group-data-[collapsible=icon]:hidden">
                    Quick Actions
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Notifications"
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Bell className="mr-2 h-5 w-5" />
                          <span>Notifications</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Search"
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Search className="mr-2 h-5 w-5" />
                          <span>Search</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter className="border-t dark:border-gray-800 p-4">
            <div className="group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#07518a] to-[#0b6fb0] flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate dark:text-white">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@example.com
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
              <p className="text-xs text-center text-gray-400 mt-3">
                © {new Date().getFullYear()} Brihaspathi Technologies
              </p>
            </div>
            <button className="group-data-[collapsible=icon]:flex hidden w-full justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="transition-all duration-300">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-white dark:bg-gray-900 px-4 lg:px-6 py-3 shadow-md border-b dark:border-gray-800">
            <div className="flex items-center gap-2 flex-1">
              {/* Mobile/Tablet Menu Toggle */}
              {(isMobile || isTablet) && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              )}

              {/* Desktop Sidebar Toggle */}
              {!isMobile && !isTablet && <SidebarTrigger />}

              <div className="flex flex-col">
                <h2 className="font-bold text-base lg:text-lg text-[#07518a] dark:text-white">
                  {getPageTitle()}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Welcome back, Admin
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search - Desktop Only */}
              {!isMobile && (
                <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Search...</span>
                </button>
              )}

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="font-semibold text-sm">Notifications</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <p className="text-sm font-medium">Event updated</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {/* User Menu - Desktop Only */}
              {!isMobile && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#07518a] to-[#0b6fb0] flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-2 border-b dark:border-gray-700">
                        <p className="font-semibold text-sm">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <div className="border-t dark:border-gray-700 my-1"></div>
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main
            className={`
            bg-[#f7f9fd] dark:bg-gray-950 min-h-screen
            ${isMobile ? "p-3" : isTablet ? "p-4" : "p-6"}
            transition-all duration-300
          `}
          >
            <div className="max-w-full mx-auto">{children}</div>
          </main>

          {/* Mobile Bottom Navigation - Only on Mobile */}
          {isMobile && (
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg z-40">
              <div className="flex items-center justify-around px-2 py-3">
                {navigationItems.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all
                        ${active
                          ? "text-[#07518a] dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${active ? "scale-110" : ""}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}