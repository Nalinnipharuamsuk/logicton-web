"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Smartphone, Cloud, Shield, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AppLandingPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized architecture and instant load times.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Seamlessly works on all devices with responsive design and touch-optimized interface.'
    },
    {
      icon: Cloud,
      title: 'Cloud Powered',
      description: 'Reliable cloud infrastructure with automatic scaling and 99.9% uptime guarantee.'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Enterprise-grade security with encryption, SSL, and regular security audits.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Real-time collaboration features enabling teams to work together effortlessly.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Comprehensive analytics and insights to track performance and growth metrics.'
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, Tech Startup',
      image: '👨‍💼',
      quote: 'This app completely transformed how we manage our projects. Highly recommended!'
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      image: '👩‍💼',
      quote: 'The best investment we made. Our team productivity increased by 40% within a month.'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, Digital Agency',
      image: '👨‍🔬',
      quote: 'Outstanding support and features. Worth every penny and more!'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-1/4 w-3/4 h-3/4 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/50">
              ✨ Introducing Next Generation App
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform Your Business
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mt-2">
              With Cutting-Edge Technology
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Revolutionize your workflow with our powerful, intuitive platform. Designed for modern teams who demand excellence, speed, and reliability.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Get Started Now
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 border-2 border-gray-500 hover:border-white text-white font-bold rounded-lg transition-all duration-300 hover:bg-white/10">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Image/Placeholder */}
        <motion.div
          className="mt-20 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 p-8 backdrop-blur-sm">
            <div className="bg-slate-800/50 rounded-lg h-80 flex items-center justify-center border border-slate-700">
              <div className="text-center">
                <Smartphone size={80} className="text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">App Preview & Demo</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed in one comprehensive platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-700/70"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-block p-3 bg-blue-500/20 rounded-lg mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <Icon size={28} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Why Choose Us
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                We&apos;re committed to delivering excellence in every aspect of our service.
              </p>
              
              <div className="space-y-4">
                {[
                  'Industry-leading expertise and innovation',
                  '24/7 Customer support and assistance',
                  'Flexible pricing to fit any budget',
                  'Proven track record with 10,000+ happy users',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-800/50 rounded-lg h-96 flex items-center justify-center border border-slate-700">
                <p className="text-gray-400">Additional Visual Content</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400">
              Trusted by thousands of companies worldwide
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{testimonial.image}</span>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl border border-blue-500/50 p-12 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of satisfied customers. Start your free trial today with no credit card required.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </button>
            </form>

            {subscribed && (
              <motion.p
                className="text-green-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✓ Thank you! Check your email for next steps.
              </motion.p>
            )}

            <p className="text-gray-400 text-sm">
              No spam, no credit card required. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2026 Your App Name. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
