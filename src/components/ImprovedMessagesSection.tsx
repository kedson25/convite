import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export function ImprovedMessagesSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "Ruan",
      message: "Amo te ❤️",
      timestamp: new Date("2025-01-10")
    }
  ]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, digite seu nome e uma mensagem.",
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [newMessage, ...prev]);

    toast({
      title: "Mensagem enviada! 💕",
      description: "Obrigado pela mensagem carinhosa! Os noivos ficarão emocionados!",
    });

    setName("");
    setMessage("");
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    toast({
      title: "Mensagem removida",
      description: "A mensagem foi removida com sucesso.",
    });
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

          {/* Messages display */}
          <div className="space-y-4 mb-8">
            {messages.map((msg) => (
              <Card key={msg.id} className="shadow-soft border-0 bg-white/90">
                <CardContent className="p-6">
                  <div className="bg-gold-light/30 rounded-lg p-4 border-l-4 border-gold-primary">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Heart className="w-5 h-5 text-gold-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-foreground italic leading-relaxed">
                            "{msg.message}"
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            — {msg.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Message form */}
          <Card className="shadow-elegant border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-center text-foreground">
                💌 Escreva seu recadinho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name" className="text-base font-medium">
                      Seu nome
                    </Label>
                    <Input
                      id="sender-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="h-12 text-base"
                      maxLength={50}
                    />
                  </div>
                  
                  <div className="space-y-2 md:row-span-2">
                    <Label htmlFor="message-text" className="text-base font-medium">
                      Sua mensagem de carinho
                    </Label>
                    <textarea
                      id="message-text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escreva aqui uma mensagem especial para Júlia e Ruan..."
                      className="w-full h-24 md:h-32 p-3 text-base border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {message.length}/500
                    </p>
                  </div>
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