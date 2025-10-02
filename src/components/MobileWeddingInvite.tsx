import { useEffect, useState } from "react";
import { MobileHero } from "@/components/mobile/MobileHero";
import { MobileDetails } from "@/components/mobile/MobileDetails"; 
import { MobileConfirmation } from "@/components/mobile/MobileConfirmation";
import { MobileCannotAttend } from "@/components/mobile/MobileCannotAttend";
import { MobileRSVP } from "@/components/mobile/MobileRSVP";
import { MobileGifts } from "@/components/mobile/MobileGifts";
import { MobileMessages } from "@/components/mobile/MobileMessages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

interface GuestData {
  name: string;
  whatsapp: string;
  gift: string;
  message: string;
  guestCount: number;
  additionalGuests: Array<{
    name: string;
    whatsapp: string;
  }>;
}

const MobileWeddingInvite = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCannotAttend, setShowCannotAttend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestData, setGuestData] = useState<GuestData>({
    name: "",
    whatsapp: "",
    gift: "",
    message: "",
    guestCount: 1,
    additionalGuests: []
  });
  const { toast } = useToast();

  useEffect(() => {
    // Garante que o scroll aconteça após a renderização
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [currentStep]);

  const steps = [
    { component: MobileHero, title: "Convite" },
    { component: MobileDetails, title: "Detalhes" },
    { component: MobileConfirmation, title: "Confirmar Presença?" },
    { component: MobileRSVP, title: "Dados Pessoais" },
    { component: MobileGifts, title: "Presentes" },
    { component: MobileMessages, title: "Recados" },
    { component: ThankYouStep, title: "Obrigado" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  };

  const saveToFirebase = async () => {
    try {
      setIsLoading(true);
      await addDoc(collection(db, 'casamento'), {
        ...guestData,
        timestamp: new Date()
      });
      
      toast({
        title: "Dados salvos com sucesso! 🎉",
        description: "Obrigado por confirmar sua presença!",
      });
      
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    }
  };

  // Renderizar tela "Não posso ir"
  if (showCannotAttend) {
    return <MobileCannotAttend />;
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-hero w-full">
      {/* Progress bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gold-light">
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-gradient-primary h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            {steps[currentStep].title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentStep + 1} de {steps.length}
          </p>
        </div>
      </div>

      {/* Conteúdo do passo atual */}
      <div className={`${currentStep === 2 ? 'min-h-[calc(100vh-140px)] flex items-center justify-center px-4' : 'pb-20'}`}>
        {isLoading ? (
          <LoadingAnimation />
        ) : currentStep === 2 ? (
          <MobileConfirmation 
            guestData={guestData}
            setGuestData={setGuestData}
            onNext={nextStep}
            onSave={saveToFirebase}
            onCannotAttend={() => setShowCannotAttend(true)}
          />
        ) : (
          <CurrentStepComponent 
            guestData={guestData}
            setGuestData={setGuestData}
            onNext={nextStep}
            onSave={saveToFirebase}
          />
        )}
      </div>

      {/* Botões de navegação */}
      {currentStep < steps.length - 1 && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gold-light p-4">
          <div className="flex gap-3 max-w-md mx-auto">
            {currentStep > 0 && currentStep !== 2 && (
              <Button
                variant="soft"
                onClick={prevStep}
                className="flex-1 gap-2"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
            )}

            {currentStep === 2 && (
              <Button
                variant="wedding"
                onClick={nextStep}
                className="w-full gap-2"
                disabled={isLoading}
              >
                <Heart className="w-4 h-4" />
                Confirmar Presença
              </Button>
            )}

            {(currentStep === 0 || currentStep === 1 || currentStep === 3 || currentStep === 4) && (
              <Button
                variant="wedding"
                onClick={nextStep}
                className="flex-1 gap-2"
                disabled={isLoading || (currentStep === 3 && (!guestData.name || 
                  (guestData.additionalGuests && guestData.additionalGuests.some((guest: any) => !guest.name))))}
              >
                Próxima
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            
            {currentStep === 5 && (
              <Button
                variant="wedding"
                onClick={saveToFirebase}
                className="flex-1 gap-2"
                disabled={isLoading}
              >
                Finalizar
                <Heart className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de loading animado
const LoadingAnimation = () => (
  <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
    <div className="text-center space-y-6 animate-fade-in">
      <div className="relative w-20 h-20 mx-auto">
        {/* Círculo externo */}
        <div className="absolute inset-0 rounded-full border-4 border-gold-light/30"></div>
        {/* Círculo girando */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold-primary animate-spin"></div>
        {/* Círculo interno pulsando */}
        <div className="absolute inset-3 rounded-full bg-gold-primary/20 animate-pulse"></div>
        {/* Coração no centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="w-6 h-6 text-gold-primary animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium text-foreground">Carregando...</p>
        <p className="text-sm text-muted-foreground">Preparando a próxima etapa</p>
      </div>
    </div>
  </div>
);

// Componente de agradecimento final
const ThankYouStep = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="max-w-md mx-auto shadow-elegant border-0 bg-white/95">
      <CardContent className="p-8 text-center">
        <Heart className="w-16 h-16 mx-auto text-gold-primary mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Muito Obrigado! 💕
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Sua confirmação de presença foi recebida com muito carinho! 
          Estamos ansiosos para compartilhar esse momento especial com você.
        </p>
        <div className="mt-6 p-4 bg-gold-light/30 rounded-lg">
          <p className="text-sm text-gold-primary font-medium">
            Nos vemos em 17 de dezembro! ✨
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MobileWeddingInvite;