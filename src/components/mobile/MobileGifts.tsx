import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Check } from "lucide-react";
import { useState } from "react";

const giftCategories = [
  {
    title: "🍽️ Cozinha",
    items: ["Jogo de copos", "Liquidificador", "Pano de prato", "Airfryer", "Jogo de panelas"]
  },
  {
    title: "🛏️ Quarto", 
    items: ["Jogo de cama", "Edredom", "Cabides"]
  },
  {
    title: "🧺 Extras",
    items: ["Panos de chão", "Toalhas de corpo e rosto"]
  }
];

interface MobileGiftsProps {
  guestData: any;
  setGuestData: any;
  onNext?: () => void;
  onSave?: () => void;
}

export function MobileGifts({ guestData, setGuestData, onNext }: MobileGiftsProps) {
  const [selectedGift, setSelectedGift] = useState(guestData.gift || "");
  const [customGift, setCustomGift] = useState("");

  const handleGiftSelect = (gift: string) => {
    setSelectedGift(gift);
    setCustomGift("");
    setGuestData({ ...guestData, gift });
  };

  const handleCustomGiftChange = (value: string) => {
    setCustomGift(value);
    setSelectedGift("");
    setGuestData({ ...guestData, gift: value });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            🎁 O que pretende nos dar de presente?
            <span className="text-base font-normal text-muted-foreground"> (não é obrigatório)</span>
          </h2>

          <p className="text-muted-foreground text-sm">
            Selecione da lista ou escreva o que deseja dar
          </p>
        </div>

        {/* Campo personalizado */}
        <Card className="mb-6 shadow-soft border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <Label htmlFor="custom-gift" className="text-foreground font-medium mb-2 block">
              💝 Escreva seu presente personalizado
            </Label>
            <Input
              id="custom-gift"
              value={customGift}
              onChange={(e) => handleCustomGiftChange(e.target.value)}
              placeholder="Ex: Conjunto de taças de cristal..."
              className="bg-white border-gold-light/30 focus:border-gold-primary"
            />
          </CardContent>
        </Card>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-6">
          <hr className="flex-1 border-gold-light/30" />
          <span className="text-muted-foreground text-sm">ou escolha da lista</span>
          <hr className="flex-1 border-gold-light/30" />
        </div>

        {/* Lista de presentes */}
        <div className="space-y-4 mb-6">
          {giftCategories.map((category, index) => (
            <Card key={index} className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleGiftSelect(item)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedGift === item
                          ? "bg-gold-primary text-white shadow-md"
                          : "hover:bg-gold-light/20 text-foreground"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedGift === item ? "border-white bg-white" : "border-gold-light"
                        }`}
                      >
                        {selectedGift === item && (
                          <Check className="w-3 h-3 text-gold-primary" />
                        )}
                      </div>

                      <span className="flex-1 text-left">{item}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Presente selecionado */}
        {(selectedGift || customGift) && (
          <Card className="shadow-elegant border-0 bg-gradient-primary text-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6" />
                <div className="flex-1 text-left">
                  <p className="text-white/90 text-sm">Presente escolhido:</p>
                  <p className="font-semibold">{selectedGift || customGift}</p>
                </div>
                <Check className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}