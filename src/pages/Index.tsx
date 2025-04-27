import MultiStepForm from "@/components/forms/MultiStepForm";
import { Check, Info, MapPin, Phone, Mail, Calendar, Clock, FileText } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-pattern-light">
      <section className="bg-gradient-to-b from-france-navy to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-haussmann"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">Votre raccordement Enedis Simple, rapide et efficace</h1>
            <div className="french-divider my-6"></div>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Simple, rapide et transparent. Demandez votre raccordement électrique en quelques clics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#demande" className="fr-button-primary px-8 py-3 rounded-md font-medium transition-colors">
                Faire une demande
              </a>
              <a href="#services" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
                Nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Partenaire N°1
en France pour toutes demandes de raccordement Enedis</h2>
            <p className="text-france-navy max-w-2xl mx-auto">Confiez votre demande de Raccordement Électrique en France à des experts de confiance Demande de Viabilisation | Raccordement Définitif | Raccordement Provisoire |  Modification de Branchement | Déplacement ou Suppression de Compteur</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fr-card">
              <div className="bg-france-navy w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-center">Nouvelle construction</h3>
              <p className="text-gray-600 mb-4 text-center">
                Installation complète pour les constructions neuves, de la demande à la mise en service.
              </p>
              <a href="#demande" className="block text-center text-france-navy font-medium hover:underline">
                En savoir plus
              </a>
            </div>

            <div className="fr-card">
              <div className="bg-france-red w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-center">Rénovation</h3>
              <p className="text-gray-600 mb-4 text-center">
                Mise à niveau de votre installation électrique pour vos projets de rénovation.
              </p>
              <a href="#demande" className="block text-center text-france-red font-medium hover:underline">
                En savoir plus
              </a>
            </div>

            <div className="fr-card">
              <div className="bg-france-gold w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-center">Augmentation de puissance</h3>
              <p className="text-gray-600 mb-4 text-center">
                Adaptez votre puissance électrique à vos nouveaux besoins et équipements.
              </p>
              <a href="#demande" className="block text-center text-france-gold font-medium hover:underline">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-16 bg-france-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Comment ça marche</h2>
            <p className="text-france-navy max-w-2xl mx-auto">
              Le processus de raccordement électrique avec Enedis est simple et transparent. 
              Découvrez les étapes clés pour réaliser votre projet.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 relative">
              <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-france-navy opacity-20 hidden md:block"></div>
              
              {[{
              step: "01",
              title: "Soumission de la demande",
              description: "Remplissez le formulaire en ligne avec les détails de votre projet et vos coordonnées."
            }, {
              step: "02",
              title: "Étude technique",
              description: "Nos experts analysent votre demande et évaluent les besoins techniques spécifiques."
            }, {
              step: "03",
              title: "Proposition technique et financière",
              description: "Vous recevez un devis détaillé et personnalisé pour votre raccordement."
            }, {
              step: "04",
              title: "Travaux de raccordement",
              description: "Nos techniciens réalisent les travaux selon le planning convenu."
            }, {
              step: "05",
              title: "Mise en service",
              description: "Une fois les travaux terminés, nous procédons à la mise en service de votre raccordement."
            }].map((item, index) => <div key={index} className="flex">
                  <div className="mr-8">
                    <div className="w-16 h-16 bg-france-navy text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-playfair font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="demande" className="py-16 bg-white relative">
        <div className="absolute inset-0 opacity-5 bg-art-nouveau"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Faire une demande de raccordement</h2>
            <div className="french-divider my-6"></div>
            <p className="text-france-navy max-w-2xl mx-auto">
              Complétez le formulaire ci-dessous pour soumettre votre demande de raccordement électrique. 
              Notre équipe vous contactera rapidement pour la suite du processus.
            </p>
            <div className="flex justify-center my-6 space-x-4">
              <div className="flex items-center">
                <div className="p-1 bg-france-navy rounded-full mr-2">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Conforme à la norme NF C 15-100</span>
              </div>
              <div className="flex items-center">
                <div className="p-1 bg-france-navy rounded-full mr-2">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Certifié CONSUEL</span>
              </div>
            </div>
          </div>

          <MultiStepForm />
        </div>
      </section>

      <section id="about" className="py-16 bg-france-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-haussmann"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">À propos d'Enedis</h2>
                <p className="mb-4">
                  Enedis est le gestionnaire du réseau public de distribution d'électricité en France, qui dessert 95% du territoire français continental.
                </p>
                <p className="mb-4">
                  Notre mission principale est d'assurer un accès à l'électricité pour tous, en garantissant un service de qualité et en modernisant continuellement le réseau.
                </p>
                <p>
                  Avec plus de 38 000 collaborateurs et 1,4 million de kilomètres de réseau, nous sommes engagés dans la transition énergétique et l'innovation au service de nos 37 millions de clients.
                </p>
              </div>
              
              <div className="fr-card bg-white text-france-navy p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <h3 className="font-bold text-xl font-playfair mb-2">Chiffres clés</h3>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border-r border-gray-200">
                      <div className="text-4xl font-playfair font-bold fr-number" data-value="37M">37M</div>
                      <p className="text-gray-600 text-sm">Clients</p>
                    </div>
                    <div>
                      <div className="text-4xl font-playfair font-bold fr-number" data-value="1,4M">1,4M</div>
                      <p className="text-gray-600 text-sm">km de réseau</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border-r border-gray-200">
                      <div className="text-4xl font-playfair font-bold fr-number" data-value="38k">38k</div>
                      <p className="text-gray-600 text-sm">Collaborateurs</p>
                    </div>
                    <div>
                      <div className="text-4xl font-playfair font-bold fr-number" data-value="95%">95%</div>
                      <p className="text-gray-600 text-sm">du territoire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-white relative">
        <div className="absolute inset-0 opacity-5 bg-pattern-light"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Nous contacter</h2>
              <p className="mb-6 text-gray-600">
                Vous avez des questions sur nos services de raccordement ? 
                Notre équipe est à votre disposition pour vous accompagner dans votre projet.
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-france-blueLight rounded-full p-3 mr-4">
                    <Phone className="w-6 h-6 text-france-navy" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-medium">Téléphone</h3>
                    <p className="text-gray-600 fr-phone" data-prefix="+33" data-p1="9" data-p2="70" data-p3="83" data-p4="19" data-p5="70">+33 9 70 83 19 70</p>
                    <p className="text-sm text-gray-500">Du lundi au vendredi, 8h-18h</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-france-blueLight rounded-full p-3 mr-4">
                    <Mail className="w-6 h-6 text-france-navy" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-medium">Email</h3>
                    <p className="text-gray-600">contact@enedis.fr</p>
                    <p className="text-sm text-gray-500">Nous répondons sous 48h</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-france-blueLight rounded-full p-3 mr-4">
                    <MapPin className="w-6 h-6 text-france-navy" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-medium">Adresse</h3>
                    <p className="text-gray-600">34 Place des Corolles, 92400 Courbevoie</p>
                    <p className="text-sm text-gray-500">Siège social</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-france-blueLight rounded-full p-3 mr-4">
                    <Clock className="w-6 h-6 text-france-navy" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-medium">Horaires</h3>
                    <p className="text-gray-600">Lun-Ven: 8h-12h, 14h-18h</p>
                    <p className="text-sm text-gray-500">Fermé les jours fériés français</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fr-card">
              <h3 className="text-xl font-playfair font-semibold mb-4">Message rapide</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm fr-label mb-1">Nom</label>
                    <input type="text" id="name" className="fr-input w-full" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm fr-label mb-1">Email</label>
                    <input type="email" id="email" className="fr-input w-full" placeholder="Votre email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm fr-label mb-1">Sujet</label>
                  <input type="text" id="subject" className="fr-input w-full" placeholder="Sujet du message" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm fr-label mb-1">Message</label>
                  <textarea id="message" rows={4} className="fr-input w-full" placeholder="Votre message"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-2 bg-france-navy text-white font-medium rounded-md hover:bg-blue-900 transition-colors">
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-france-cream">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h4 className="text-xl font-playfair font-semibold mb-3">Réglementation et Normes</h4>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-6">
              Toutes nos installations respectent la norme NF C 15-100 et les réglementations françaises en vigueur.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-france-navy mr-2" />
                <span className="text-sm">Conformité RGPD</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-france-navy mr-2" />
                <span className="text-sm">Certifié CONSUEL</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-france-navy mr-2" />
                <span className="text-sm">Norme NF C 15-100</span>
              </div>
              <div className="flex items-center">
                <Info className="w-5 h-5 text-france-navy mr-2" />
                <span className="text-sm fr-tooltip">
                  Disjoncteur différentiel
                  <span className="fr-tooltip-text">
                    Dispositif de protection qui coupe automatiquement l'alimentation électrique en cas de défaut d'isolement.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;