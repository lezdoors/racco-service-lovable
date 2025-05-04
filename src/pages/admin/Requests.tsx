
import { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Filter, Search, User, Mail, Phone, MapPin, Plus, Calendar, Clock, FileX } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types pour les traiteurs (agents)
interface Traiteur {
  id: number;
  name: string;
  available: boolean;
}

// Types pour les demandes clients
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
  prm?: string; // Numéro de Point de Livraison (PDL) ou Point Référence Mesure (PRM)
  description?: string;
  documents?: string[];
  paymentStatus?: "En attente" | "Payé" | "Échec" | "Remboursé";
  paymentRef?: string;
  service?: string;
  price?: string;
}

// Données mock pour les traiteurs
const traiteurs: Traiteur[] = [
  { id: 1, name: "Sophie Martin", available: true },
  { id: 2, name: "Jean Dupont", available: true },
  { id: 3, name: "Marie Lambert", available: false },
  { id: 4, name: "Thomas Petit", available: true },
  { id: 5, name: "Claire Dubois", available: true },
  { id: 6, name: "Lucas Bernard", available: true },
];

// Données mock pour les demandes
const requestsData: Request[] = [
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
    prm: "12345678901234",
    description: "Construction d'une maison individuelle nécessitant un nouveau raccordement électrique.",
    paymentStatus: "En attente",
    service: "Raccordement standard",
    price: "290€",
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
    prm: "98765432109876",
    description: "Augmentation de puissance pour un atelier artisanal, passage de 9 à 12 kVA.",
    documents: ["attestation_electricien.pdf", "cerfa_augmentation.pdf"],
    paymentStatus: "Payé",
    paymentRef: "PAY-12345-ABCDE",
    service: "Augmentation de puissance",
    price: "190€",
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
    description: "Rénovation complète d'un appartement, vérification de l'installation électrique existante.",
    documents: ["photos_tableau.jpg", "plan_appartement.pdf"],
    paymentStatus: "Payé",
    paymentRef: "PAY-54321-FGHIJ",
    service: "Diagnostic électrique",
    price: "150€",
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
    prm: "45678901234567",
    description: "Construction d'un local commercial avec installation triphasée.",
    documents: ["plans_local.pdf", "certificat_conformite.pdf"],
    paymentStatus: "Payé",
    paymentRef: "PAY-67890-KLMNO",
    service: "Raccordement professionnel",
    price: "450€",
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
    description: "Rénovation d'un immeuble de 5 étages, vérification des alimentations par étage.",
    paymentStatus: "Payé",
    paymentRef: "PAY-24680-PQRST",
    service: "Étude technique complexe",
    price: "750€",
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
    prm: "78901234567890",
    paymentStatus: "En attente",
    service: "Augmentation de puissance",
    price: "190€",
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
    description: "Maison neuve avec domotique avancée, nécessitant une installation spécifique.",
    documents: ["plans_domotique.pdf", "schema_electrique.pdf"],
    paymentStatus: "Payé",
    paymentRef: "PAY-13579-UVWXY",
    service: "Raccordement premium",
    price: "390€",
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
    prm: "23456789012345",
    description: "Augmentation de puissance pour un atelier de production, passage en triphasé.",
    paymentStatus: "Échec",
    service: "Modification de branchement",
    price: "420€",
  },
  {
    id: "REC-2023-4502",
    client: "Catherine Blanc",
    email: "catherine.blanc@example.com",
    phone: "06 54 32 10 98",
    projectType: "Déplacement de compteur",
    date: "13/04/2025",
    address: "11 Rue des Capucines, 34000 Montpellier",
    status: "Nouveau",
    statusColor: "bg-blue-100 text-blue-800",
    priority: "Normal",
    leadStatus: "Complet",
    assignedTo: null,
    prm: "34567890123456",
    description: "Déplacement du compteur suite à des travaux d'agrandissement de la maison.",
    paymentStatus: "En attente",
    service: "Déplacement de compteur",
    price: "280€",
  },
  {
    id: "REC-2023-4498",
    client: "Marc Leroy",
    email: "marc.leroy@example.com",
    phone: "07 12 34 56 78",
    projectType: "Raccordement provisoire",
    date: "12/04/2025",
    address: "23 Boulevard Maritime, 06000 Nice",
    status: "En traitement",
    statusColor: "bg-yellow-100 text-yellow-800",
    priority: "Urgent",
    leadStatus: "Complet",
    assignedTo: { id: 5, name: "Claire Dubois" },
    description: "Raccordement provisoire pour un événement sur la plage, durée de 3 jours.",
    documents: ["autorisation_mairie.pdf", "plan_installation.pdf"],
    paymentStatus: "Payé",
    paymentRef: "PAY-97531-ZABCD",
    service: "Raccordement temporaire",
    price: "320€",
  },
];

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [requests, setRequests] = useState<Request[]>(requestsData);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [newTraiteurDialogOpen, setNewTraiteurDialogOpen] = useState(false);
  const [newTraiteurName, setNewTraiteurName] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const isAdmin = user?.role === 'admin';

  // Fonction de filtrage des demandes
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.email && request.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.phone && request.phone.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === "all" || 
      request.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesType = typeFilter === "all" ||
      request.projectType.toLowerCase().includes(typeFilter.toLowerCase());
      
    const matchesLeadStatus = leadStatusFilter === "all" ||
      request.leadStatus.toLowerCase() === leadStatusFilter.toLowerCase();
      
    const matchesPaymentStatus = paymentStatusFilter === "all" ||
      (request.paymentStatus && request.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase());
      
    return matchesSearch && matchesStatus && matchesType && matchesLeadStatus && matchesPaymentStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Fonctions pour la pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fonction pour assigner un traiteur à une demande
  const handleAssignTraiteur = (traiteurId: number) => {
    if (!selectedRequest) return;
    
    const selectedTraiteur = traiteurs.find(t => t.id === traiteurId);
    if (!selectedTraiteur) return;
    
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, assignedTo: { id: traiteurId, name: selectedTraiteur.name } } 
        : req
    );
    
    setRequests(updatedRequests);
    setAssignDialogOpen(false);
    setDetailDialogOpen(true);
    
    toast({
      title: "Traiteur assigné",
      description: `${selectedTraiteur.name} a été assigné à la demande ${selectedRequest.id}`,
    });
  };

  // Fonction pour ajouter un nouveau traiteur
  const handleAddTraiteur = () => {
    if (!newTraiteurName.trim()) return;
    
    // Dans une application réelle, cela ferait un appel API pour ajouter le traiteur à la base de données
    const newId = traiteurs.length + 1;
    const newTraiteur = {
      id: newId,
      name: newTraiteurName,
      available: true
    };
    
    // Simule l'ajout du traiteur
    // Dans une vraie application, on mettrait à jour l'état après confirmation de l'API
    
    toast({
      title: "Traiteur ajouté",
      description: `${newTraiteurName} a été ajouté à l'équipe`,
    });
    
    // Ferme la boîte de dialogue et réinitialise le formulaire
    setNewTraiteurDialogOpen(false);
    setNewTraiteurName("");
  };

  // Fonction pour mettre à jour le statut d'une demande
  const updateRequestStatus = (id: string, newStatus: string) => {
    const statusColors: Record<string, string> = {
      "Nouveau": "bg-blue-100 text-blue-800",
      "En traitement": "bg-yellow-100 text-yellow-800",
      "Visite programmée": "bg-purple-100 text-purple-800",
      "Complété": "bg-green-100 text-green-800",
      "Annulé": "bg-red-100 text-red-800",
      "En attente d'infos client": "bg-orange-100 text-orange-800",
    };
    
    const updatedRequests = requests.map(req => 
      req.id === id 
        ? { ...req, status: newStatus, statusColor: statusColors[newStatus] || "bg-gray-100 text-gray-800" } 
        : req
    );
    
    setRequests(updatedRequests);
    
    // Si la demande sélectionnée est celle dont on change le statut, mettre à jour également
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        status: newStatus,
        statusColor: statusColors[newStatus] || "bg-gray-100 text-gray-800"
      });
    }
    
    toast({
      title: "Statut mis à jour",
      description: `La demande ${id} est maintenant "${newStatus}"`,
    });
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
              placeholder="Rechercher par client, référence, email, téléphone ou adresse..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtre par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="en traitement">En traitement</SelectItem>
              <SelectItem value="visite programmée">Visite programmée</SelectItem>
              <SelectItem value="complété">Complété</SelectItem>
              <SelectItem value="annulé">Annulé</SelectItem>
              <SelectItem value="en attente d'infos client">En attente d'infos client</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={leadStatusFilter} onValueChange={setLeadStatusFilter}>
            <SelectTrigger className="w-full">
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

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="nouvelle construction">Nouvelle construction</SelectItem>
              <SelectItem value="augmentation de puissance">Augmentation de puissance</SelectItem>
              <SelectItem value="rénovation">Rénovation</SelectItem>
              <SelectItem value="déplacement de compteur">Déplacement de compteur</SelectItem>
              <SelectItem value="raccordement provisoire">Raccordement provisoire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Statut de paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les paiements</SelectItem>
              <SelectItem value="en attente">En attente</SelectItem>
              <SelectItem value="payé">Payé</SelectItem>
              <SelectItem value="échec">Échec</SelectItem>
              <SelectItem value="remboursé">Remboursé</SelectItem>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden md:table-cell">Type de projet</TableHead>
                    <TableHead className="hidden lg:table-cell">Adresse</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>{request.client}</div>
                        <div className="text-sm text-gray-500 hidden sm:block">{request.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{request.projectType}</TableCell>
                      <TableCell className="hidden lg:table-cell truncate max-w-xs">{request.address}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.date}</TableCell>
                      <TableCell>
                        <span className={`${request.statusColor} text-xs font-medium px-2 py-1 rounded-full`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.leadStatus === "Partiel" ? "outline" : "default"}>
                          {request.leadStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.paymentStatus && (
                          <Badge 
                            variant={request.paymentStatus === "Payé" ? "default" : "outline"}
                            className={
                              request.paymentStatus === "Échec" 
                                ? "bg-red-100 text-red-800 hover:bg-red-200" 
                                : request.paymentStatus === "Payé"
                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                : ""
                            }
                          >
                            {request.paymentStatus}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileX className="h-12 w-12 text-gray-300" />
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
                      setPaymentStatusFilter("all");
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>

          {filteredRequests.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => goToPage(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    // Afficher uniquement les 5 premières pages
                    if (page <= 3 || page === totalPages || page === currentPage) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => goToPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === 4 && totalPages > 5) {
                      return <PaginationItem key="ellipsis"><PaginationEllipsis /></PaginationItem>;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => goToPage(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogue de détails de la demande */}
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
                <div className="flex items-center gap-2">
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
                {isAdmin && (
                  <Select 
                    onValueChange={(value) => updateRequestStatus(selectedRequest.id, value)}
                    defaultValue={selectedRequest.status}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Changer le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nouveau">Nouveau</SelectItem>
                      <SelectItem value="En traitement">En traitement</SelectItem>
                      <SelectItem value="Visite programmée">Visite programmée</SelectItem>
                      <SelectItem value="Complété">Complété</SelectItem>
                      <SelectItem value="Annulé">Annulé</SelectItem>
                      <SelectItem value="En attente d'infos client">En attente d'infos client</SelectItem>
                    </SelectContent>
                  </Select>
                )}
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
                    {selectedRequest.prm && (
                      <div className="flex gap-2 items-center">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>PRM/PDL: {selectedRequest.prm}</span>
                      </div>
                    )}
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
                    {selectedRequest.service && (
                      <div className="text-sm col-span-2">
                        <p className="font-medium">Service demandé</p>
                        <p>{selectedRequest.service} - {selectedRequest.price}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedRequest.description && (
                    <div className="mt-4 text-sm">
                      <p className="font-medium">Description</p>
                      <p className="mt-1 text-gray-700">{selectedRequest.description}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Documents */}
                {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Documents</h3>
                    <div className="space-y-2">
                      {selectedRequest.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{doc}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-auto"
                            onClick={() => {
                              // Dans une application réelle, ceci déclencherait un téléchargement
                              console.log(`Téléchargement de ${doc}`);
                            }}
                          >
                            Télécharger
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Informations de paiement */}
                {selectedRequest.paymentStatus && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Informations de paiement</h3>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Statut:</span>
                          <Badge 
                            variant={selectedRequest.paymentStatus === "Payé" ? "default" : "outline"}
                            className={
                              selectedRequest.paymentStatus === "Échec" 
                                ? "bg-red-100 text-red-800" 
                                : selectedRequest.paymentStatus === "Payé"
                                ? "bg-green-100 text-green-800" 
                                : ""
                            }
                          >
                            {selectedRequest.paymentStatus}
                          </Badge>
                        </div>
                        {selectedRequest.paymentRef && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Référence:</span>
                            <span className="text-sm">{selectedRequest.paymentRef}</span>
                          </div>
                        )}
                        {selectedRequest.price && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Montant:</span>
                            <span className="text-sm font-semibold">{selectedRequest.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Dialogue d'assignation de traiteur */}
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
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setAssignDialogOpen(false);
                setDetailDialogOpen(true);
              }}>
                Annuler
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue d'ajout de traiteur */}
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
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewTraiteurDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddTraiteur}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Requests;
