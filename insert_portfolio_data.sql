INSERT INTO PortfolioItem (id, titleTh, titleEn, descriptionTh, descriptionEn, clientName, clientIndustry, technologies, images, demoUrl, category, completedDate, featured, isActive, createdAt, updatedAt)
VALUES 
('portfolio_1', 'เว็บไซต์อีคอมเมิร์ซ', 'E-commerce Website', 'เว็บไซต์ขายสินค้าออนไลน์ที่ทันสมัย', 'Modern online shopping website', 'Sample Client Co.', 'Retail', 'Next.js,TypeScript,Tailwind CSS,Stripe', '/images/browser-mockup.png', 'https://demo.example.com', 'web', '2023-12-01', 1, 1, NOW(), NOW()),
('portfolio_2', 'แดชบอร์ดบริษัท', 'Corporate Dashboard', 'ระบบจัดการข้อมูลบริษัทที่ครบวงจร', 'Complete data management system', 'Tech Corp', 'Technology', 'React,Node.js,MongoDB,Chart.js', '/images/dashboard-mockup.png', 'https://dashboard.example.com', 'web', '2024-01-15', 1, 1, NOW(), NOW()),
('portfolio_3', 'แอปพลิเคชันเพื่อการศึกษา', 'Education App', 'แพลตฟอร์มการเรียนรู้แบบออนไลน์', 'Online learning platform', 'Edu Tech', 'Education', 'React Native,Firebase,Redux', '/images/website-mockup-1.png', 'https://eduapp.example.com', 'mobile', '2024-02-20', 0, 1, NOW(), NOW());

INSERT INTO Service (id, titleTh, titleEn, descriptionTh, descriptionEn, icon, isActive, createdAt, updatedAt)
VALUES 
('s1', 'พัฒนาเว็บแอปพลิเคชัน', 'Web Application Development', 'พัฒนาเว็บแอปพลิเคชันที่ทันสมัย', 'Modern web applications', 'Code', 1, NOW(), NOW()),
('s2', 'พัฒนาแอปมือถือ', 'Mobile App Development', 'แอปพลิเคชันมือถือ iOS/Android', 'Mobile apps for iOS/Android', 'Smartphone', 1, NOW(), NOW()),
('s3', 'ออกแบบกราฟิกและแอนิเมชัน', 'Motion Graphics', 'สร้างกราฟิกเคลื่อนไหวที่น่าสนใจ', 'Engaging motion graphics', 'Video', 1, NOW(), NOW());