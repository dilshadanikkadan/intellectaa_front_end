"use client";
import { NavWrapper } from "@/styles/layouts/Wrappers";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const SignupButton = dynamic(() => import("./clientUi/SignupButton"), {
  ssr: false,
});

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const pathName = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const closeMenu = (e:any) => {
      if (isMenuOpen && !(e.target as HTMLElement).closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: user?.isInstructor ? "/instructor" : "/teachus", label: user?.isInstructor ? "Instructor" : "Teach Us" },
    { href: "/contact", label: "Contact Me" },
  ];

  const NavLink = ({ href, label, onClick }:any) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return (
      <Link
        href={href}
        onClick={onClick}
        className={isActive ? "text-[#20B486]" : ""}
      >
        {label}
      </Link>
    );
  };

  return (
    <NavWrapper className="relative z-50">
      <div className="wrapper flex h-[15vh]  w-full px-4 md:w-[80%] mx-auto items-center relative">
        <div className="left flex-[1]">
          <img className="w-24 h-14 object-cover" src="/newlogo.PNG" alt="" />
        </div>

        <div className="center flex-[2] hidden md:flex gap-6 text-[1.2rem]  text-gray-600">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>

        <div className="right flex-[1] hidden md:flex justify-center text-[1.1rem] ">
          <SignupButton />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-50"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div
          className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-40`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-start gap-4 text-[1.2rem]  text-gray-600 pt-20 px-6">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} onClick={toggleMenu} />
            ))}
            <SignupButton />
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </NavWrapper>
  );
};

export default NavBar;