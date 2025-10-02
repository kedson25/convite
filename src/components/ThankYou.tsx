import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export function ThankYou() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                🙏 Agradecimento
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Obrigado por visitar nosso convite e fazer parte da nossa história.
                <br />
                Esperamos ansiosamente para compartilhar esse momento com você!
              </p>

              <div className="bg-gradient-soft rounded-lg p-6 my-8">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-rose-gold mt-1 flex-shrink-0" />
                  <blockquote className="text-foreground italic text-lg leading-relaxed">
                    "Se alguém quiser construir algo duradouro, que coloque Deus como fundamento."
                    <footer className="text-muted-foreground mt-2 not-italic text-sm">
                      — 1 Coríntios 3:11
                    </footer>
                  </blockquote>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 text-4xl">
                <span>💕</span>
                <span className="text-2xl text-muted-foreground">Júlia & Ruan</span>
                <span>💕</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}