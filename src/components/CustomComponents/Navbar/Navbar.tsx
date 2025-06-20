"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from user1" },
    { id: 2, message: "Your post was liked" },
    { id: 3, message: "New comment on your post" },
  ]);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActiveLink = (href) => pathname === href;

  const navItems = [
    { id: "1", href: "/", fallback: "Home" },
    { id: "2", href: "/about", fallback: "About" },
    { id: "3", href: "/contact", fallback: "Contact" },
    { id: "4", href: "/post", fallback: "All Posts" },
  ];

  const getInitials = (name) => {
    const names = name.split(" ");
    return names[0][0].toUpperCase() + (names[1]?.[0]?.toUpperCase() || "");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo(2).png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full border border-blue-500"
              unoptimized
            />
            <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg select-none">
              <span className="mr-1">CUET</span>
              <span className="font-semibold text-gray-900">Peer Delivery</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-lg font-medium transition-colors duration-300 ${
                  isActiveLink(item.href)
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.fallback}
              </Link>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/create-post">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Create Post
                  </Button>
                </Link>

                {/* Notification Icon with Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative p-2">
                      <Bell className="h-6 w-6 text-gray-600" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="cursor-pointer">
                          {notification.message}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="cursor-pointer">
                        No new notifications
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="border-2 border-blue-500 cursor-pointer hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={session?.user?.image || undefined} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(session?.user?.name || "U")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 w-56 shadow-lg border border-blue-100 rounded-lg">
                    <div className="px-4 py-3 text-sm text-gray-800">
                      <p>
                        <strong>Name:</strong> {session?.user?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {session?.user?.email}
                      </p>
                      <p>
                        <strong>Role:</strong> {session?.user?.role}
                      </p>
                    </div>
                    <hr className="border-blue-200" />
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="hover:bg-blue-50 cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/my-posts")} className="hover:bg-blue-50 cursor-pointer">
                      My Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/my-orders")} className="hover:bg-blue-50 cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ redirect: true })}
                      className="text-red-500 font-semibold hover:bg-red-50 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-transform duration-300">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <RiMenu4Fill size={24} />
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          isClient={isClient}
          isActiveLink={isActiveLink}
        />
      )}
    </header>
  );
};

export default Navbar;
