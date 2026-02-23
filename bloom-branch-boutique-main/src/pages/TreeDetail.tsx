import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTrees, fetchSiteConfig } from "@/api/nursery";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageCircle, ShieldCheck, Truck, Leaf } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";

const TreeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: trees, isLoading: treesLoading } = useQuery({
        queryKey: ["trees"],
        queryFn: fetchTrees
    });

    const { data: siteConfig } = useQuery({
        queryKey: ["siteConfig"],
        queryFn: fetchSiteConfig
    });

    const tree = trees?.find((t: any) => t.id.toString() === id);
    const whatsappNumber = siteConfig?.whatsapp_number || "+916291381840";

    if (treesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary font-display text-xl">Nurturing tree details...</div>
            </div>
        );
    }

    if (!tree) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Tree not found</h1>
                <Button onClick={() => navigate("/")}>Back to Catalog</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/")}
                        className="group font-body"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Collection
                    </Button>
                    <div className="font-display font-bold text-lg hidden md:block">Tree Details</div>
                    <div className="w-24" /> {/* Spacer */}
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border/50">
                            <img
                                src={tree.image.startsWith('http') ? tree.image.replace('http://localhost:8000', '') : tree.image}
                                alt={tree.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="absolute top-6 right-6">
                            <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold rounded-full shadow-lg">
                                {tree.category}
                            </Badge>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground leading-[1.1]">
                            {tree.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                                ₹{tree.price}
                            </div>
                            <Badge variant="outline" className="text-muted-foreground border-primary/20 bg-primary/5">
                                In Stock & Ready
                            </Badge>
                        </div>

                        <div className="prose prose-stone max-w-none mb-10">
                            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                                {tree.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
                                <Truck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Fast Secure Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Verified Healthy Tree</span>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4">
                            <WhatsAppButton
                                phone={whatsappNumber}
                                message={`Hi! I'm interested in the ${tree.name} (₹${tree.price}). Is it available?`}
                                size="xl"
                                variant="whatsapp"
                                label="Order via WhatsApp"
                                className="w-full rounded-2xl shadow-xl hover:shadow-primary/20 transition-all font-bold text-lg h-16"
                            />
                            <p className="text-center text-sm text-muted-foreground font-body">
                                Average response time: <span className="text-foreground font-medium">Under 30 mins</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Decorative background */}
            <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
    );
};

export default TreeDetail;
