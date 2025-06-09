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
    {
      id: "4",
      href: "/post",
      label: "navItems.4",
      fallback: "All Posts",
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
    <div className="sticky top-0 z-50 w-full bg-gray-100 shadow-sm">
      <Container className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
                alt="BAJP Logo"
                width={50}
                height={50}
                unoptimized
              />
            </Link>
            <span className="font-bold text-blue-500">
              <span className="text-amber-700">CUET</span>{" "}
              <span className="text-blue-500">Peer Delivery</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden flex-grow items-center justify-center lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href!}
                className={`hover:text-Primary-300 text-md mx-4 leading-5 font-medium text-blue-500 transition-colors ${
                  isActiveLink(item.href!) ? "text-black" : "text-black"
                }`}
              >
                {item.fallback}
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
                  <Avatar className="border border-black">
                    <AvatarImage />
                    <AvatarFallback className="bg-blue-400">
                      {getInitials(session?.user?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem className="grid cursor-pointer items-center justify-center">
                    <span>
                      {" "}
                      <span className="font-bold">Name:</span>{" "}
                      {session?.user?.name || "Name"}
                    </span>
                    <span>
                      <span className="font-bold">Email:</span>{" "}
                      {session?.user?.email || "email"}
                    </span>
                    <span>
                      <span className="font-bold">Role:</span>{" "}
                      {session?.user?.role || "role"}
                    </span>
                  </DropdownMenuItem>
                  <hr className="py-2" />
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
                  {/* <DropdownMenuItem
                    onClick={() => router.push("/settings")}
                    className="cursor-pointer"
                  >
                    Settings
                  </DropdownMenuItem> */}
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
      </Container>
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
    </div>
  );
};

export default Navbar;
