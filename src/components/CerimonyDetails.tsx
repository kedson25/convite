import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";

export function CerimonyDetails() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              📍 Detalhes da Cerimônia
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">📅 Data</h3>
                    <p className="text-muted-foreground">Sábado</p>
                    <p className="font-medium text-lg">7 de dezembro de 2025</p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">🕖 Horário</h3>
                    <p className="text-muted-foreground">Início</p>
                    <p className="font-medium text-lg">A partir das 19h</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">📌 Local</h3>
                    <p className="text-muted-foreground">Santo André – SP, Brasil</p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      O endereço completo será enviado após a confirmação da sua presença.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button variant="wedding" size="lg" className="gap-2">
                <CalendarPlus className="w-5 h-5" />
                📆 Adicionar ao calendário
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}