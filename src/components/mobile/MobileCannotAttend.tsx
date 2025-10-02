import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home } from "lucide-react";

export function MobileCannotAttend() {
  const handleGoHome = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-hero">
      <Card className="max-w-md mx-auto shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Heart className="w-16 h-16 mx-auto text-gold-primary mb-6 opacity-70" />
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Obrigado por abrir nosso convite! 💕
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Entendemos que nem sempre é possível estar presente, mas saiba que você 
            está em nossos corações neste momento tão especial.
          </p>
          
          <div className="bg-gold-light/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-gold-primary font-medium">
              Sua amizade e carinho já são presentes para nós! ✨
            </p>
          </div>
          
          <Button 
            variant="wedding" 
            size="lg" 
            className="w-full gap-2"
            onClick={handleGoHome}
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}