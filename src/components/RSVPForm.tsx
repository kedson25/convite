import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RSVPForm() {
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha seu nome.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Presença confirmada! 🎉",
      description: "Obrigado por confirmar! Esperamos você no nosso grande dia!",
    });

    setName("");
  };

  return (
    <section className="py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-elegant border-0 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
              ✉️ Confirmação de Presença
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Sua presença tornará esse momento ainda mais especial.
              <br />
              Por favor, confirme o quanto antes!
            </p>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  📝 Nome
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="h-12 text-base"
                />
              </div>


              <Button type="submit" variant="wedding" size="xl" className="w-full gap-2">
                <Send className="w-5 h-5" />
                📤 Confirmar presença
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  🗓️ Confirmações até 17/11/2025
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  👥 2 pessoas já confirmaram
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}