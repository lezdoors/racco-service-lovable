
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CalendarCheck, Clock, FileText, ListChecks, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type de données pour les statistiques
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

// Type de données pour les techniciens
interface TechnicianProps {
  name: string;
  initials: string;
  role: string;
  status: string;
  color: string;
  availability: string;
  availabilityColor: string;
  demandes: number;
}

// Type de données pour les demandes récentes
interface RecentRequestProps {
  ref: string;
  client: string;
  type: string;
  date: string;
  status: string;
  statusColor: string;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const isMobile = useIsMobile();

  // Données pour les statistiques
  const statCards: StatCardProps[] = [
    {
      title: "Demandes totales",
      value: "156",
      description: "+12% par rapport au mois précédent",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Demandes en attente",
      value: "24",
      description: "+2 nouvelles demandes aujourd'hui",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Visites programmées",
      value: "8",
      description: "Cette semaine",
      icon: <CalendarCheck className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Demandes traitées",
      value: "132",
      description: "85% de toutes les demandes",
      icon: <ListChecks className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  // Données pour les techniciens
  const technicians: TechnicianProps[] = [
    {
      name: "Jean Martin",
      initials: "JM",
      role: "Technicien senior",
      status: "Disponible",
      color: "bg-enedis-blue",
      availability: "Disponible aujourd'hui",
      availabilityColor: "text-green-600",
      demandes: 8,
    },
    {
      name: "Sophie Dubois",
      initials: "SD",
      role: "Technicienne",
      status: "Sur le terrain",
      color: "bg-enedis-green",
      availability: "Disponible demain",
      availabilityColor: "text-blue-600",
      demandes: 6,
    },
    {
      name: "Pierre Lefèvre",
      initials: "PL",
      role: "Technicien",
      status: "Sur le terrain",
      color: "bg-yellow-500",
      availability: "Disponible demain",
      availabilityColor: "text-blue-600",
      demandes: 5,
    },
    {
      name: "Claire Moreau",
      initials: "CM",
      role: "Technicienne",
      status: "En congé",
      color: "bg-purple-500",
      availability: "Disponible lundi",
      availabilityColor: "text-orange-600",
      demandes: 4,
    },
  ];

  // Données pour les demandes récentes
  const recentRequests: RecentRequestProps[] = [
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
  ];

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
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
          />
        ))}
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
                <Button 
                  variant="outline" 
                  className="mt-4"
                  asChild
                >
                  <Link to="/admin/requests">
                    Voir toutes les demandes
                  </Link>
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
              {technicians.map((tech, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full ${tech.color} mr-2 flex items-center justify-center text-xs text-white`}>
                        {tech.initials}
                      </div>
                      <span>{tech.name}</span>
                    </div>
                    <span className="text-muted-foreground">{tech.demandes} demandes</span>
                  </div>
                  <Progress value={tech.demandes * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Demandes récentes</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/requests">Voir toutes</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((item, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{item.ref}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                      <TableCell>
                        <span className={`${item.statusColor} px-2 py-1 rounded-full text-xs font-medium`}>
                          {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Techniciens disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicians.slice(0, 3).map((tech, i) => (
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
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/admin/technicians">
                  <Users className="h-4 w-4 mr-2" />
                  Gérer les techniciens
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
