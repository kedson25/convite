import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";

interface MobileDetailsProps {
  guestData?: any;
  setGuestData?: any;
  onNext?: () => void;
  onSave?: () => void;
}

export function MobileDetails({ onNext }: MobileDetailsProps) {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Detalhes da Cerimônia
          </h2>
          <p className="text-muted-foreground">
            Todas as informações importantes do nosso grande dia
          </p>
        </div>

        {/* Informações do Evento */}
        <Card className="shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-foreground">
              📅 Informações do Evento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">7 de dezembro de 2025</p>
                <p className="text-sm text-muted-foreground">quarta-feira.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">14:30</p>
                <p className="text-sm text-muted-foreground">Cerimônia e recepção</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Santo André, SP</p>
                <p className="text-sm text-muted-foreground">
                  O endereço completo será enviado após confirmação
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Código de Vestimenta */}
        <Card className="shadow-elegant border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-foreground flex items-center justify-center gap-2">
              👔 Código de Vestimenta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Esporte fino
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Vista-se com elegância para nossa celebração
              </p>
            </div>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-destructive">⚠️</span>
                <h4 className="font-semibold text-destructive">Importante:</h4>
              </div>
              <p className="text-destructive text-sm">
                <strong>É proibido usar azul royal</strong>, pois será a cor exclusiva dos padrinhos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informação adicional */}
        <Card className="shadow-elegant border-0 bg-gold-light/30">
          <CardContent className="p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              💕 Esperamos você para celebrar esse momento único!
            </p>
            <p className="text-sm text-muted-foreground">
              Confirme sua presença na próxima etapa
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}