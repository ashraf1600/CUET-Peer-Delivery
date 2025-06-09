import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/shared/Container";
import MobileMenu from "./MobileMenu";

export type Language = "en" | "bn";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActiveLink = (href: string) => pathname === href;

  const navItems = [
    {
      id: "1",
      href: "/",
      label: "navitems.1",
      fallback: "Home",
      simplelink: true,
    },
    {
      id: "2",
      href: "/about",
      label: "navitems.2",
      fallback: "About",
      simplelink: true,
    },
    {
      id: "3",
      href: "/contact",
      label: "navitems.3",
      fallback: "Contact",
      simplelink: true,
    },
    {
      id: "4",
      href: "/post",
      label: "navitems.4",
      fallback: "All Posts",
      simplelink: true,
    },
  ];

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names[0][0].toUpperCase() + (names[1]?.[0]?.toUpperCase() || "");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Branding */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={45}
              height={45}
              className="rounded-full border"
              unoptimized
            />
            <span className="text-xl font-semibold text-gray-800">
              <span className="text-amber-600">CUET</span>{" "}
              <span className="text-blue-600">Peer Delivery</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-base font-medium transition hover:text-blue-600 ${
                  isActiveLink(item.href)
                    ? "font-semibold text-blue-700"
                    : "text-gray-700"
                }`}
              >
                {item.fallback}
              </Link>
            ))}
          </nav>

          {/* Right Side - Buttons / User */}
          <div className="hidden items-center space-x-3 lg:flex">
            {session ? (
              <>
                <Link href="/create-post">
                  <Button className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
                    Create Post
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="cursor-pointer border border-blue-500">
                      <AvatarImage />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(session?.user?.name || "U")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="mt-2 w-56 shadow-xl">
                    <div className="px-3 py-2 text-sm">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {session?.user?.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {session?.user?.email}
                      </p>
                      <p>
                        <span className="font-semibold">Role:</span>{" "}
                        {session?.user?.role}
                      </p>
                    </div>
                    <hr />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/my-posts")}
                      className="cursor-pointer"
                    >
                      My Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/my-orders")}
                      className="cursor-pointer"
                    >
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ redirect: true })}
                      className="cursor-pointer font-medium text-red-500"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="text-blue-600">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <RiMenu4Fill size={24} />
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
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
