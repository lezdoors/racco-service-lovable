import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CalendarCheck, Clock, FileText, ListChecks, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Tableau de bord</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Clock className="mr-1 h-4 w-4" />
            Cette semaine
          </Button>
          <Button className="bg-enedis-blue hover:bg-blue-700 text-white w-full sm:w-auto" size="sm">
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes totales</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 nouvelles demandes aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visites programmées</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes traitées</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">85% de toutes les demandes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7 lg:col-span-4">
          <CardHeader>
            <CardTitle>Demandes par type de projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col justify-center items-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 mb-2 mx-auto text-enedis-gray-300" />
                <p className="text-sm text-muted-foreground">
                  Statistiques des demandes par type de projet
                </p>
                <Button variant="outline" className="mt-4">
                  Voir les statistiques détaillées
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-7 lg:col-span-3">
          <CardHeader>
            <CardTitle>Charge de travail des techniciens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-enedis-blue mr-2 flex items-center justify-center text-xs text-white">
                      JM
                    </div>
                    <span>Jean Martin</span>
                  </div>
                  <span className="text-muted-foreground">8 demandes</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-enedis-green mr-2 flex items-center justify-center text-xs text-white">
                      SD
                    </div>
                    <span>Sophie Dubois</span>
                  </div>
                  <span className="text-muted-foreground">6 demandes</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-yellow-500 mr-2 flex items-center justify-center text-xs text-white">
                      PL
                    </div>
                    <span>Pierre Lefèvre</span>
                  </div>
                  <span className="text-muted-foreground">5 demandes</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-500 mr-2 flex items-center justify-center text-xs text-white">
                      CM
                    </div>
                    <span>Claire Moreau</span>
                  </div>
                  <span className="text-muted-foreground">4 demandes</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Demandes récentes</CardTitle>
            <Button variant="outline" size="sm">
              Voir toutes
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-enedis-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium">Référence</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Client</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      ref: "REC-2023-4526",
                      client: "Martin Dupont",
                      type: "Nouvelle construction",
                      date: "22/04/2025",
                      status: "Nouveau",
                      statusColor: "bg-blue-100 text-blue-800",
                    },
                    {
                      ref: "REC-2023-4525",
                      client: "Société ABC",
                      type: "Augmentation de puissance",
                      date: "21/04/2025",
                      status: "En traitement",
                      statusColor: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      ref: "REC-2023-4522",
                      client: "Marie Lambert",
                      type: "Rénovation",
                      date: "20/04/2025",
                      status: "Visite programmée",
                      statusColor: "bg-purple-100 text-purple-800",
                    },
                    {
                      ref: "REC-2023-4518",
                      client: "Jean Michel",
                      type: "Nouvelle construction",
                      date: "18/04/2025",
                      status: "Complété",
                      statusColor: "bg-green-100 text-green-800",
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm">{item.ref}</td>
                      <td className="px-4 py-3 text-sm">{item.client}</td>
                      <td className="px-4 py-3 text-sm">{item.type}</td>
                      <td className="px-4 py-3 text-sm">{item.date}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`${item.statusColor} px-2 py-1 rounded-full text-xs font-medium`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Techniciens disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Jean Martin",
                  initials: "JM",
                  role: "Technicien senior",
                  status: "Disponible",
                  color: "bg-enedis-blue",
                  availability: "Disponible aujourd'hui",
                  availabilityColor: "text-green-600",
                },
                {
                  name: "Sophie Dubois",
                  initials: "SD",
                  role: "Technicienne",
                  status: "Sur le terrain",
                  color: "bg-enedis-green",
                  availability: "Disponible demain",
                  availabilityColor: "text-blue-600",
                },
                {
                  name: "Pierre Lefèvre",
                  initials: "PL",
                  role: "Technicien",
                  status: "Sur le terrain",
                  color: "bg-yellow-500",
                  availability: "Disponible demain",
                  availabilityColor: "text-blue-600",
                },
              ].map((tech, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className={`${tech.color} h-10 w-10 rounded-full flex items-center justify-center text-white`}>
                    {tech.initials}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm leading-none">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.role}</p>
                    <p className={`text-xs ${tech.availabilityColor}`}>
                      {tech.availability}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Gérer les techniciens
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
