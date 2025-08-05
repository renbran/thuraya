import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import thurayaLogo from "@/assets/thuraya-logo-transparent.png";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.services"), href: "/services" },
    { name: t("navigation.case_studies"), href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: t("navigation.contact"), href: "/contact" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={thurayaLogo} 
              alt="Thuraya Path Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-satoshi font-black text-brand-gold">
              THURAYA PATH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-inter transition-colors ${
                    location.pathname === item.href
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* CTA Button & Mobile Elements */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="btn-brand-primary px-6 py-2 rounded-full font-satoshi transition-all duration-300 hover:scale-105"
              >
                {t("navigation.book_consultation")}
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-readable"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen ? "true" : "false"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-3 font-inter transition-colors ${
                  location.pathname === item.href
                    ? "nav-link active"
                    : "nav-link"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-brand-primary px-6 py-2 rounded-full font-satoshi inline-block mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}