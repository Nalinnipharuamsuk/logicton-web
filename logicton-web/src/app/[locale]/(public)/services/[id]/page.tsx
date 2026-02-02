"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Layout, Smartphone, Film, Code, CheckCircle, Zap, Users, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '@/types';

export default function ServiceDetailPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/content/services/${params.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setService(data.data);
          
          // Load related services
          const allRes = await fetch('/api/content/services');
          const allData = await allRes.json();
          if (allData.success && allData.data) {
            const related = allData.data
              .filter((s: Service) => s.category === data.data.category && s.id !== data.data.id && s.isActive)
              .slice(0, 3);
            setRelatedServices(related);
          }
        }
      } catch (error) {
        console.error('Failed to load service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [params.id]);

  const getCategoryIcon = (category: Service['category']) => {
    switch (category) {
      case 'web':
        return <Layout className="h-6 w-6" />;
      case 'mobile':
        return <Smartphone className="h-6 w-6" />;
      case 'animation':
        return <Film className="h-6 w-6" />;
      case 'framework':
        return <Code className="h-6 w-6" />;
      default:
        return <Layout className="h-6 w-6" />;
    }
  };

  const getCategoryLabel = (category: Service['category']) => {
    switch (category) {
      case 'web':
        return locale === 'th' ? 'พัฒนาเว็บไซต์' : 'Web Development';
      case 'mobile':
        return locale === 'th' ? 'พัฒนาแอปมือถือ' : 'Mobile Development';
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{locale === 'th' ? 'กำลังโหลด...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-4xl font-bold mb-4">{locale === 'th' ? 'ไม่พบบริการ' : 'Service Not Found'}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          {locale === 'th' 
            ? 'ขออภัย บริการที่คุณค้นหาไม่มีอยู่ หรืออาจถูกลบไปแล้ว' 
            : 'Sorry, the service you are looking for does not exist or has been removed.'}
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          {locale === 'th' ? 'กลับไปหน้าบริการ' : 'Back to Services'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary/5 via-transparent to-primary/5 mb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
              {locale === 'th' ? 'หน้าแรก' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/services`} className="hover:text-foreground transition-colors">
              {locale === 'th' ? 'บริการ' : 'Services'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service?.title[locale as 'th' | 'en']}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Icon and Category */}
            <div className="shrink-0">
              <div className="w-32 h-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center text-8xl shadow-xl border border-primary/20">
                {service?.icon}
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4 border border-primary/20">
                {getCategoryIcon(service?.category || 'web')}
                <span>{getCategoryLabel(service?.category || 'web')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                {service?.title[locale as 'th' | 'en']}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                {service?.description[locale as 'th' | 'en']}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  {locale === 'th' ? '📞 ติดต่อเรา' : '📞 Contact Us'}
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all font-semibold flex items-center justify-center gap-2 border border-border"
                >
                  <ArrowLeft className="h-5 w-5" />
                  {locale === 'th' ? 'บริการอื่น ๆ' : 'All Services'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {locale === 'th' ? '✨ คุณสมบัติหลัก' : '✨ Key Features'}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {service?.features[locale as 'th' | 'en'].map((feature, index) => (
                  <div 
                    key={index}
                    className="group relative overflow-hidden bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Section */}
            {service && service.technologies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-foreground">
                  {locale === 'th' ? '⚙️ เทคโนโลยีที่ใช้' : '⚙️ Technologies Used'}
                </h2>
                
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-linear-to-r from-primary/10 to-primary/5 text-primary rounded-full font-semibold border border-primary/20 hover:border-primary/50 hover:shadow-md transition-all transform hover:scale-105 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* How We Work */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {locale === 'th' ? '🎯 วิธีการทำงานของเรา' : '🎯 How We Work'}
              </h2>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex gap-4 bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {locale === 'th' 
                          ? ['วิเคราะห์ความต้องการ', 'ออกแบบและวางแผน', 'พัฒนาและสร้าง', 'ทดสอบและส่งมอบ'][step - 1]
                          : ['Analyze Requirements', 'Design & Planning', 'Development', 'Testing & Delivery'][step - 1]
                        }
                      </h3>
                      <p className="text-muted-foreground">
                        {locale === 'th'
                          ? ['เข้าใจความต้องการของคุณอย่างลึกซึ้ง', 'สร้างแผนและการออกแบบที่ชาญฉลาด', 'พัฒนาโซลูชันที่มีคุณภาพสูง', 'ประเมินคุณภาพและส่งมอบผลลัพธ์'][step - 1]
                          : ['Understanding your requirements deeply', 'Creating smart plans and designs', 'Building high-quality solutions', 'Testing quality and delivering results'][step - 1]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Benefits Box */}
            <div className="bg-linear-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 p-8 sticky top-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {locale === 'th' ? '📊 ประโยชน์' : '📊 Benefits'}
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: Zap, label: locale === 'th' ? 'รวดเร็ว' : 'Fast' },
                  { icon: Shield, label: locale === 'th' ? 'ปลอดภัย' : 'Secure' },
                  { icon: Users, label: locale === 'th' ? 'รองรับ' : 'Support' },
                  { icon: BarChart3, label: locale === 'th' ? 'ประสิทธิภาพ' : 'Efficient' },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{benefit.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl p-8 text-primary-foreground shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'th' 
                  ? '🚀 พร้อมเริ่มต้นหรือยัง?' 
                  : '🚀 Ready to Start?'}
              </h3>
              <p className="text-sm opacity-90 mb-6 leading-relaxed">
                {locale === 'th'
                  ? 'ติดต่อเราวันนี้เพื่อปรึกษาเกี่ยวกับโปรเจกต์ของคุณและรับข้อเสนอพิเศษ'
                  : 'Contact us today to discuss your project and get a special offer.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="block w-full text-center px-6 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-bold"
              >
                {locale === 'th' ? '✉️ ติดต่อเรา' : '✉️ Contact Us'}
              </Link>
              <div className="mt-4 pt-4 border-t border-primary-foreground/20 text-xs opacity-75 text-center">
                {locale === 'th' ? 'ตอบสนองอย่างรวดเร็ว' : 'Quick Response'}
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {locale === 'th' ? '🔗 บริการอื่น ๆ' : '🔗 Related Services'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((relService) => (
                <Link
                  key={relService.id}
                  href={`/${locale}/services/${relService.id}`}
                  className="group bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {relService.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {relService.title[locale as 'th' | 'en']}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relService.description[locale as 'th' | 'en']}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-16 mb-8">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            {locale === 'th' ? '← กลับไปหน้าบริการ' : '← Back to Services'}
          </Link>
        </div>
      </div>
    </div>
  );
}