import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";

export interface Tree {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface TreeCardProps {
  tree: Tree;
  whatsappNumber: string;
  index: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TreeCard: React.FC<TreeCardProps> = ({ tree, whatsappNumber, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const playHover = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
    audio.volume = 0.05;
    audio.play().catch(() => { });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index % 3}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000 group relative bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="backface-hidden h-full">
        <Link to={`/tree/${tree.id}`} className="block h-full">
          <div className="aspect-[4/3] overflow-hidden bg-muted relative">
            <motion.img
              src={tree.image.startsWith('http') ? tree.image.replace('http://localhost:8000', '') : tree.image}
              alt={tree.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Shimmer light effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
              }}
            />
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="font-body text-xs backdrop-blur-sm bg-secondary/80 shadow-md">
                {tree.category}
              </Badge>
            </div>
          </div>
          <div className="p-6 relative pb-20">
            <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{tree.name}</h3>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">{tree.description}</p>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto">
                <span className="text-xs text-muted-foreground font-body">Starting at</span>
                <span className="block text-2xl font-display font-bold text-primary">₹{tree.price}</span>
              </div>
              <div className="pointer-events-auto">
                <WhatsAppButton
                  phone={whatsappNumber}
                  message={`Hi! I'd like to order: ${tree.name} (₹${tree.price})`}
                  size="sm"
                  variant="whatsapp"
                  label="Order Now"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking WhatsApp
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default TreeCard;
