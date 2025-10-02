import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MessagesSection() {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: "Escreva uma mensagem",
        description: "Por favor, digite uma mensagem carinhosa para os noivos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada! 💕",
      description: "Obrigado pela mensagem carinhosa! Os noivos ficarão emocionados!",
    });

    setMessage("");
  };

  return (
    <section className="py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              💬 Recadinhos
            </h2>
            <p className="text-lg text-muted-foreground">
              Como é bom receber palavras de carinho de pessoas queridas!
              <br />
              Deixe aqui sua mensagem especial para os noivos:
            </p>
          </div>

          {/* Example message */}
          <Card className="mb-8 shadow-soft border-0 bg-white/90">
            <CardContent className="p-6">
              <div className="bg-soft-rose/30 rounded-lg p-4 border-l-4 border-rose-gold">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-rose-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground italic">
                      "Amo te ❤️"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      — Ruan
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message form */}
          <Card className="shadow-elegant border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-center text-foreground">
                💌 Escreva seu recadinho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium">
                    Sua mensagem de carinho
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva aqui uma mensagem especial para Júlia e Ruan..."
                    className="min-h-[100px] text-base resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/500
                  </p>
                </div>

                <Button type="submit" variant="wedding" size="lg" className="w-full gap-2">
                  <MessageCircle className="w-5 h-5" />
                  📝 Enviar recadinho
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}