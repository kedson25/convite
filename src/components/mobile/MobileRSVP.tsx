import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, UserPlus, X, Users } from "lucide-react";

interface MobileRSVPProps {
  guestData: any;
  setGuestData: any;
  onNext?: () => void;
  onSave?: () => void;
}

export function MobileRSVP({ guestData, setGuestData }: MobileRSVPProps) {
  const handleInputChange = (field: string, value: string) => {
    setGuestData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };


  const handleAdditionalGuestChange = (index: number, field: string, value: string) => {
    setGuestData((prev: any) => ({
      ...prev,
      additionalGuests: prev.additionalGuests.map((guest: any, i: number) => 
        i === index ? { ...guest, [field]: value } : guest
      )
    }));
  };

  const handleGuestCountChange = (value: string) => {
    const count = parseInt(value);
    const currentAdditionalGuests = guestData.additionalGuests || [];
    const newAdditionalCount = count - 1; // -1 porque o usuário principal já conta
    
    let newAdditionalGuests = [...currentAdditionalGuests];
    
    // Se aumentar, adiciona novos convidados vazios
    if (newAdditionalCount > currentAdditionalGuests.length) {
      const diff = newAdditionalCount - currentAdditionalGuests.length;
      for (let i = 0; i < diff; i++) {
        newAdditionalGuests.push({ name: "", whatsapp: "" });
      }
    }
    // Se diminuir, remove os últimos convidados
    else if (newAdditionalCount < currentAdditionalGuests.length) {
      newAdditionalGuests = newAdditionalGuests.slice(0, newAdditionalCount);
    }
    
    setGuestData((prev: any) => ({
      ...prev,
      guestCount: count,
      additionalGuests: newAdditionalGuests
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="max-w-md mx-auto shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-foreground">
            📝 Dados Pessoais
          </CardTitle>
          <p className="text-muted-foreground">
            Preencha seus dados para confirmar sua presença
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Seus Dados Pessoais */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Nome Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={guestData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 border-gold-light focus:border-gold-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-foreground font-medium">
                WhatsApp (opcional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={guestData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className="pl-10 border-gold-light focus:border-gold-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount" className="text-foreground font-medium">
                Quantos acompanhantes vai levar?
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Select
                  value={guestData.guestCount?.toString() || "1"}
                  onValueChange={handleGuestCountChange}
                >
                  <SelectTrigger className="pl-10 border-gold-light focus:border-gold-primary">
                    <SelectValue placeholder="Selecione a quantidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Nenhum</SelectItem>
                    <SelectItem value="2">1 acompanhante</SelectItem>
                    <SelectItem value="3">2 acompanhantes</SelectItem>
                    <SelectItem value="4">3 acompanhantes</SelectItem>
                    <SelectItem value="5">4 acompanhantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Lista de Convidados Adicionais */}
          {guestData.additionalGuests && guestData.additionalGuests.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-gold-primary" />
                <h3 className="text-lg font-semibold text-foreground">Dados dos Acompanhantes</h3>
              </div>
              
              {guestData.additionalGuests.map((guest: any, index: number) => (
                <div key={index} className="space-y-3 p-4 bg-gold-light/10 rounded-lg border border-gold-light/30 relative">
                  <h4 className="font-medium text-foreground">Acompanhante {index + 1}</h4>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Nome Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Digite o nome completo"
                        value={guest.name || ""}
                        onChange={(e) => handleAdditionalGuestChange(index, 'name', e.target.value)}
                        className="pl-10 border-gold-light focus:border-gold-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      WhatsApp (opcional)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={guest.whatsapp || ""}
                        onChange={(e) => handleAdditionalGuestChange(index, 'whatsapp', e.target.value)}
                        className="pl-10 border-gold-light focus:border-gold-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}