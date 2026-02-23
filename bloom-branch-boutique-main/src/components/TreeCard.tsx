import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MEDIA_BASE_URL } from "@/api/nursery";

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
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TreeCard: React.FC<TreeCardProps> = ({ tree, whatsappNumber, index }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index % 3}
      whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <motion.img
          src={tree.image.startsWith('http') ? tree.image : `${MEDIA_BASE_URL}${tree.image}`}
          alt={tree.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="font-body text-xs backdrop-blur-sm bg-secondary/80 shadow-md">
            {tree.category}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1">{tree.name}</h3>
        <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{tree.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-body">Starting at</span>
            <span className="block text-2xl font-display font-bold text-primary">₹{tree.price}</span>
          </div>
          <WhatsAppButton
            phone={whatsappNumber}
            message={`Hi! I'd like to order: ${tree.name} (₹${tree.price})`}
            size="sm"
            variant="whatsapp"
            label="Order Now"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TreeCard;
