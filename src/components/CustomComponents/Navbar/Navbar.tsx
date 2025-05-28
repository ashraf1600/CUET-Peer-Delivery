"use client";
import { Button } from "@/components/ui/button";
import { FaChevronDown, FaRegStar, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { RiMenu4Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Container } from "@/components/shared/Container";
import { useLanguageStore } from "@/components/shared/languageStore";
import MobileMenu from "./MobileMenu";
// import MobileMenu from "./MobileMenu";
export type Language = "en" | "bn";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { language, setLanguage, t } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavItemClick = () => {
    setOpenPopoverId(null);
  };

  const getLabel = (key: string, fallback: string) => {
    // return isClient ? (key) : fallback;
    return isClient ? t(key) : fallback;
  };

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
      label: "navItems.3",
      fallback: "Manifesto",
      subItems: [
        {
          href: "/manifesto/economy",
          label: "navItems.3.1",
          fallback: "Economy",
        },
        {
          href: "/manifesto/education",
          label: "navItems.3.2",
          fallback: "Education",
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <Container className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
                alt="BAJP Logo"
                className="mb-2"
                width={120}
                height={100}
                unoptimized
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center lg:flex">
              {navItems.map((item) => {
                if (item.simpleLink) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href!}
                      className={`hover:text-Primary-300 text-sm leading-5 font-medium transition-colors ${
                        isActiveLink(item.href!)
                          ? "text-Primary-300"
                          : "text-colors-navbarText"
                      }`}
                    >
                      {getLabel(item.label, item.fallback)}
                    </Link>
                  );
                }

                return (
                  <Popover
                    key={item.id}
                    open={openPopoverId === item.label}
                    onOpenChange={(isOpen) => {
                      setOpenPopoverId(isOpen ? item.label : null);
                    }}
                  >
                    <PopoverTrigger
                      className={`flex items-center gap-1 rounded-none px-2 py-1 text-sm whitespace-nowrap transition-all duration-150 hover:border-b hover:border-b-white ${
                        item.subItems?.some((subItem) =>
                          isActiveLink(subItem.href),
                        )
                          ? "text-Primary-300"
                          : "text-colors-navbarText"
                      }`}
                    >
                      {getLabel(item.label, item.fallback)}
                      <FaChevronDown size={12} />
                    </PopoverTrigger>
                    <PopoverContent className="w-48 bg-white p-2">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={handleNavItemClick}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {getLabel(subItem.label, subItem.fallback)}
                        </Link>
                      ))}
                    </PopoverContent>
                  </Popover>
                );
              })}
            </nav>

            {/* Auth and Language Section */}

            <div className="hidden items-center lg:flex">
              <Link
                href="/auth/login"
                className="px-4 py-3 text-sm leading-5 font-medium text-black transition-colors hover:bg-gray-50"
              >
                Login
              </Link>
              <Link href="/new-member">
                <Button className="bg-Primary-500 text-baseWhite">
                  New Member
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <RiMenu4Fill size={24} className="text-colors-navbarText" />
            </Button>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navItems={navItems}
                isClient={isClient}
                getLabel={getLabel}
                isActiveLink={isActiveLink}
                language={language}
                setLanguage={(lang) => setLanguage(lang as Language)}
                isLanguagePopoverOpen={isLanguagePopoverOpen}
                setIsLanguagePopoverOpen={setIsLanguagePopoverOpen}
              />
              //               <MobileMenu
              //  isOpen={isMobileMenuOpen}
              //  onClose={() => setIsMobileMenuOpen(false)}
              // />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
