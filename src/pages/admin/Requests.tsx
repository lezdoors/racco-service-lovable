
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Filter, Search, User, Mail, Phone, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

// Mock data for traiteurs (would come from API/database)
const traiteurs = [
  { id: 1, name: "Sophie Martin", available: true },
  { id: 2, name: "Jean Dupont", available: true },
  { id: 3, name: "Marie Lambert", available: false },
  { id: 4, name: "Thomas Petit", available: true },
];

const requests = [
  {
    id: "REC-2023-4526",
    client: "Martin Dupont",
    email: "martin.dupont@example.com",
    phone: "06 12 34 56 78",
    projectType: "Nouvelle construction",
    date: "22/04/2025",
    address: "14 Rue des Lilas, 75020 Paris",
    status: "Nouveau",
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Normal",
    leadStatus: "Partiel",
    assignedTo: null,
  },
  {
    id: "REC-2023-4525",
    client: "Société ABC",
    email: "contact@abc.com",
    phone: "01 23 45 67 89",
    projectType: "Augmentation de puissance",
    date: "21/04/2025",
    address: "27 Avenue Victor Hugo, 69002 Lyon",
    status: "En traitement",
    statusColor: "bg-yellow-100 text-yellow-800",
    priority: "Élevé",
    leadStatus: "Complet",
    assignedTo: { id: 1, name: "Sophie Martin" },
  },
  {
    id: "REC-2023-4522",
    client: "Marie Lambert",
    email: "marie.lambert@example.com",
    phone: "07 65 43 21 09",
    projectType: "Rénovation",
    date: "20/04/2025",
    address: "8 Place de la Liberté, 44000 Nantes",
    status: "Visite programmée",
    statusColor: "bg-purple-100 text-purple-800",
    priority: "Normal",
    leadStatus: "Complet",
    assignedTo: { id: 2, name: "Jean Dupont" },
  },
  {
    id: "REC-2023-4518",
    client: "Jean Michel",
    email: "jean.michel@example.com",
    phone: "06 98 76 54 32",
    projectType: "Nouvelle construction",
    date: "18/04/2025",
    address: "3 Rue du Commerce, 13001 Marseille",
    status: "Complété",
    statusColor: "bg-green-100 text-green-800",
    priority: "Normal",
    leadStatus: "Complet",
    assignedTo: null,
  },
  {
    id: "REC-2023-4515",
    client: "Immobilière du Sud",
    email: "contact@immosud.fr",
    phone: "04 91 23 45 67",
    projectType: "Rénovation",
    date: "17/04/2025",
    address: "42 Boulevard des Alpes, 38000 Grenoble",
    status: "En traitement",
    statusColor: "bg-yellow-100 text-yellow-800",
    priority: "Urgent",
    leadStatus: "Complet",
    assignedTo: null,
  },
  {
    id: "REC-2023-4512",
    client: "Paul Durand",
    email: "paul.durand@example.com",
    phone: "06 11 22 33 44",
    projectType: "Augmentation de puissance",
    date: "16/04/2025",
    address: "19 Rue de la Paix, 59000 Lille",
    status: "Visite programmée",
    statusColor: "bg-purple-100 text-purple-800",
    priority: "Normal",
    leadStatus: "Partiel",
    assignedTo: null,
  },
  {
    id: "REC-2023-4508",
    client: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "07 99 88 77 66",
    projectType: "Nouvelle construction",
    date: "15/04/2025",
    address: "5 Avenue des Fleurs, 31000 Toulouse",
    status: "Complété",
    statusColor: "bg-green-100 text-green-800",
    priority: "Normal",
    leadStatus: "Complet",
    assignedTo: { id: 4, name: "Thomas Petit" },
  },
  {
    id: "REC-2023-4505",
    client: "Entreprise XYZ",
    email: "contact@xyz-corp.com",
    phone: "01 55 66 77 88",
    projectType: "Augmentation de puissance",
    date: "14/04/2025",
    address: "56 Route des Vignes, 33000 Bordeaux",
    status: "Nouveau",
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Élevé",
    leadStatus: "Partiel",
    assignedTo: null,
  },
];

interface Request {
  id: string;
  client: string;
  email: string;
  phone: string;
  projectType: string;
  date: string;
  address: string;
  status: string;
  statusColor: string;
  priority: string;
  leadStatus: "Partiel" | "Complet";
  assignedTo: { id: number; name: string } | null;
}

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [requestsData, setRequestsData] = useState<Request[]>(requests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [newTraiteurDialogOpen, setNewTraiteurDialogOpen] = useState(false);
  const [newTraiteurName, setNewTraiteurName] = useState("");
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  
  const filteredRequests = requestsData.filter(request => {
    const matchesSearch = 
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || 
      request.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesType = typeFilter === "all" ||
      request.projectType.toLowerCase().includes(typeFilter.toLowerCase());
      
    const matchesLeadStatus = leadStatusFilter === "all" ||
      request.leadStatus.toLowerCase() === leadStatusFilter.toLowerCase();
      
    return matchesSearch && matchesStatus && matchesType && matchesLeadStatus;
  });

  const handleAssignTraiteur = (traiteurId: number) => {
    if (!selectedRequest) return;
    
    const selectedTraiteur = traiteurs.find(t => t.id === traiteurId);
    if (!selectedTraiteur) return;
    
    const updatedRequests = requestsData.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, assignedTo: { id: traiteurId, name: selectedTraiteur.name } } 
        : req
    );
    
    setRequestsData(updatedRequests);
    setAssignDialogOpen(false);
    setDetailDialogOpen(true);
  };

  const handleAddTraiteur = () => {
    if (!newTraiteurName.trim()) return;
    
    // In a real app, this would make an API call to add the traiteur to the database
    console.log(`New traiteur added: ${newTraiteurName}`);
    
    // Close dialog and reset form
    setNewTraiteurDialogOpen(false);
    setNewTraiteurName("");
  };

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

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
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
        <div>
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
        </div>
        <div>
          <Select value={leadStatusFilter} onValueChange={setLeadStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type de lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les leads</SelectItem>
              <SelectItem value="partiel">Leads partiels</SelectItem>
              <SelectItem value="complet">Leads complets</SelectItem>
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
                    <th className="px-4 py-3 font-medium">Lead</th>
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
                      <td className="px-4 py-3">
                        <Badge variant={request.leadStatus === "Partiel" ? "outline" : "default"}>
                          {request.leadStatus}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setDetailDialogOpen(true);
                          }}
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
                      setLeadStatusFilter("all");
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
                Affichage de {filteredRequests.length} sur {requestsData.length} demandes
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

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Détails de la demande {selectedRequest.id}</DialogTitle>
              <DialogDescription>
                Consultez les informations complètes de cette demande de raccordement
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className={selectedRequest.statusColor.replace('bg-', '').replace('text-', '')}
                >
                  {selectedRequest.status}
                </Badge>
                <Badge variant={selectedRequest.leadStatus === "Partiel" ? "outline" : "default"}>
                  Lead {selectedRequest.leadStatus}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Informations client</h3>
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedRequest.client}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{selectedRequest.email}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedRequest.phone}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>{selectedRequest.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Détails du projet</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <p className="font-medium">Type de projet</p>
                      <p>{selectedRequest.projectType}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Date de création</p>
                      <p>{selectedRequest.date}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Priorité</p>
                      <p>{selectedRequest.priority}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Assigné à</p>
                      <p>{selectedRequest.assignedTo?.name || "Non assigné"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Attribution</h3>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setDetailDialogOpen(false);
                        setAssignDialogOpen(true);
                      }}
                    >
                      {selectedRequest.assignedTo ? "Réassigner" : "Assigner"}
                    </Button>
                  )}
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  {selectedRequest.assignedTo ? (
                    <div className="flex items-center">
                      <div className="bg-enedis-blue h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">
                        {selectedRequest.assignedTo.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{selectedRequest.assignedTo.name}</p>
                        <p className="text-sm text-gray-500">Traiteur</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Cette demande n'est pas encore assignée à un traiteur</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Assign Traiteur Dialog */}
      {selectedRequest && (
        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assigner un traiteur</DialogTitle>
              <DialogDescription>
                Sélectionnez un traiteur pour la demande {selectedRequest.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Traiteurs disponibles</h3>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setNewTraiteurDialogOpen(true)}
                  >
                    <Plus className="h-3 w-3" /> 
                    Ajouter
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                {traiteurs
                  .filter(t => t.available)
                  .map(traiteur => (
                    <div 
                      key={traiteur.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => isAdmin && handleAssignTraiteur(traiteur.id)}
                    >
                      <div className="flex items-center">
                        <div className="bg-enedis-blue h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">
                          {traiteur.name.charAt(0)}
                        </div>
                        <span>{traiteur.name}</span>
                      </div>
                      {isAdmin && (
                        <Button size="sm">Assigner</Button>
                      )}
                    </div>
                ))}
                
                {traiteurs.filter(t => t.available).length === 0 && (
                  <p className="text-center py-4 text-gray-500">
                    Aucun traiteur disponible
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setAssignDialogOpen(false);
                setDetailDialogOpen(true);
              }}>
                Annuler
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Traiteur Dialog */}
      {isAdmin && (
        <Dialog open={newTraiteurDialogOpen} onOpenChange={setNewTraiteurDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau traiteur</DialogTitle>
              <DialogDescription>
                Renseignez les informations du nouveau traiteur
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="newTraiteurName">Nom complet</Label>
                <Input
                  id="newTraiteurName"
                  value={newTraiteurName}
                  onChange={(e) => setNewTraiteurName(e.target.value)}
                  placeholder="Prénom Nom"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setNewTraiteurDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddTraiteur}>
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Requests;
