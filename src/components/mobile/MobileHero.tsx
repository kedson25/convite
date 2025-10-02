import noivoImg from "@/assets/noivo.png";
import noivaImg from "@/assets/noiva.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MobileHeroProps {
  guestData?: any;
  setGuestData?: any;
  onNext?: () => void;
  onSave?: () => void;
}

export function MobileHero({ onNext }: MobileHeroProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8">
      {/* Fotos dos noivos */}
      <div className="relative flex justify-center mb-8">
        <div className="relative w-64 h-48">
          {/* Noiva */}
          <div className="absolute left-4 top-0 w-32 h-32 rounded-full overflow-hidden shadow-elegant border-4 border-white z-20">
            <img 
              src={noivaImg} 
              alt="Júlia" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Noivo */}
          <div className="absolute right-4 top-8 w-32 h-32 rounded-full overflow-hidden shadow-elegant border-4 border-white z-10">
            <img 
              src={noivoImg} 
              alt="Ruan" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Título principal */}
      <div className="text-center space-y-6 mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            💍 Júlia & Ruan
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            17 de Dezembro de 2025
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          Vamos nos casar!
        </h2>
      </div>

      {/* Mensagem principal */}
      <Card className="mx-4 mb-8 shadow-elegant border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-foreground leading-relaxed">
            Criamos este convite com todo carinho para lhe convidar a celebrar conosco esse momento tão especial.
            O grande dia está chegando — e você faz parte dele!
          </p>
          
          <div className="bg-gold-light/50 rounded-lg p-4">
            <p className="text-foreground font-medium text-sm">
              📌 <strong>Confirme sua presença até 17 de novembro de 2025</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Sua confirmação é essencial para organizarmos tudo com muito amor e cuidado.
            </p>
          </div>
        </CardContent>
      </Card>


      {/* Decoração */}
      <div className="absolute top-20 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
}