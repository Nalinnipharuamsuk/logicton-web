"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import type { CompanyInfo, TeamMember } from '@/types';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
    const locale = useLocale();
    const [company, setCompany] = useState<CompanyInfo | null>(null);
    const [team, setTeam] = useState<TeamMember[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('/api/content/company').then(res => res.json()),
            fetch('/api/content/team').then(res => res.json())
        ])
        .then(([companyData, teamData]) => {
            if (companyData.success && companyData.data) {
                setCompany(companyData.data);
            }
            if (teamData.success && teamData.data) {
                setTeam(teamData.data.filter((m: TeamMember) => m.isActive).sort((a: TeamMember, b: TeamMember) => a.order - b.order));
            }
        })
        .catch(console.error);
    }, []);

    const values = [
        {
            key: locale === 'th' ? 'professional' : 'professional',
            label: locale === 'th' ? 'มืออาชีพและมีประสบการณ์' : 'Professional and experienced development team',
        },
        {
            key: locale === 'th' ? 'communication' : 'communication',
            label: locale === 'th' ? 'การสื่อสารที่เข้มแข็งและความร่วมมือระดับโลก' : 'Strong communication and global collaboration',
        },
        {
            key: locale === 'th' ? 'support' : 'support',
            label: locale === 'th' ? 'สนับสนุนบัณฑิตใหม่และการฝึกสัง' : 'Support for new graduates and interns',
        },
        {
            key: locale === 'th' ? 'partnership' : 'partnership',
            label: locale === 'th' ? 'จิตสำนักความเป็นหุ่นพยาบาลระยะยาว' : 'Long-term partnership mindset',
        },
    ];

    return (
        <div className="w-full bg-gray-100 dark:bg-slate-800 min-h-screen">
            <div className="w-full max-w-[1200px] mx-auto px-6 pb-20 pt-10">
                {/* Hero Section */}
                <div 
                    className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/portfolio/hero-bg.jpg)',
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold">About Company</h1>
                    </div>
                </div>

                {/* Company Description Section */}
                <div className="p-6 py-20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                {company?.description[locale as 'th' | 'en'] || 'A technology development company dedicated to creating high-quality solutions to elevate our clients\' businesses to global standards'}
                            </p>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {company?.history[locale as 'th' | 'en'] || 'Founded with a vision to create technology that changes world'}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img 
                                src="/images/portfolio/company-image.jpg" 
                                alt="Company"
                                className="rounded-lg shadow-lg w-full max-w-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Our Mission & What We Stand For Section */}
                <div className="p-6 py-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Our Mission */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-full">
                                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {company?.description[locale as 'th' | 'en'] || 'To deliver exceptional technology solutions that empower businesses to thrive in the digital age, while fostering innovation, excellence, and sustainable growth for our clients and team members.'}
                                </p>
                            </div>
                        </div>

                        {/* What We Stand For */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Stand For</h2>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-full">
                                <div className="grid gap-4">
                                    {values.map((value, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                                                {value.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="p-6 py-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.id} className="text-center">
                                <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg mb-4 overflow-hidden shadow-md">
                                    {member.photo && (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name[locale as 'th' | 'en']}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <h4 className="font-semibold text-sm md:text-base">{member.name[locale as 'th' | 'en']}</h4>
                                <p className="text-xs md:text-sm text-muted-foreground">{member.role[locale as 'th' | 'en']}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}