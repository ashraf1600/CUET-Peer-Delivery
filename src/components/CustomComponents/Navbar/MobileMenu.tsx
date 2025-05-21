"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaMoneyBillTrendUp } from "react-icons/fa6";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useLanguageStore } from "@/store/languageStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: {
    id: string;
    label: string;
    fallback: string;
    href?: string;
    subItems?: {
      href: string;
      label: string;
      fallback: string;
    }[];
  }[];
  isClient: boolean;
  getLabel: (key: string, fallback: string) => string;
  isActiveLink: (href: string) => boolean;
  language: string;
  setLanguage: (lang: string) => void;
  //   setLanguage: (language: Language) => void;
  isLanguagePopoverOpen: boolean;
  setIsLanguagePopoverOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  isClient,
  getLabel,
  isActiveLink,
  language,
  setLanguage,
  isLanguagePopoverOpen,
  setIsLanguagePopoverOpen,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] transform bg-white transition-transform duration-700 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header with close button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-baseWhite hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex justify-center px-4 pb-4">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740"
              alt="BAJP Logo"
              width={100}
              height={40}
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="mx-auto w-fit space-y-4">
            {navItems.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`block py-2 ${
                      isActiveLink(item.href) ? "font-medium" : ""
                    }`}
                  >
                    {getLabel(item.label, item.fallback)}
                  </Link>
                );
              }

              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="flex w-full items-center justify-between py-2"
                  >
                    <span>{getLabel(item.label, item.fallback)}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        openDropdowns[item.id] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openDropdowns[item.id] &&
                    item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={handleLinkClick}
                        className="block py-2 pl-4"
                      >
                        {getLabel(subItem.label, subItem.fallback)}
                      </Link>
                    ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with language selector */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/donate"
              onClick={handleLinkClick}
              className="flex items-center gap-2"
            >
              <FaMoneyBillTrendUp size={20} />
              {/* {getLabel("donate", "Donate")} */}
            </Link>

            <Popover
              open={isLanguagePopoverOpen}
              onOpenChange={setIsLanguagePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-lightGray flex items-center gap-2 border px-3 py-2"
                >
                  {language === "en" ? "English" : "বাংলা"}
                  <FaChevronDown size={24} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-[1001] w-32 bg-white">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setLanguage("en");
                      setIsLanguagePopoverOpen(false);
                    }}
                  >
                    English
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setLanguage("bn");
                      setIsLanguagePopoverOpen(false);
                    }}
                  >
                    বাংলা
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
