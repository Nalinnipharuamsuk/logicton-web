import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.service.deleteMany()
  await prisma.portfolioItem.deleteMany()

  // Create services
  await prisma.service.createMany({
    data: [
      {
        titleTh: 'พัฒนาเว็บแอปพลิเคชัน',
        titleEn: 'Web Application Development',
        descriptionTh: 'พัฒนาเว็บแอปพลิเคชันที่ทันสมัยและใช้งานง่ายด้วยเทคโนโลยีล่าสุด',
        descriptionEn: 'Modern and user-friendly web applications built with cutting-edge technology',
        icon: 'Code',
      },
      {
        titleTh: 'พัฒนาแอปมือถือ',
        titleEn: 'Mobile App Development',
        descriptionTh: 'แอปพลิเคชันมือถือสำหรับ iOS และ Android ที่มีประสิทธิภาพสูง',
        descriptionEn: 'Native and cross-platform mobile apps for iOS and Android',
        icon: 'Smartphone',
      },
      {
        titleTh: 'ออกแบบกราฟิกและแอนิเมชัน',
        titleEn: 'Motion Graphics',
        descriptionTh: 'สร้างกราฟิกเคลื่อนไหวและแอนิเมชันดิจิทัลที่น่าสนใจ',
        descriptionEn: 'Engaging motion graphics and digital animations',
        icon: 'Video',
      },
    ],
  })

    // Create portfolio items
    await prisma.portfolioItem.createMany({
      data: [
        {
          titleTh: 'เว็บไซต์อีคอมเมิร์ซ',
          titleEn: 'E-commerce Website',
          descriptionTh: 'เว็บไซต์ขายสินค้าออนไลน์ที่ทันสมัยและใช้งานง่าย',
          descriptionEn: 'Modern and user-friendly online shopping website',
          clientName: 'Sample Client Co.',
          clientIndustry: 'Retail',
          technologies: 'Next.js,TypeScript,Tailwind CSS,Stripe',
          images: '/images/browser-mockup.png',
          demoUrl: 'https://demo.example.com',
          category: 'web',
          completedDate: new Date('2023-12-01'),
          featured: true,
          isActive: true,
        },
        {
          titleTh: 'แดชบอร์ดบริษัท',
          titleEn: 'Corporate Dashboard',
          descriptionTh: 'ระบบจัดการข้อมูลบริษัทที่ครบวงจร',
          descriptionEn: 'Complete corporate data management system',
          clientName: 'Tech Corp',
          clientIndustry: 'Technology',
          technologies: 'React,Node.js,MongoDB,Chart.js',
          images: '/images/dashboard-mockup.png',
          demoUrl: 'https://dashboard.example.com',
          category: 'web',
          completedDate: new Date('2024-01-15'),
          featured: true,
          isActive: true,
        },
        {
          titleTh: 'แอปพลิเคชันเพื่อการศึกษา',
          titleEn: 'Education App',
          descriptionTh: 'แพลตฟอร์มการเรียนรู้แบบออนไลน์',
          descriptionEn: 'Online learning platform',
          clientName: 'Edu Tech',
          clientIndustry: 'Education',
          technologies: 'React Native,Firebase,Redux',
          images: '/images/website-mockup-1.png',
          demoUrl: 'https://eduapp.example.com',
          category: 'mobile',
          completedDate: new Date('2024-02-20'),
          featured: false,
          isActive: true,
        },
      ],
    })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })