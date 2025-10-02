import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send } from "lucide-react";

interface MobileMessagesProps {
  guestData: any;
  setGuestData: any;
  onNext?: () => void;
  onSave?: () => void;
}

export function MobileMessages({ guestData, setGuestData }: MobileMessagesProps) {
  const handleInputChange = (field: string, value: string) => {
    setGuestData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="max-w-md mx-auto shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <MessageCircle className="w-6 h-6 text-gold-primary" />
            Recados para os Noivos
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Deixe uma mensagem especial para este momento único!
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-medium">
                Sua mensagem
              </Label>
              <Textarea
                id="message"
                value={guestData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Escreva uma mensagem carinhosa para os noivos..."
                className="min-h-[120px] text-base resize-none border-gold-light focus:border-gold-primary"
              />
              <p className="text-xs text-muted-foreground">
                Compartilhe seus votos de felicidade e carinho para os noivos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}