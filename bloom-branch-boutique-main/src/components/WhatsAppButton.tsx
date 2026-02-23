import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phone: string;
  message: string;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  variant?: "whatsapp" | "default";
  label?: string;
  className?: string;
}

const WhatsAppButton = ({
  phone,
  message,
  size = "default",
  variant = "whatsapp",
  label = "WhatsApp",
  className = "",
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
};

export default WhatsAppButton;
