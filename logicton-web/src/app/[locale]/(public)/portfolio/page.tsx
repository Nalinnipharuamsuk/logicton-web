"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioItem, Service } from '@/types';

export default function PortfolioPage() {
    const locale = useLocale();
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        Promise.all([
            fetch('/api/content/portfolio'),
            fetch('/api/content/services')
        ])
        .then(([portfolioRes, servicesRes]) => Promise.all([
            portfolioRes.json(),
            servicesRes.json()
        ]))
        .then(([portfolioData, servicesData]) => {
            if (portfolioData.success && portfolioData.data) {
                setPortfolio(portfolioData.data.filter((item: PortfolioItem) => item.isActive));
            }
            if (servicesData.success && servicesData.data) {
                setServices(servicesData.data.filter((service: Service) => service.isActive));
            }
        })
        .catch(console.error);
    }, []);

    const filteredPortfolio = filter === 'all'
        ? portfolio
        : portfolio.filter(item => item.category === filter);

    const totalPages = Math.ceil(filteredPortfolio.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedPortfolio = filteredPortfolio.slice(startIndex, startIndex + itemsPerPage);

    // Get categories from active services
    const servicesCategories = Array.from(new Set(services.map((service: Service) => service.category)));
    const categories = ['all', ...servicesCategories];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header Section */}
            <section className="py-16 md:py-24 bg-blue-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    {/* Subtitle */}
                    <div className="text-center mb-8">
                        <p className="text-blue-600 text-sm md:text-base font-semibold tracking-wider">OUR PORTFOLIO</p>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
                        Our Impact Through<br />Innovation
                    </h1>

                    {/* Description */}
                    <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
                        Explore how Logicton transforms industries through custom software and cutting-edge technology. We deliver results that matter.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-3 md:px-10 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                            Start Your Project
                        </button>
                        <button className="px-8 py-3 md:px-10 md:py-4 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border border-blue-200 transition-colors">
                            View All Cases
                        </button>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 md:py-12 bg-white border-b border-gray-200">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-wrap gap-3 items-center">
                        {categories.map((cat) => {
                            const serviceTitle = cat === 'all' 
                                ? 'ALL PROJECTS'
                                : services.find((s: Service) => s.category === cat)?.title[locale as 'th' | 'en'] || cat.toUpperCase();
                            return (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setFilter(cat);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                                        filter === cat
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {serviceTitle}
                                </button>
                            );
                        })}
                        <div className="ml-auto">
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                                Most Recent
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {displayedPortfolio.map((item) => (
                            <Link
                                key={item.id}
                                href={`/${locale}/portfolio/${item.id}`}
                                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                    {item.images && item.images.length > 0 ? (
                                        <img
                                            src={item.images[0]}
                                            alt={item.title[locale as 'th' | 'en']}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                                        {services.find((s: Service) => s.category === item.category)?.title[locale as 'th' | 'en'] || item.category}
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-3 mt-12 md:mt-16">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-full font-semibold transition-all ${
                                        page === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gray-900 text-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            Ready to build your next<br />breakthrough?
                        </h2>
                        <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
                            Join the ranks of leading enterprises that trust Logicton for their most critical software initiatives.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                                Schedule a Consultation
                            </button>
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-transparent hover:bg-gray-800 text-white font-semibold rounded-lg border border-white transition-colors">
                                Our Process
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}