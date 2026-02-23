import { TreesIcon as TreePine, Phone, MapPin, Clock, Leaf, ShieldCheck, Truck, ChevronDown } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import heroImage from "@/assets/hero-trees.jpg";
import { Button } from "@/components/ui/button";
import TreeCatalog from "@/components/TreeCatalog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig, fetchFeatures, fetchOrderSteps } from "@/api/nursery";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const { data: siteConfig } = useQuery({ queryKey: ["siteConfig"], queryFn: fetchSiteConfig });
  const { data: features } = useQuery({ queryKey: ["features"], queryFn: fetchFeatures });
  const { data: orderSteps } = useQuery({ queryKey: ["orderSteps"], queryFn: fetchOrderSteps });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const whatsappNumber = siteConfig?.whatsapp_number || "+916291381840";

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const leaves = useMemo(() => [...Array(8)].map((_, i) => ({
    id: i,
    size: 16 + Math.random() * 24,
    x: `${Math.random() * 90 + 5}vw`,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  })), []);

  const playClick = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => { }); // Catch if browser blocks auto-play
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={playClick}
          >
            <TreePine className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              {siteConfig?.site_name || "UrbanRoots Nursery"}
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-muted-foreground">
            {["Our Trees", "About Us", "Contact"].map((label, i) => (
              <motion.a
                key={label}
                href={`#${["catalog", "about", "contact"][i]}`}
                className="relative hover:text-primary transition-colors py-2"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={playClick}
              >
                {label}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                />
              </motion.a>
            ))}
          </div>
          <div onClick={playClick}>
            <WhatsAppButton phone={whatsappNumber} message="Hi! I'm interested in buying trees." size="sm" />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={heroImage} alt="Beautiful tree nursery" className="w-full h-full object-cover shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-overlay)/0.4)] via-[hsl(var(--hero-overlay)/0.5)] to-[hsl(var(--background))]" />
        </motion.div>

        {/* Floating leaf particles */}
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute text-primary-foreground/15 pointer-events-none"
            initial={{ y: "110vh", x: leaf.x, rotate: 0, opacity: 0 }}
            animate={{
              y: "-20vh",
              rotate: leaf.rotation + 720,
              opacity: [0, 1, 1, 0],
              x: `calc(${leaf.x} + ${Math.sin(leaf.id) * 100}px)`
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay,
            }}
          >
            <Leaf style={{ width: leaf.size, height: leaf.size }} />
          </motion.div>
        ))}

        <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold gradient-text mb-8 leading-[1.1] pb-2">
            <SplitText text={siteConfig?.hero_title || "Bring Nature Home"} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-primary-foreground/90 font-body mb-12 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            {siteConfig?.hero_subtitle || "Premium trees handpicked for your garden. Order through WhatsApp and we'll deliver beauty to your doorstep."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button variant="hero" size="xl" onClick={() => { playClick(); scrollToCatalog(); }} className="group px-8 py-7 text-lg rounded-full shadow-xl hover:shadow-primary/20 transition-all">
              Browse Collection
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <div onClick={playClick}>
              <WhatsAppButton phone={whatsappNumber} message={`Hi! I'd like to know more about your trees.`} size="xl" variant="whatsapp" label="Order via WhatsApp" className="rounded-full shadow-xl" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-primary-foreground/40 text-[10px] uppercase tracking-[0.3em] font-body">Scroll</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Truck, title: "Free Delivery", desc: "We deliver healthy trees right to your doorstep" },
                { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every tree is inspected and certified healthy" },
                { icon: Leaf, title: "Expert Advice", desc: "Get planting tips and care guides with every order" },
              ].map((f, i) => {
                const feature = features?.[i] || f;
                const Icon = f.icon; // We stick to static icons for now as mapping string to component is complex
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="flex items-start gap-4 p-8 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <motion.div
                      className="rounded-full bg-primary/10 p-3.5 shrink-0 animate-glow-pulse"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{feature.description || feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tree Catalog */}
      <section id="catalog" className="py-24 px-4">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0} className="inline-block text-primary font-body text-sm font-semibold tracking-widest uppercase mb-3">
              Handpicked Premium Trees
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Collection
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tap "Order Now" on any tree to buy directly via WhatsApp.
            </motion.p>
          </AnimatedSection>
          <TreeCatalog whatsappNumber={whatsappNumber} />
        </div>
      </section>

      {/* About / How to Order */}
      <section id="about" className="py-24 bg-card border-t border-border px-4">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-14">
            <motion.span variants={fadeUp} custom={0} className="inline-block text-primary font-body text-sm font-semibold tracking-widest uppercase mb-3">
              Simple Process
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold text-foreground mb-4">
              How to Order
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground text-lg">
              3 easy steps via WhatsApp
            </motion.p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
              {[
                { step: "1", title: "Browse & Choose", desc: "Explore our collection and pick your favourite trees." },
                { step: "2", title: "Message on WhatsApp", desc: "Click the WhatsApp button to send us your order." },
                { step: "3", title: "Pay & Receive", desc: "We'll share payment details. Once confirmed, we deliver!" },
              ].map((s, i) => {
                const step = orderSteps?.[i] || s;
                return (
                  <motion.div
                    key={step.title}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="text-center p-8 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-display font-bold mx-auto mb-5 shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {step.step_number || step.step}
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description || step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-20 bg-foreground text-primary-foreground px-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto relative">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div variants={fadeUp} custom={0}>
                <div className="flex items-center gap-2 mb-4">
                  <TreePine className="h-6 w-6" />
                  <span className="font-display text-xl font-bold">{siteConfig?.site_name || "UrbanRoots Nursery"}</span>
                </div>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  Your trusted nursery for premium, healthy trees delivered with care.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={1}>
                <h4 className="font-display text-lg font-semibold mb-5">Contact Us</h4>
                <div className="space-y-4 text-sm text-primary-foreground/70">
                  {[
                    { icon: Phone, text: whatsappNumber },
                    { icon: MapPin, text: siteConfig?.address || "220, JC Bose Rd, H B Town, Pallysree, Panihati, Khardaha, West Bengal 700110" },
                    { icon: Clock, text: "Mon – Sat: 8AM – 6PM" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      whileHover={{ x: 4, color: "hsl(var(--primary-foreground))" }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp} custom={2}>
                <h4 className="font-display text-lg font-semibold mb-5">Quick Order</h4>
                <p className="text-primary-foreground/70 text-sm mb-5">
                  Ready to order? Reach out on WhatsApp and we'll take care of the rest.
                </p>
                <WhatsAppButton phone={whatsappNumber} message="Hi! I'd like to place an order." size="default" variant="whatsapp" label="Chat with us" />
              </motion.div>
            </div>
          </AnimatedSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-primary-foreground/20 mt-14 pt-8 text-center text-primary-foreground/50 text-sm"
          >
            © 2026 {siteConfig?.site_name || "UrbanRoots Nursery"}. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
