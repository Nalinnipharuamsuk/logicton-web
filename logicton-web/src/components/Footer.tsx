"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Github, Linkedin, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    const t = useTranslations("Footer");

    const quickLinks = [
        { name: t("about"), href: "/about" },
        { name: t("services"), href: "/services" },
        { name: t("portfolio"), href: "/portfolio" },
        { name: t("contact"), href: "/contact" },
    ];

    const services = [
        { name: t("web"), href: "/services" },
        { name: t("mobile"), href: "/services" },
        { name: t("animation"), href: "/services" },
        { name: t("framework"), href: "/services" },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-sm">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-bold text-gradient tracking-tight">
                                Logicton
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("description")}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 dark:hover:text-white"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 dark:hover:text-white"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a
                                href={`mailto:${t("email")}`}
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 dark:hover:text-white"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-bold">{t("quickLinks")}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-bold">{t("services")}</h3>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={`service-${index}`}>
                                    <Link
                                        href={service.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-bold">{t("contact")}</h3>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${t("email")}`}
                                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                            >
                                <Mail className="h-4 w-4 mt-0.5 group-hover:text-primary" />
                                <span>{t("email")}</span>
                            </a>
                            <a
                                href={`tel:${t("phone")}`}
                                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                            >
                                <Phone className="h-4 w-4 mt-0.5 group-hover:text-primary" />
                                <span>{t("phone")}</span>
                            </a>
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{t("address")}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Logicton. {t("rights")}
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link
                                href="/privacy"
                                className="hover:text-primary transition-colors"
                            >
                                {t("privacy")}
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-primary transition-colors"
                            >
                                {t("terms")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}