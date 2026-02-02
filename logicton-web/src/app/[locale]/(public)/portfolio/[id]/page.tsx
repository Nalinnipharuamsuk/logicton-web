"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, User } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioItem } from '@/types';

export default function PortfolioDetailPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/content/portfolio/${params.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setItem(data.data);
        }
      } catch (error) {
        console.error('Failed to load portfolio item:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [params.id]);

  const getCategoryLabel = (category: PortfolioItem['category']) => {
    switch (category) {
      case 'web':
        return locale === 'th' ? 'เว็บไซต์' : 'Web';
      case 'mobile':
        return locale === 'th' ? 'มือถือ' : 'Mobile';
      case 'animation':
        return locale === 'th' ? 'แอนิเมชัน' : 'Animation';
      case 'framework':
        return locale === 'th' ? 'เฟรมเวิร์ก' : 'Framework';
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary text-primary"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio Item Not Found</h1>
        <p className="text-muted-foreground mb-8">
          {locale === 'th' 
            ? 'ไม่พบผลงานที่คุณค้นหา' 
            : 'The portfolio item you are looking for does not exist'}
        </p>
        <Link
          href="/portfolio"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {locale === 'th' ? 'กลับไปหน้าผลงาน' : 'Back to Portfolio'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/portfolio" className="hover:text-foreground transition-colors">
          {locale === 'th' ? 'ผลงาน' : 'Portfolio'}
        </Link>
        <span>/</span>
        <span className="text-foreground">{item.title[locale as 'th' | 'en']}</span>
      </nav>

      {/* Header Section */}
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0">
            {item.images[0] && (
              <img 
                src={item.images[0]} 
                alt={item.title[locale as 'th' | 'en']}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                  <Tag className="h-4 w-4" />
                  <span>{getCategoryLabel(item.category)}</span>
                </span>
                {item.featured && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    {locale === 'th' ? 'แนะนำ' : 'Featured'}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                {item.title[locale as 'th' | 'en']}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {item.description[locale as 'th' | 'en']}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm text-muted-foreground block">
                    {locale === 'th' ? 'ลูกค้า' : 'Client'}
                  </span>
                  <span className="font-medium text-foreground">{item.client.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm text-muted-foreground block">
                    {locale === 'th' ? 'อุตสาหกรรม' : 'Industry'}
                  </span>
                  <span className="font-medium text-foreground">{item.client.industry}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-sm text-muted-foreground block">
                    {locale === 'th' ? 'วันที่เสร็จสิ้น' : 'Completed'}
                  </span>
                  <span className="font-medium text-foreground">{item.completedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {locale === 'th' ? 'ดู Demo' : 'Live Demo'}
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      {item.technologies.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {locale === 'th' ? 'เทคโนโลยีที่ใช้' : 'Technologies Used'}
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {item.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {item.images.length > 1 && (
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            {locale === 'th' ? 'รูปภาพเพิ่มเติม' : 'Gallery'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {item.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${item.title[locale as 'th' | 'en']} ${index + 2}`}
                className="w-full aspect-video object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        {locale === 'th' ? 'กลับไปหน้าผลงาน' : 'Back to Portfolio'}
      </Link>
    </div>
  );
}