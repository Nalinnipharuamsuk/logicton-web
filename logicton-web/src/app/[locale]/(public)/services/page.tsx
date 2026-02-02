"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Service } from '@/types';

export default function ServicesPage() {
    const locale = useLocale();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content/services')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setServices(data.data.filter((s: Service) => s.isActive).sort((a: Service, b: Service) => a.order - b.order));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Get only first 6 active services
    const displayServices = services.slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-background to-background/80">
                <div className="text-center max-w-[1200px] mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {locale === 'th' ? 'บริการของเรา' : 'Our Services'}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {locale === 'th'
                            ? 'เราให้บริการโซลูชันซอฟต์แวร์ที่ออกแบบมาเพื่อเพิ่มการเติบโต ปรับปรุงประสิทธิภาพ และแก้ไขความท้าทายทางเทคโนโลยีที่ซับซ้อนของคุณ'
                            : 'We build bespoke software solutions that drive growth, enhance efficiency, and solve your most complex technical challenges.'
                        }
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayServices.map((service) => (
                        <div
                            key={service.id}
                            className="group h-full"
                        >
                            <Link
                                href={`/${locale}/services/${service.id}`}
                                className="flex flex-col h-full p-6 bg-card border border-border rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block w-fit">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {service.title[locale as 'th' | 'en']}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground mb-4 flex-grow">
                                    {service.description[locale as 'th' | 'en']}
                                </p>

                                {/* Features */}
                                {service.features && service.features[locale as 'th' | 'en'] && (
                                    <ul className="space-y-2 mb-4">
                                        {service.features[locale as 'th' | 'en'].slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm">
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Learn More Link */}
                                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300 pt-2">
                                    {locale === 'th' ? 'ดูรายละเอียด' : 'Learn More'}
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </Link>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {locale === 'th' ? 'พร้อมเปลี่ยนแปลงธุรกิจของคุณ?' : 'Ready to transform your business?'}
                        </h2>
                        <p className="text-blue-100 text-lg mb-4 max-w-2xl mx-auto">
                            {locale === 'th'
                                ? 'บริษัท 200+ บริษัทมีความเชื่อใจ Logicton สำหรับความเป็นเลิศทางด้านซอฟต์แวร์และการโครงสร้างพื้นฐานด้านเทคโนโลยี'
                                : 'Join 200+ companies that rely on Logicton for their mission-critical software and technology infrastructure.'
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/contact`}
                                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
                            >
                                {locale === 'th' ? 'ติดต่อเรา' : 'Contact Sales'}
                            </Link>
                            <Link
                                href={`/${locale}/portfolio`}
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
                            >
                                {locale === 'th' ? 'ดูผลงาน' : 'View Portfolio'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
