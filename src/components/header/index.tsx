import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      name: "Products",
      hasDropdown: true,
      items: ["HR Software", "Payroll", "Attendance", "Performance"],
    },
    {
      name: "Customers",
      hasDropdown: true,
      items: ["Case Studies", "Testimonials", "Success Stories"],
    },
    {
      name: "Pricing",
      hasDropdown: false,
    },
    {
      name: "About",
      hasDropdown: true,
      items: ["Company", "Team", "Careers", "Contact"],
    },
    {
      name: "Resources",
      hasDropdown: true,
      items: ["Blog", "Documentation", "Help Center", "Webinars"],
    },
    {
      name: "Careers",
      hasDropdown: false,
    },
  ];

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">K</span>
      </div>
      <span className="text-xl font-bold text-gray-900">keka</span>
    </div>
  );

  const DesktopNavigation = () => (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <div key={item.name}>
          {item.hasDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">
                  <span className="font-medium">{item.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {item.items?.map((subItem) => (
                  <DropdownMenuItem key={subItem} className="cursor-pointer">
                    {subItem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            >
              {item.name}
            </a>
          )}
        </div>
      ))}
    </nav>
  );

  const MobileNavigation = () => (
    <div className="flex flex-col space-y-4 pt-8">
      {navigationItems.map((item) => (
        <div key={item.name} className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium text-lg">
              {item.name}
            </span>
            {item.hasDropdown && (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
          {item.hasDropdown && item.items && (
            <div className="mt-3 pl-4 space-y-2">
              {item.items.map((subItem) => (
                <a
                  key={subItem}
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {subItem}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col space-y-3 pt-6">
        <Button variant="ghost" className="justify-start text-lg font-medium">
          Login
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Get free trial
        </Button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              <a href="/login">Login</a>
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
            >
              <a href="/signup">Get free trial</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-6">
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <MobileNavigation />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
