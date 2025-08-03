import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp } from "@/lib/variants";
import { Search, BookOpen, Video, Download, Clock, Calendar, ArrowRight, Filter, Tag } from "lucide-react";

const Resources = () => {
  const [activeTab, setActiveTab] = useState<"blog" | "whitepapers" | "webinars">("blog");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/xovaodeb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          _subject: 'Newsletter Subscription Request',
          type: 'newsletter_subscription'
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
    
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Enterprise Operations",
      excerpt: "Exploring how artificial intelligence is revolutionizing business operations and what leaders need to know.",
      author: "Dr. Sarah Chen",
      date: "2025-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      tags: ["AI", "Strategy", "Operations"],
      featured: true
    },
    {
      id: 2,
      title: "System Integration Best Practices",
      excerpt: "A comprehensive guide to connecting disparate systems without creating technical debt.",
      author: "Marcus Rodriguez",
      date: "2025-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["Integration", "Technical", "Best Practices"]
    },
    {
      id: 3,
      title: "Measuring ROI in Digital Transformation",
      excerpt: "How to establish clear metrics and track the success of your transformation initiatives.",
      author: "Lisa Park",
      date: "2025-01-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["ROI", "Metrics", "Transformation"]
    },
    {
      id: 4,
      title: "Predictive Analytics in Manufacturing",
      excerpt: "Real-world applications of predictive analytics that are transforming manufacturing operations.",
      author: "James Wilson",
      date: "2024-12-28",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=250&fit=crop",
      tags: ["Manufacturing", "Predictive Analytics", "Case Study"]
    },
    {
      id: 5,
      title: "Building Data-Driven Culture",
      excerpt: "Strategies for fostering a culture that embraces data-driven decision making at all levels.",
      author: "Dr. Aisha Patel",
      date: "2024-12-20",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      tags: ["Culture", "Data", "Leadership"]
    },
    {
      id: 6,
      title: "Security in AI Systems",
      excerpt: "Understanding and mitigating security risks in artificial intelligence implementations.",
      author: "Robert Kim",
      date: "2024-12-15",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
      tags: ["Security", "AI", "Risk Management"]
    }
  ];

  const whitepapers = [
    {
      id: 1,
      title: "The Complete Guide to AI-Powered Operations",
      description: "A comprehensive 40-page guide covering everything from AI strategy to implementation.",
      pages: 40,
      downloads: "2.3k",
      category: "Strategy",
      gated: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "System Integration Playbook",
      description: "Step-by-step methodology for successful enterprise system integration projects.",
      pages: 28,
      downloads: "1.8k",
      category: "Technical",
      gated: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "ROI Calculator for Digital Transformation",
      description: "Interactive tools and frameworks for measuring transformation success.",
      pages: 24,
      downloads: "3.1k",
      category: "Finance",
      gated: false,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop"
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "AI Strategy Workshop: From Vision to Implementation",
      description: "Join our experts for a live workshop on building your AI roadmap.",
      date: "2025-02-15",
      time: "2:00 PM EST",
      duration: "90 min",
      speakers: ["Dr. Sarah Chen", "Marcus Rodriguez"],
      type: "upcoming",
      registrations: 234,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Operational Excellence Through Predictive Analytics",
      description: "Learn how leading companies are using predictive analytics to optimize operations.",
      date: "2025-02-28",
      time: "1:00 PM EST",
      duration: "60 min",
      speakers: ["Dr. Aisha Patel"],
      type: "upcoming",
      registrations: 187,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "System Integration Masterclass",
      description: "Deep dive into enterprise integration patterns and best practices.",
      date: "2025-01-10",
      duration: "75 min",
      speakers: ["Marcus Rodriguez", "James Wilson"],
      type: "replay",
      views: "1.2k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
    },
    {
      id: 4,
      title: "Building Data-Driven Organizations",
      description: "Strategies for creating a culture of data-driven decision making.",
      date: "2024-12-15",
      duration: "60 min",
      speakers: ["Dr. Sarah Chen", "Lisa Park"],
      type: "replay",
      views: "2.8k",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop"
    }
  ];

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Learn & Nurture
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Insights, strategies, and tools to accelerate your transformation journey
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-aurora-start"
            />
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex justify-center space-x-1 bg-card border border-border rounded-2xl p-2 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              { key: "blog", label: "Blog", icon: <BookOpen className="w-5 h-5" /> },
              { key: "whitepapers", label: "Whitepapers", icon: <Download className="w-5 h-5" /> },
              { key: "webinars", label: "Webinars", icon: <Video className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${
                  activeTab === tab.key
                    ? "bg-aurora-start text-midnight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="font-satoshi font-bold">{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      {activeTab === "blog" && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            {/* Tag Filters */}
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-aurora-start text-midnight'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Featured Post */}
            {filteredBlogPosts.length > 0 && filteredBlogPosts[0].featured && (
              <motion.div
                className="bg-card border border-border rounded-3xl overflow-hidden mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <img
                    src={filteredBlogPosts[0].image}
                    alt={filteredBlogPosts[0].title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="p-8 flex flex-col justify-center">
                    <div className="bg-aurora-start text-midnight px-3 py-1 rounded-full text-sm font-bold inline-block w-fit mb-4">
                      Featured
                    </div>
                    <h2 className="text-3xl font-satoshi font-black text-foreground mb-4">
                      {filteredBlogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground font-inter mb-6">
                      {filteredBlogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <span>{filteredBlogPosts[0].author}</span>
                      <span>•</span>
                      <span>{filteredBlogPosts[0].date}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {filteredBlogPosts[0].readTime}
                      </span>
                    </div>
                    <CTAButton variant="primary">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogPosts.slice(filteredBlogPosts[0]?.featured ? 1 : 0).map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-aurora-start transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-satoshi font-bold text-foreground mb-3 group-hover:text-aurora-start transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "whitepapers" && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whitepapers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-aurora-start text-midnight px-3 py-1 rounded-full text-sm font-bold">
                        {paper.category}
                      </span>
                      {paper.gated && (
                        <span className="text-photon text-sm font-bold">Gated</span>
                      )}
                    </div>
                    <h3 className="text-xl font-satoshi font-bold text-foreground mb-3">
                      {paper.title}
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm mb-4">
                      {paper.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
                      <span>{paper.pages} pages</span>
                      <span>{paper.downloads} downloads</span>
                    </div>
                    <CTAButton variant="secondary" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      {paper.gated ? "Get Access" : "Download"}
                    </CTAButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "webinars" && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            {/* Upcoming Webinars */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-satoshi font-black text-foreground mb-8">
                Upcoming Events
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {webinars.filter(w => w.type === "upcoming").map((webinar, index) => (
                  <div
                    key={webinar.id}
                    className="bg-card border border-aurora-start rounded-2xl overflow-hidden"
                  >
                    <img
                      src={webinar.image}
                      alt={webinar.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-aurora-start mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {webinar.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {webinar.duration}
                        </div>
                      </div>
                      <h3 className="text-xl font-satoshi font-bold text-foreground mb-3">
                        {webinar.title}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm mb-4">
                        {webinar.description}
                      </p>
                      <div className="text-sm text-muted-foreground mb-6">
                        Speakers: {webinar.speakers.join(", ")}
                      </div>
                      <CTAButton variant="primary" className="w-full">
                        Register Now ({webinar.registrations} registered)
                      </CTAButton>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Replay Library */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-satoshi font-black text-foreground mb-8">
                Replay Library
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {webinars.filter(w => w.type === "replay").map((webinar, index) => (
                  <div
                    key={webinar.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-aurora-start transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-midnight/40 flex items-center justify-center">
                        <Video className="w-12 h-12 text-aurora-start" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span>{webinar.date}</span>
                        <span>•</span>
                        <span>{webinar.duration}</span>
                        <span>•</span>
                        <span>{webinar.views} views</span>
                      </div>
                      <h3 className="text-xl font-satoshi font-bold text-foreground mb-3">
                        {webinar.title}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm mb-4">
                        {webinar.description}
                      </p>
                      <div className="text-sm text-muted-foreground mb-6">
                        Speakers: {webinar.speakers.join(", ")}
                      </div>
                      <CTAButton variant="secondary" className="w-full">
                        <Video className="w-4 h-4 mr-2" />
                        Watch Replay
                      </CTAButton>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-aurora">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-satoshi font-black text-midnight mb-4">
              Stay Updated with Thuraya
            </h2>
            <p className="text-xl text-midnight/80 font-inter mb-8 max-w-2xl mx-auto">
              Get the latest insights, case studies, and industry updates delivered to your inbox.
            </p>
            
            {newsletterStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 max-w-lg mx-auto">
                Thank you for subscribing! Check your email for confirmation.
              </div>
            )}
            
            {newsletterStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 max-w-lg mx-auto">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-full text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-midnight"
              />
              <CTAButton 
                variant="secondary"
                type="submit"
                disabled={newsletterStatus === 'submitting'}
                onClick={undefined}
              >
                {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </CTAButton>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;