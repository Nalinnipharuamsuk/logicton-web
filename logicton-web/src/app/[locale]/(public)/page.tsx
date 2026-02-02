"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface Service {
    id: string;
    icon: string;
    title: { th: string; en: string };
    description: { th: string; en: string };
    features?: { th: string[]; en: string[] };
    isActive: boolean;
}

interface PortfolioItem {
    id: string;
    title: { th: string; en: string };
    description?: { th: string; en: string };
    category: string;
    images: string[];
    isActive: boolean;
}

export default function HomePage() {
    const locale = useLocale();
    const [loading, setLoading] = useState(true);
    const [loadingPortfolio, setLoadingPortfolio] = useState(true);
    const [services, setServices] = useState<Service[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/content/services')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setServices(data.data.filter((s: Service) => s.isActive));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        fetch('/api/content/portfolio')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPortfolio(data.data.filter((item: PortfolioItem) => item.isActive).slice(0, 3));
                }
            })
            .catch(console.error)
            .finally(() => setLoadingPortfolio(false));
    }, []);

    const whyChooseItems = [
        {
            title: locale === 'th' ? 'ความเชี่ยวชาญด้านเทคนิค' : 'Technical Expertise',
            description: locale === 'th' ? 'ทีมของเรามีประสบการณ์มากมายในการสร้างโซลูชันเทคนิคขั้นสูง' : 'Our senior engineers ensure every line of code meets the highest quality standards.'
        },
        {
            title: locale === 'th' ? 'วิธีการอ่อนตัว' : 'Agile Methodology',
            description: locale === 'th' ? 'เราใช้วิธีการทำงานแบบอ่อนตัวเพื่อให้โครงการของคุณสามารถปรับตัวได้อย่างรวดเร็ว' : 'We maintain regular communication, keeping your project on track with weekly sprints to meet your goals.'
        },
        {
            title: locale === 'th' ? 'การสนับสนุน 24/7' : 'End-to-End Support',
            description: locale === 'th' ? 'ที่ Logicton เราให้บริการสนับสนุนอย่างต่อเนื่องจากการออกแบบจนถึงการปรับปรุงในระยะยาว' : 'From initial concept to deployment and long-term maintenance.'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-background to-background/80">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left Content */}
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                {locale === 'th' ? 'นวัตกรรมเทคโนโลยี' : 'INNOVATING TECH'}
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                {locale === 'th' ? (
                                    <>
                                        สร้าง
                                        <br />
                                        <span className="text-blue-600">อนาคต</span>
                                        {' '}ของวิศวกรรม
                                    </>
                                ) : (
                                    <>
                                        Engineering
                                        <br />
                                        <span className="text-blue-600">Future</span>
                                        {' '}Solutions
                                    </>
                                )}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground">
                                {locale === 'th'
                                    ? 'Logicton ให้บริการโซลูชันซอฟต์แวร์และเทคโนโลยีล้ำสมัยเพื่อเพิ่มการเติบโต ปรับปรุงประสิทธิภาพ และแก้ไขความท้าทายทางเทคนิคที่ซับซ้อน'
                                    : 'Logicton delivers scalable software and cutting-edge technology strategies to empower global enterprises through precision engineering and AI-driven growth.'
                                }
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {locale === 'th' ? 'เริ่มต้นใช้งาน' : 'Get Started'}
                                </Link>
                                <Link
                                    href={`/${locale}/portfolio`}
                                    className="px-8 py-3 border border-border hover:bg-muted rounded-lg font-semibold transition-colors"
                                >
                                    {locale === 'th' ? 'ดูผลงาน' : 'View Portfolio'}
                                </Link>
                            </div>
                        </div>

                        {/* Right - Image/Graphic */}
                        <div className="hidden md:block">
                            <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl border border-blue-500/30">
                                <Image
                                    src="/images/web-preview.png"
                                    alt={locale === 'th' ? 'โซลูชันเทคโนโลยี' : 'Tech Solutions'}
                                    width={800}
                                    height={450}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">10+</div>
                            <div className="text-sm md:text-base text-gray-400">
                                {locale === 'th' ? 'ปีของประสบการณ์' : 'YEARS EXPERIENCE'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">200+</div>
                            <div className="text-sm md:text-base text-gray-400">
                                {locale === 'th' ? 'โครงการที่เสร็จสิ้น' : 'PROJECTS DELIVERED'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">50+</div>
                            <div className="text-sm md:text-base text-gray-400">
                                {locale === 'th' ? 'พันธมิตรทั่วโลก' : 'GLOBAL PARTNERS'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">99%</div>
                            <div className="text-sm md:text-base text-gray-400">
                                {locale === 'th' ? 'ความพึงพอใจของลูกค้า' : 'CLIENT RETENTION'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Core Services */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            {locale === 'th' ? 'บริการหลักของเรา' : 'Our Core Services'}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {locale === 'th'
                                ? 'เราแก้ปัญหาที่ซับซ้อนด้วยวิธีแก้ปัญหาทางเทคนิคที่เรียบง่าย'
                                : 'We turn complex problems into simplified, robust technical solutions.'
                            }
                        </p>
                    </div>

                    {!loading && services.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-all hover:border-primary/50 group"
                                >
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {service.title[locale as 'th' | 'en']}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {service.description[locale as 'th' | 'en']}
                                    </p>
                                    
                                    {service.features && service.features[locale as 'th' | 'en'] && (
                                        <ul className="space-y-3 mb-8">
                                            {service.features[locale as 'th' | 'en'].slice(0, 3).map((feature: string, fIdx: number) => (
                                                <li key={fIdx} className="flex items-center gap-3 text-sm">
                                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    <Link
                                        href={`/${locale}/services`}
                                        className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                                    >
                                        {locale === 'th' ? 'ดูรายละเอียด' : 'Learn More'}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Leaders Choose Section */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Image */}
                        <div className="rounded-2xl overflow-hidden aspect-square shadow-2xl">
                            <Image
                                src="/images/mobile-app.png"
                                alt={locale === 'th' ? 'ทีมมืออาชีพ' : 'Professional Team'}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right - Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                {locale === 'th' ? 'ทำไมผู้นำธุรกิจเลือก Logicton' : 'Why Leaders Choose Logicton'}
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                {locale === 'th'
                                    ? 'เราไม่ได้เพียงแค่เขียนโค้ด เราสร้างผลลัพธ์ วิธีการของเรามีความพึงพอใจจากลูกค้าและการทำงานที่มั่นคงภายยาว'
                                    : 'We do not just write code; we architect results. Our methodology combines agile speed with technical stability.'
                                }
                            </p>
                            <ul className="space-y-4">
                                {whyChooseItems.map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Projects Section */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex justify-between items-center mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {locale === 'th' ? 'โครงการล่าสุด' : 'Recent Projects'}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {locale === 'th'
                                    ? 'ดูผลงานล่าสุดของเรา'
                                    : 'Check out our latest work'
                                }
                            </p>
                        </div>
                        <Link
                            href={`/${locale}/portfolio`}
                            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                        >
                            {locale === 'th' ? 'ดูทั้งหมด' : 'View All'}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {!loadingPortfolio && portfolio.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {portfolio.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/${locale}/portfolio/${item.id}`}
                                    className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                        {item.images && item.images.length > 0 ? (
                                            <Image
                                                src={item.images[0]}
                                                alt={item.title[locale as 'th' | 'en']}
                                                width={400}
                                                height={225}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-300">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
                                            {item.category}
                                        </p>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {item.title[locale as 'th' | 'en']}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {item.description && item.description[locale as 'th' | 'en']}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Mobile View All Link */}
                    <div className="mt-12 md:hidden text-center">
                        <Link
                            href={`/${locale}/portfolio`}
                            className="inline-flex items-center gap-2 text-primary font-semibold"
                        >
                            {locale === 'th' ? 'ดูทั้งหมด' : 'View All'}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {locale === 'th' ? 'วิธีการทำงานของเรา' : 'How We Work'}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {locale === 'th'
                                ? 'กระบวนการง่ายๆ เพื่อเปลี่ยนเว็บไซต์ของคุณให้เป็นผลงานที่ใช้งานได้จริง'
                                : 'A simple, proven process to bring your website to life.'
                            }
                        </p>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {[
                                {
                                    number: '1',
                                    title: locale === 'th' ? 'แจ้งรายละเอียด' : 'Inform details',
                                    desc: locale === 'th'
                                        ? 'แชร์ความต้องการการออกแบบโดยส่งรูปอ้างอิงหรือแบบที่คุณชอบ เราจะใช้ข้อมูลนี้เพื่อทำความเข้าใจสไตล์และขอบเขต'
                                        : 'Share your design preferences by sending reference images or examples you like. We use this information to understand your style and scope.'
                                },
                                {
                                    number: '2',
                                    title: locale === 'th' ? 'ชำระเงิน' : 'Pay for service',
                                    desc: locale === 'th'
                                        ? 'เมื่อการชำระเงินถูกยืนยัน เราจะเริ่มกระบวนการออกแบบและส่งตัวอย่างการออกแบบ 3-6 แบบภายในระยะเวลาที่ตกลง'
                                        : 'Once the payment is confirmed, we begin the design process and deliver 3–6 design samples within the agreed timeframe.'
                                },
                                {
                                    number: '3',
                                    title: locale === 'th' ? 'ปรับแก้ผลงาน' : 'Modify the work',
                                    desc: locale === 'th'
                                        ? 'ขอแก้ไขตามต้องการ เรามีการแก้ไขไม่จำกัดจนกว่าคุณจะพอใจ'
                                        : 'Request revisions as needed. We offer unlimited revisions until you are fully satisfied.'
                                },
                                {
                                    number: '4',
                                    title: locale === 'th' ? 'ไฟล์สุดท้าย' : 'Final file',
                                    desc: locale === 'th'
                                        ? 'หลังการอนุมัติ เราส่งไฟล์สุดท้ายทางอีเมลในรูปแบบ .AI, .PSD, .JPG, และ .PNG'
                                        : 'After approval, we deliver all final files via email in .AI, .PSD, .JPG, and .PNG formats.'
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center md:pb-6 md:pt-0 relative z-10">
                                    <div className="relative -mt-2 md:-mt-6">
                                        <div className="mx-auto flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-sm md:text-base font-bold shadow-lg bg-blue-600 text-white ring-4 ring-white">
                                            <span className="font-bold">{step.number}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 md:mt-8">
                                        <h4 className="font-semibold text-md md:text-lg mb-2">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {locale === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {locale === 'th'
                                ? 'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับบริการของเรา'
                                : 'Answers to common questions about our services'
                            }
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: locale === 'th' ? 'โปรเจคต์ทัวๆ ใช้เวลานานเท่าไร?' : 'How long does a typical project take?',
                                answer: locale === 'th'
                                    ? 'โปรเจคต์ทัวๆ ใช้เวลาตั้งแต่ 2-6 สัปดาห์ ขึ้นอยู่กับความซับซ้อนและขอบเขตของโปรเจคต์'
                                    : 'Typical projects take 2-6 weeks, depending on complexity and scope.'
                            },
                            {
                                question: locale === 'th' ? 'คุณให้บริการหลังการขายไหม?' : 'Do you provide after-sales support?',
                                answer: locale === 'th'
                                    ? 'ใ่่ ให้บริการสนับสนุนหลังการขายเพื่อให้แน่ใจว่าทุกอย่างทำงานได้ดี'
                                    : 'Yes, we provide after-sales support to ensure everything works perfectly.'
                            },
                            {
                                question: locale === 'th' ? 'ค่าใช้จ่ายเป็นอย่างไร?' : 'How are your prices structured?',
                                answer: locale === 'th'
                                    ? 'เราให้ราคาที่โปร่งใสและแข่งขัน ขึ้นอยู่กับความต้องการของโปรเจคต์'
                                    : 'Our prices are transparent and competitive, based on project requirements.'
                            },
                            {
                                question: locale === 'th' ? 'ฉันสามารถขอแก้ไขได้ไหม?' : 'Can I request revisions?',
                                answer: locale === 'th'
                                    ? 'ใ่่ เราให้บริการแก้ไขไม่จำกัดเพื่อให้คุณพอใจกับผลงาน'
                                    : 'Yes, we offer unlimited revisions to ensure you are satisfied with the result.'
                            },
                            {
                                question: locale === 'th' ? 'เทคโนโลยีที่คุณใช้คืออะไรบ้าง?' : 'What technologies do you use?',
                                answer: locale === 'th'
                                    ? 'เราใช้เทคโนโลยีล้ำสมัยทั้งหมด รวมถึง React, Next.js, Node.js และอื่นๆ'
                                    : 'We use modern technologies including React, Next.js, Node.js, and more.'
                            },
                            {
                                question: locale === 'th' ? 'คุณมีประสบการณ์ในอุตสาหกรรมของฉันไหม?' : 'Do you have experience in my industry?',
                                answer: locale === 'th'
                                    ? 'ใ่่ เรามีประสบการณ์กับอุตสาหกรรมหลายประเภทและสามารถปรับตัวให้เหมาะสม'
                                    : 'Yes, we have experience across multiple industries and can adapt to your needs.'
                            }
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-border rounded-2xl overflow-hidden bg-card hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 flex-shrink-0 transition-transform ${
                                            openFaq === idx ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6">
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-6">
                            {locale === 'th'
                                ? 'ยังมีคำถามเพิ่มเติมหรือไม่?'
                                : 'Still have more questions?'
                            }
                        </p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
