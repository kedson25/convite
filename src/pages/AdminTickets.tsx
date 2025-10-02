import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Users, MessageCircle, Gift, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Guest {
  id: string;
  name: string;
  whatsapp: string;
  gift: string;
  message: string;
  guestCount: number;
  additionalGuests: Array<{
    name: string;
    whatsapp: string;
  }>;
  timestamp: any;
}

const AdminTickets = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryText, setQueryText] = useState("");
  const [totalGuests, setTotalGuests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const q = query(collection(db, 'casamento'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const guestsData: Guest[] = [];
        let total = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const guest = {
            id: doc.id,
            ...data
          } as Guest;
          
          guestsData.push(guest);
          total += guest.guestCount || 1;
        });
        
        setGuests(guestsData);
        setTotalGuests(total);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar convidados:', error);
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
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
            <p className="text-lg font-medium text-foreground">Carregando confirmações...</p>
            <p className="text-sm text-muted-foreground">Buscando dados dos convidados</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header (intentionally simplified) */}
        <div className="mb-8" />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto text-gold-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{guests.length}</p>
              <p className="text-sm text-muted-foreground">Confirmações</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto text-gold-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{totalGuests}</p>
              <p className="text-sm text-muted-foreground">Total de Convidados</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 mx-auto text-gold-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {guests.filter(g => g.message?.trim()).length}
              </p>
              <p className="text-sm text-muted-foreground">Recados Enviados</p>
            </CardContent>
          </Card>
        </div>

        {/* Guest List */}
        <div>
          <div className="flex items-center justify-between mb-4 gap-4">
            <Input
              placeholder="Buscar por nome ou WhatsApp..."
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="max-w-md"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  // export CSV
                  const filtered = guests.filter((g) => {
                    const q = queryText.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      (g.name || "").toLowerCase().includes(q) ||
                      (g.whatsapp || "").toLowerCase().includes(q)
                    );
                  });

                  const headers = ["Nome", "WhatsApp", "Convidados", "Presentes", "Mensagem", "Confirmado em"];
                  const rows = filtered.map((g) => [
                    g.name || "",
                    g.whatsapp || "",
                    g.guestCount || 1,
                    g.gift || "",
                    (g.message || "").replace(/\n/g, " "),
                    g.timestamp?.toDate?.()?.toLocaleString('pt-BR') || ""
                  ]);

                  const csvContent = [headers, ...rows].map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\n");
                  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'convidados.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="w-4 h-4 mr-2" /> Exportar CSV
              </Button>
            </div>
          </div>

          {guests.length === 0 ? (
            <Card className="bg-white/80 border-0 shadow-soft">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma confirmação ainda</h3>
                <p className="text-muted-foreground">Aguardando as primeiras confirmações de presença!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto bg-white/90 border-0 shadow-elegant rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">WhatsApp</th>
                    <th className="px-4 py-3">Convidados</th>
                    <th className="px-4 py-3">Presente</th>
                    <th className="px-4 py-3">Mensagem</th>
                    <th className="px-4 py-3">Confirmado em</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {guests
                    .filter((g) => {
                      const q = queryText.trim().toLowerCase();
                      if (!q) return true;
                      return (
                        (g.name || "").toLowerCase().includes(q) ||
                        (g.whatsapp || "").toLowerCase().includes(q)
                      );
                    })
                    .map((guest, index) => (
                      <tr key={guest.id} className="border-t">
                        <td className="px-4 py-3 align-top">{index + 1}</td>
                        <td className="px-4 py-3 align-top font-semibold">{guest.name}</td>
                        <td className="px-4 py-3 align-top">{guest.whatsapp}</td>
                        <td className="px-4 py-3 align-top">{guest.guestCount || 1}</td>
                        <td className="px-4 py-3 align-top">{guest.gift || '-'}</td>
                        <td className="px-4 py-3 align-top">{guest.message ? (guest.message.length > 80 ? guest.message.slice(0, 80) + '...' : guest.message) : '-'}</td>
                        <td className="px-4 py-3 align-top">{guest.timestamp?.toDate?.()?.toLocaleDateString('pt-BR') || '-'}</td>
                        <td className="px-4 py-3 align-top">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Eye className="w-4 h-4" /> Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <span className="text-gold-primary">#{index + 1}</span>
                                  {guest.name}
                                </DialogTitle>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-foreground">Informações de Contato</h4>
                                  <div className="bg-muted/50 rounded-lg p-3">
                                    <p className="text-sm"><strong>Nome:</strong> {guest.name}</p>
                                    <p className="text-sm"><strong>WhatsApp:</strong> {guest.whatsapp}</p>
                                    <p className="text-sm"><strong>Confirmado em:</strong> {guest.timestamp?.toDate?.()?.toLocaleString('pt-BR') || 'Data não disponível'}</p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Número de Convidados
                                  </h4>
                                  <div className="bg-muted/50 rounded-lg p-3">
                                    <p className="text-lg font-semibold text-gold-primary">{guest.guestCount || 1} pessoa{(guest.guestCount || 1) > 1 ? 's' : ''}</p>
                                  </div>
                                </div>

                                {guest.additionalGuests && guest.additionalGuests.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                                      <Users className="w-4 h-4" />
                                      Acompanhantes ({guest.additionalGuests.length})
                                    </h4>
                                    <div className="space-y-2">
                                      {guest.additionalGuests.map((additionalGuest, idx) => (
                                        <div key={idx} className="bg-muted/50 rounded-lg p-3">
                                          <p className="font-medium text-foreground">{additionalGuest.name}</p>
                                          <p className="text-sm text-muted-foreground">📱 {additionalGuest.whatsapp}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <Separator />

                                {guest.gift && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                                      <Gift className="w-4 h-4" />
                                      Presente Escolhido
                                    </h4>
                                    <div className="bg-muted/50 rounded-lg p-3">
                                      <p className="text-foreground">{guest.gift}</p>
                                    </div>
                                  </div>
                                )}

                                {guest.message && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                                      <MessageCircle className="w-4 h-4" />
                                      Recado dos Noivos
                                    </h4>
                                    <div className="bg-muted/50 rounded-lg p-3">
                                      <p className="text-foreground italic">"{guest.message}"</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;