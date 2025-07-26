import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import { Users, Target, Zap, Heart, Calendar, ChevronRight } from "lucide-react";

const About = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Pushing boundaries in AI and system integration"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Integrity",
      description: "Transparent processes and ethical AI practices"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Velocity",
      description: "Rapid deployment without compromising quality"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Impact",
      description: "Measurable results that transform businesses"
    }
  ];

  const timeline = [
    { year: "2014", event: "Founded with a vision to bridge data silos" },
    { year: "2017", event: "First AI-powered integration platform launched" },
    { year: "2020", event: "100+ enterprise clients milestone" },
    { year: "2023", event: "Advanced predictive analytics release" },
    { year: "2025", event: "Next-gen autonomous systems in development" }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former MIT AI researcher with 15+ years in enterprise systems",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5ab?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google engineer, architect of scalable AI infrastructures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning, pioneer in operational intelligence",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const stats = [
    { value: "250+", label: "Global Clients" },
    { value: "47", label: "Countries" },
    { value: "99.9%", label: "System Uptime" },
    { value: "12", label: "AI Models" }
  ];

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={isHeroInView ? "animate" : "initial"}
          >
            {/* Animated Timeline */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="flex justify-center items-center space-x-4 mb-8 overflow-x-auto">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="text-center">
                      <div className="w-4 h-4 bg-aurora-start rounded-full mb-2 mx-auto" />
                      <div className="text-sm font-satoshi font-bold text-aurora-start">{item.year}</div>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-16 h-px bg-border mx-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8"
            >
              Our Origin Story
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12"
            >
              We were born to untangle complexity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Block */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="EAGER MARVEL founders"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-satoshi font-black text-foreground">
                Our Manifesto
              </h2>
              <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                In 2014, we witnessed brilliant organizations drowning in their own data. Systems that should have been allies became adversaries. Intelligence scattered across silos, potential trapped in legacy architectures.
              </p>
              <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                We didn't set out to build another software company. We set out to be digital archaeologists—unearthing buried insights, connecting isolated islands of intelligence, and awakening the dormant potential in every enterprise system.
              </p>
              <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                Today, we're not just solving problems. We're fundamentally reimagining how intelligence flows through organizations, how decisions emerge from data, and how technology serves human intuition rather than replacing it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-satoshi font-black text-center text-foreground mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-card border border-border rounded-2xl p-8 text-center group hover:border-aurora-start transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-aurora-start mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-satoshi font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-inter">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-satoshi font-black text-center text-foreground mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Meet the Architects
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-card border border-border rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-aurora-start font-inter mb-3">{member.role}</p>
                  <p className="text-muted-foreground font-inter text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-inter">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="bg-gradient-aurora rounded-3xl p-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-midnight mb-8">
              Meet the architects of your next leap
            </h2>
            <p className="text-xl text-midnight/80 font-inter mb-12 max-w-2xl mx-auto">
              Ready to transform your organization? Let's discuss your vision.
            </p>
            
            <CTAButton variant="secondary" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Call
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;