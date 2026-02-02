"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Mail, MapPin, Phone, Send, Facebook, Linkedin, Twitter, Globe, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { SiteConfig } from '@/types';

export default function ContactPage() {
    const locale = useLocale();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [isLoaded, setIsLoaded] = useState(true);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        setIsLoaded(true);
        fetch('/api/content/site-config')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setSiteConfig(data.data);
                }
            })
            .catch(console.error);
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setStatus('submitting');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    language: locale
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('idle');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('idle');
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1
        }
    };

    const contactItems = [
        {
            icon: MapPin,
            title: 'Visit Us',
            content: [
                'Logicton Tower, 45th Floor',
                'Sukhumvit Road, Khlong Toei',
                'Bangkok 10110, Thailand'
            ]
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: [
                'General: +66 2 123 4567',
                'Sales: +66 2 123 4568',
                'Mon - Fri, 9:00 - 18:00'
            ]
        },
        {
            icon: Mail,
            title: 'Email Us',
            content: [
                'hello@logicton.com',
                'support@logicton.com',
                'careers@logicton.com'
            ]
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Ambient background effects */}
            <div className="fixed inset-0 gradient-mesh -z-10" />
            <div className="fixed inset-0 noise -z-5" />
            
            {/* Floating decorative elements */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse float" />
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse float-delayed" />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden">
                <div className="container px-4 md:px-6 relative z-10">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isLoaded ? "show" : "hidden"}
                        className="max-w-3xl mx-auto text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={item}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-accent mb-6"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Let&apos;s Connect</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={item}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
                        >
                            <span className="text-gradient">Let&apos;s Build</span>
                            <br />
                            <span className="text-foreground">Something Great</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={item}
                            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6"
                        >
                            Have a complex project in mind? Our engineering team is ready to transform your ideas into scalable enterprise solutions.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-3 items-start justify-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-foreground font-medium">Expert Team</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-foreground font-medium">Fast Response</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-foreground font-medium">24/7 Support</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Contact Form - spans 2 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="lg:col-span-2 glass rounded-3xl p-8 md:p-10 card-hover"
                        >
                            <div className="mb-8">
                                <h3 className="text-foreground text-2xl md:text-3xl font-bold mb-3">Send us a message</h3>
                                <p className="text-muted-foreground">We&apos;ll get back to you within 24 hours</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name and Email in one row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label htmlFor="name" className="text-sm text-muted-foreground font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className={`w-full px-5 py-4 rounded-2xl bg-card/50 dark:bg-white/5 border border-border/30 text-foreground placeholder-muted-foreground hover:border-border/60 focus:border-primary/50 focus:outline-none focus:bg-card/80 dark:focus:bg-white/10 transition-all ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="e.g. John Doe"
                                        />
                                        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label htmlFor="email" className="text-sm text-muted-foreground font-medium">Corporate Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className={`w-full px-5 py-4 rounded-2xl bg-card/50 dark:bg-white/5 border border-border/30 text-foreground placeholder-muted-foreground hover:border-border/60 focus:border-primary/50 focus:outline-none focus:bg-card/80 dark:focus:bg-white/10 transition-all ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Subject Dropdown */}
                                <div className="space-y-3">
                                    <label htmlFor="subject" className="text-sm text-muted-foreground font-medium">Subject</label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className={`w-full px-5 py-4 rounded-2xl bg-card/50 dark:bg-white/5 border border-border/30 text-foreground hover:border-border/60 focus:border-primary/50 focus:outline-none focus:bg-card/80 dark:focus:bg-white/10 transition-all ${errors.subject ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Select a subject...</option>
                                        <option value="Software Development Inquiry">Software Development Inquiry</option>
                                        <option value="Web Development Inquiry">Web Development Inquiry</option>
                                        <option value="Mobile Development Inquiry">Mobile Development Inquiry</option>
                                        <option value="Cloud Solutions Inquiry">Cloud Solutions Inquiry</option>
                                        <option value="Consulting Services">Consulting Services</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                    <label htmlFor="message" className="text-sm text-muted-foreground font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className={`w-full px-5 py-4 rounded-2xl bg-card/50 dark:bg-white/5 border border-border/30 text-foreground placeholder-muted-foreground hover:border-border/60 focus:border-primary/50 focus:outline-none focus:bg-card/80 dark:focus:bg-white/10 transition-all resize-none ${errors.message ? 'border-red-500' : ''}`}
                                        placeholder="Tell us about your project goals and requirements..."
                                    />
                                    {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'submitting' || status === 'success'}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 btn-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
                                >
                                    <Send className="h-5 w-5" />
                                    {status === 'idle' && 'Send Message'}
                                    {status === 'submitting' && 'Sending...'}
                                    {status === 'success' && 'Message Sent!'}
                                </button>
                            </form>
                        </motion.div>

                        {/* Right: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {/* Contact Info Cards */}
                            {contactItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    className="glass rounded-2xl p-6 card-hover"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground text-lg font-bold">{item.title}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-2 ml-16">
                                        {item.content.map((line, idx) => (
                                            <p key={idx} className="text-muted-foreground text-sm">{line}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Follow Us */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="glass rounded-2xl p-6"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-foreground text-lg font-bold">Follow Us</h3>
                                        <p className="text-muted-foreground text-sm">Stay connected</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    {siteConfig?.socialMedia.linkedin && (
                                        <a href={siteConfig.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 bg-card/50 dark:bg-white/5 border border-border/30 hover:bg-primary/20 dark:hover:bg-primary/10 p-4 rounded-xl text-foreground hover:text-primary transition-all flex items-center justify-center">
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                    )}
                                    {siteConfig?.socialMedia.twitter && (
                                        <a href={siteConfig.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="flex-1 bg-card/50 dark:bg-white/5 border border-border/30 hover:bg-primary/20 dark:hover:bg-primary/10 p-4 rounded-xl text-foreground hover:text-primary transition-all flex items-center justify-center">
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                    )}
                                    {siteConfig?.socialMedia.facebook && (
                                        <a href={siteConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 bg-card/50 dark:bg-white/5 border border-border/30 hover:bg-primary/20 dark:hover:bg-primary/10 p-4 rounded-xl text-foreground hover:text-primary transition-all flex items-center justify-center">
                                            <Facebook className="h-6 w-6" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="h-64 glass rounded-2xl border border-border/30 overflow-hidden"
                            >
                                <div className="w-full h-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 dark:from-primary/10 via-transparent to-secondary/10 dark:to-secondary/10"></div>
                                    <div className="relative z-10 text-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 dark:from-primary/20 to-secondary/20 dark:to-secondary/20 flex items-center justify-center mx-auto mb-4">
                                            <MapPin className="h-10 w-10 text-primary" />
                                        </div>
                                        <p className="text-foreground font-semibold text-lg">LOGICTON HQ</p>
                                        <p className="text-muted-foreground text-sm mt-1">Bangkok, Thailand</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-gradient">Ready to start your project?</span>
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Get in touch with us today and let&apos;s create something amazing together.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:scale-105 transition-transform"
                                >
                                    Schedule a Call
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                                <Link
                                    href="/portfolio"
                                    className="px-8 py-4 rounded-full glass hover:bg-white/10 font-semibold transition-all hover:scale-105"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}