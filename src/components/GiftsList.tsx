import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ExternalLink } from "lucide-react";

const giftCategories = [
  {
    title: "🍽️ Cozinha",
    items: ["Jogo de copos", "Liquidificador", "Pano de prato", "Airfryer", "Jogo de panelas", "(e outros)"]
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

export function GiftsList() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🎁 Lista de Presentes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {giftCategories.map((category, index) => (
              <Card key={index} className="shadow-soft border-0 bg-white/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-center text-foreground">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-xs mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              📎 Ou escolha um presente especial para nós
            </p>
            <Button variant="wedding" size="lg" className="gap-2">
              <Gift className="w-5 h-5" />
              Quero presentear
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}