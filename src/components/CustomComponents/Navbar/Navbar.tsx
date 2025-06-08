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
// import { useLanguageStore } from "@/components/shared/languageStore";

export type Language = "en" | "bn";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // const { language, setLanguage, t } = useLanguageStore();
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
      label: "navItems.1",
      fallback: "Home",
      simpleLink: true,
    },
    {
      id: "2",
      href: "/about",
      label: "navItems.2",
      fallback: "About",
      simpleLink: true,
    },
    {
      id: "3",
      href: "/contact",
      label: "navItems.3",
      fallback: "Contact",
      simpleLink: true,
    },
  ];

  const getInitials = (name: string) => {
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <Container className="pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
              alt="BAJP Logo"
              width={120}
              height={100}
              unoptimized
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden flex-grow items-center justify-center lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href!}
              className={`hover:text-Primary-300 mx-4 text-sm leading-5 font-medium transition-colors ${
                isActiveLink(item.href!)
                  ? "text-Primary-300"
                  : "text-colors-navbarText"
              }`}
            >
              {(item.label, item.fallback)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          {session && (
            <Link href="/create-post" className="mr-4">
              <Button className="text-baseWhite cursor-pointer bg-blue-400 hover:bg-blue-600 hover:text-white">
                Create Post
              </Button>
            </Link>
          )}

          {!session ? (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-3 text-sm leading-5 font-medium text-black transition-colors hover:bg-gray-50"
              >
                Login
              </Link>
              <Link href="/auth/register">
                <Button className="bg-Primary-500 text-baseWhite cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {getInitials(session?.user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer"
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ redirect: true })}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <RiMenu4Fill size={24} className="text-colors-navbarText" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          isClient={isClient}
          isActiveLink={isActiveLink}
        />
      )}
    </Container>
  );
};

export default Navbar;
