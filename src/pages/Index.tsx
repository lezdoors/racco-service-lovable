
import MultiStepForm from "@/components/forms/MultiStepForm";

const Index = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-enedis-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Raccordement électrique pour votre projet
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Simple, rapide et transparent. Demandez votre raccordement électrique en quelques clics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#demande"
                className="bg-white text-enedis-blue px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Faire une demande
              </a>
              <a 
                href="#services"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Nos services de raccordement</h2>
            <p className="text-enedis-gray-600 max-w-2xl mx-auto">
              Enedis vous accompagne dans toutes vos démarches de raccordement électrique, 
              que ce soit pour une nouvelle construction, une rénovation ou une augmentation de puissance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-enedis-lightBlue rounded-lg p-6 text-center">
              <div className="bg-enedis-blue w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nouvelle construction</h3>
              <p className="text-gray-600 mb-4">
                Installation complète pour les constructions neuves, de la demande à la mise en service.
              </p>
              <a href="#demande" className="text-enedis-blue font-medium hover:underline">
                En savoir plus
              </a>
            </div>

            <div className="bg-enedis-lightGreen rounded-lg p-6 text-center">
              <div className="bg-enedis-green w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rénovation</h3>
              <p className="text-gray-600 mb-4">
                Mise à niveau de votre installation électrique pour vos projets de rénovation.
              </p>
              <a href="#demande" className="text-enedis-green font-medium hover:underline">
                En savoir plus
              </a>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="bg-gray-700 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Augmentation de puissance</h3>
              <p className="text-gray-600 mb-4">
                Adaptez votre puissance électrique à vos nouveaux besoins et équipements.
              </p>
              <a href="#demande" className="text-gray-700 font-medium hover:underline">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-enedis-gray-600 max-w-2xl mx-auto">
              Le processus de raccordement électrique avec Enedis est simple et transparent. 
              Découvrez les étapes clés pour réaliser votre projet.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 relative">
              <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-enedis-blue-300 hidden md:block"></div>
              
              {[
                {
                  step: "01",
                  title: "Soumission de la demande",
                  description: "Remplissez le formulaire en ligne avec les détails de votre projet et vos coordonnées."
                },
                {
                  step: "02",
                  title: "Étude technique",
                  description: "Nos experts analysent votre demande et évaluent les besoins techniques spécifiques."
                },
                {
                  step: "03",
                  title: "Proposition technique et financière",
                  description: "Vous recevez un devis détaillé et personnalisé pour votre raccordement."
                },
                {
                  step: "04",
                  title: "Travaux de raccordement",
                  description: "Nos techniciens réalisent les travaux selon le planning convenu."
                },
                {
                  step: "05",
                  title: "Mise en service",
                  description: "Une fois les travaux terminés, nous procédons à la mise en service de votre raccordement."
                }
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className="mr-8">
                    <div className="w-16 h-16 bg-enedis-blue text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="demande" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Faire une demande de raccordement</h2>
            <p className="text-enedis-gray-600 max-w-2xl mx-auto">
              Complétez le formulaire ci-dessous pour soumettre votre demande de raccordement électrique. 
              Notre équipe vous contactera rapidement pour la suite du processus.
            </p>
          </div>

          <MultiStepForm />
        </div>
      </section>

      <section id="about" className="py-16 bg-enedis-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">À propos d'Enedis</h2>
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
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-enedis-blue text-center">
                  <h3 className="font-bold text-xl mb-2">Chiffres clés</h3>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border-r border-gray-200">
                      <div className="text-4xl font-bold">37M</div>
                      <p className="text-gray-600 text-sm">Clients</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold">1.4M</div>
                      <p className="text-gray-600 text-sm">km de réseau</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border-r border-gray-200">
                      <div className="text-4xl font-bold">38k</div>
                      <p className="text-gray-600 text-sm">Collaborateurs</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold">95%</div>
                      <p className="text-gray-600 text-sm">du territoire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Nous contacter</h2>
              <p className="mb-6 text-gray-600">
                Vous avez des questions sur nos services de raccordement ? 
                Notre équipe est à votre disposition pour vous accompagner dans votre projet.
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-enedis-lightBlue rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-enedis-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-600">09 70 83 19 70</p>
                    <p className="text-sm text-gray-500">Du lundi au vendredi, 8h-18h</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-enedis-lightBlue rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-enedis-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact@enedis.fr</p>
                    <p className="text-sm text-gray-500">Nous répondons sous 48h</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-enedis-lightBlue rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-enedis-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-600">34 Place des Corolles, 92400 Courbevoie</p>
                    <p className="text-sm text-gray-500">Siège social</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Message rapide</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Votre email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Sujet du message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-enedis-blue text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
