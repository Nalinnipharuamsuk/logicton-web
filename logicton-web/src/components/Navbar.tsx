"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const t = useTranslations("Navigation");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: t("home"), href: "/" },
        { name: t("about"), href: "/about" },
        { name: t("services"), href: "/services" },
        { name: t("portfolio"), href: "/portfolio" },
        { name: t("contact"), href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-slate-900 shadow-lg border-b border-border">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-sm group-hover:glow transition-shadow">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold text-gradient tracking-tight">
                            Logicton
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors relative group py-2"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}

                        <div className="pl-4 border-l border-border/30 flex items-center gap-2">
                            <LanguageSelector />
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-3 rounded-xl bg-white dark:bg-slate-800 border border-border hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-foreground"
                        onClick={toggleMenu}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-800 border-t border-border"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-foreground hover:text-primary py-3 px-4 rounded-xl hover:bg-white/5 transition-all flex items-center gap-3"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-4 border-t border-border/30 mt-2 flex items-center gap-4">
                                <LanguageSelector variant="compact" />
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}