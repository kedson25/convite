import noivoImg from "@/assets/noivo.png";
import noivaImg from "@/assets/noiva.png";

export function HeroCouples() {
  return (
    <div className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      <div className="w-full px-6 py-12 relative z-10">
        <div className="text-center space-y-12">
          {/* Photos */}
          <div className="relative flex justify-center items-center mb-12">
            <div className="relative w-72 h-56 md:w-80 md:h-64">
              {/* Noiva - Left */}
              <div className="absolute left-4 top-0 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-elegant border-4 border-white/80 z-20">
                <img 
                  src={noivaImg} 
                  alt="Júlia" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Noivo - Right, overlapping */}
              <div className="absolute right-4 top-8 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-elegant border-4 border-white/80 z-10">
                <img 
                  src={noivoImg} 
                  alt="Ruan" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Names & Date */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-foreground drop-shadow-sm">
                💍 Júlia & Ruan
              </h1>
              <p className="text-3xl md:text-4xl text-muted-foreground font-light">
                17 de Dezembro de 2025
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                Vamos nos casar!
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed px-4">
                Criamos este convite com todo carinho para lhe convidar a celebrar conosco esse momento tão especial.
                O grande dia está chegando — e você faz parte dele!
              </p>
              <div className="mt-8 px-4">
                <p className="text-lg text-foreground font-semibold mb-2">
                  📌 Por favor, confirme sua presença até <strong>17 de novembro de 2025</strong>.
                </p>
                <p className="text-base text-muted-foreground">
                  Sua confirmação é essencial para organizarmos tudo com muito amor e cuidado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
    </div>
  );
}