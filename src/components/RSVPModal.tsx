import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Users, Calendar, Gift, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const giftOptions = [
  { id: "jogo-copos", name: "Jogo de copos", category: "Cozinha" },
  { id: "liquidificador", name: "Liquidificador", category: "Cozinha" },
  { id: "pano-prato", name: "Pano de prato", category: "Cozinha" },
  { id: "airfryer", name: "Airfryer", category: "Cozinha" },
  { id: "jogo-panelas", name: "Jogo de panelas", category: "Cozinha" },
  { id: "jogo-cama", name: "Jogo de cama", category: "Quarto" },
  { id: "edredom", name: "Edredom", category: "Quarto" },
  { id: "cabides", name: "Cabides", category: "Quarto" },
  { id: "panos-chao", name: "Panos de chão", category: "Extras" },
  { id: "toalhas", name: "Toalhas de corpo e rosto", category: "Extras" },
];

export function RSVPModal() {
  const [name, setName] = useState("");
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnsure, setIsUnsure] = useState(false);
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

    const confirmationMessage = isUnsure 
      ? "Agradecemos por avisar! Fique à vontade para decidir depois. 💕"
      : "Presença confirmada! 🎉 Obrigado por confirmar! Esperamos você no nosso grande dia!";

    toast({
      title: confirmationMessage.split("!")[0] + "!",
      description: confirmationMessage.split("! ")[1] || "",
    });

    setName("");
    setSelectedGifts([]);
    setIsUnsure(false);
    setIsOpen(false);
  };

  const handleGiftToggle = (giftId: string) => {
    setSelectedGifts(prev => 
      prev.includes(giftId) 
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    );
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="wedding" size="xl" className="flex-1 gap-2">
                    <Send className="w-5 h-5" />
                    📤 Confirmar presença
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="rsvp-dialog-description">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Confirmação de Presença 💕
                    </DialogTitle>
                  </DialogHeader>
                  <div id="rsvp-dialog-description" className="sr-only">
                    Formulário para confirmar presença no casamento de Júlia e Ruan
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="modal-name" className="text-base font-medium">
                        📝 Nome
                      </Label>
                      <Input
                        id="modal-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="h-12 text-base"
                      />
                    </div>


                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        🎁 Presentes que pretende dar (opcional)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4">
                        {giftOptions.map((gift) => (
                          <div key={gift.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={gift.id}
                              checked={selectedGifts.includes(gift.id)}
                              onCheckedChange={() => handleGiftToggle(gift.id)}
                            />
                            <Label 
                              htmlFor={gift.id} 
                              className="text-sm cursor-pointer"
                            >
                              {gift.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button type="submit" variant="wedding" size="lg" className="w-full gap-2">
                        <Send className="w-5 h-5" />
                        Confirmar Presença
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="soft" 
                        size="lg" 
                        className="w-full gap-2"
                        onClick={() => setIsUnsure(!isUnsure)}
                      >
                        <HelpCircle className="w-5 h-5" />
                        {isUnsure ? "Cancelar 'Não tenho certeza'" : "Não tenho certeza ainda"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

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