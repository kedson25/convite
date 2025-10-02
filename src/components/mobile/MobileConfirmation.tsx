import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";

interface MobileConfirmationProps {
  guestData?: any;
  setGuestData?: any;
  onNext?: () => void;
  onSave?: () => void;
  onCannotAttend?: () => void;
}

export function MobileConfirmation({ onNext, onCannotAttend }: MobileConfirmationProps) {
  const handleNo = () => {
    if (onCannotAttend) {
      onCannotAttend();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="max-w-md mx-auto shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Heart className="w-16 h-16 mx-auto text-gold-primary mb-6" />
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Confirmar Presença?
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            Gostaríamos muito de contar com a sua presença em nosso casamento.
            Você gostaria de confirmar sua presença?
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="wedding" 
              size="lg" 
              className="w-full gap-2"
              onClick={onNext}
            >
              <Heart className="w-5 h-5" />
              Sim, quero confirmar!
            </Button>
            
            <Button 
              variant="soft" 
              size="lg" 
              className="w-full gap-2"
              onClick={handleNo}
            >
              <X className="w-5 h-5" />
              Não posso ir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}