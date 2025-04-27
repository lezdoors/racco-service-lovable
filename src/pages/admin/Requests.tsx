
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FileText, Filter, Search } from "lucide-react";

const requests = [
  {
    id: "REC-2023-4526",
    client: "Martin Dupont",
    email: "martin.dupont@example.com",
    projectType: "Nouvelle construction",
    date: "22/04/2025",
    address: "14 Rue des Lilas, 75020 Paris",
    status: "Nouveau",
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Normal",
  },
  {
    id: "REC-2023-4525",
    client: "Société ABC",
    email: "contact@abc.com",
    projectType: "Augmentation de puissance",
    date: "21/04/2025",
    address: "27 Avenue Victor Hugo, 69002 Lyon",
    status: "En traitement",
    statusColor: "bg-yellow-100 text-yellow-800",
    priority: "Élevé",
  },
  {
    id: "REC-2023-4522",
    client: "Marie Lambert",
    email: "marie.lambert@example.com",
    projectType: "Rénovation",
    date: "20/04/2025",
    address: "8 Place de la Liberté, 44000 Nantes",
    status: "Visite programmée",
    statusColor: "bg-purple-100 text-purple-800",
    priority: "Normal",
  },
  {
    id: "REC-2023-4518",
    client: "Jean Michel",
    email: "jean.michel@example.com",
    projectType: "Nouvelle construction",
    date: "18/04/2025",
    address: "3 Rue du Commerce, 13001 Marseille",
    status: "Complété",
    statusColor: "bg-green-100 text-green-800",
    priority: "Normal",
  },
  {
    id: "REC-2023-4515",
    client: "Immobilière du Sud",
    email: "contact@immosud.fr",
    projectType: "Rénovation",
    date: "17/04/2025",
    address: "42 Boulevard des Alpes, 38000 Grenoble",
    status: "En traitement",
    statusColor: "bg-yellow-100 text-yellow-800",
    priority: "Urgent",
  },
  {
    id: "REC-2023-4512",
    client: "Paul Durand",
    email: "paul.durand@example.com",
    projectType: "Augmentation de puissance",
    date: "16/04/2025",
    address: "19 Rue de la Paix, 59000 Lille",
    status: "Visite programmée",
    statusColor: "bg-purple-100 text-purple-800",
    priority: "Normal",
  },
  {
    id: "REC-2023-4508",
    client: "Sophie Martin",
    email: "sophie.martin@example.com",
    projectType: "Nouvelle construction",
    date: "15/04/2025",
    address: "5 Avenue des Fleurs, 31000 Toulouse",
    status: "Complété",
    statusColor: "bg-green-100 text-green-800",
    priority: "Normal",
  },
  {
    id: "REC-2023-4505",
    client: "Entreprise XYZ",
    email: "contact@xyz-corp.com",
    projectType: "Augmentation de puissance",
    date: "14/04/2025",
    address: "56 Route des Vignes, 33000 Bordeaux",
    status: "Nouveau",
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Élevé",
  },
];

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || 
      request.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesType = typeFilter === "all" ||
      request.projectType.toLowerCase().includes(typeFilter.toLowerCase());
      
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Demandes de raccordement</h1>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Rechercher par client, référence ou adresse..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtre par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="en traitement">En traitement</SelectItem>
              <SelectItem value="visite programmée">Visite programmée</SelectItem>
              <SelectItem value="complété">Complété</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtre par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="nouvelle">Nouvelle construction</SelectItem>
              <SelectItem value="rénovation">Rénovation</SelectItem>
              <SelectItem value="augmentation">Augmentation de puissance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Liste des demandes</CardTitle>
          <CardDescription>
            {filteredRequests.length} demandes au total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-enedis-gray-100">
                  <tr className="text-left border-b">
                    <th className="px-4 py-3 font-medium">Référence</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Type de projet</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Adresse</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{request.id}</td>
                      <td className="px-4 py-3">
                        <div>{request.client}</div>
                        <div className="text-sm text-gray-500 hidden sm:block">{request.email}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">{request.projectType}</td>
                      <td className="px-4 py-3 hidden lg:table-cell truncate max-w-xs">{request.address}</td>
                      <td className="px-4 py-3 hidden md:table-cell">{request.date}</td>
                      <td className="px-4 py-3">
                        <span className={`${request.statusColor} text-xs font-medium px-2 py-1 rounded-full`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="outline" 
                          size="sm"
                        >
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune demande trouvée</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Aucune demande ne correspond à vos critères de recherche.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>

          {filteredRequests.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Affichage de {filteredRequests.length} sur {requests.length} demandes
              </p>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" className="bg-enedis-blue/10">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Requests;
