import React from "react";
import { Phone, Mail, Clock } from "lucide-react";
const ContactSection = () => {
  return <section id="contact" className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-5 bg-pattern-light"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Nous contacter</h2>
            <p className="mb-6 text-gray-600">
              Vous avez des questions sur nos services de raccordement ? Notre équipe est à votre
              disposition pour vous accompagner dans votre projet.
            </p>

            <div className="space-y-4">
              <div className="flex">
                <div className="bg-france-blueLight rounded-full p-3 mr-4">
                  <Phone className="w-6 h-6 text-france-navy" />
                </div>
                <div>
                  <h3 className="font-playfair font-medium">Téléphone</h3>
                  <p className="text-gray-600">09 70 70 95 70</p>
                  <p className="text-sm text-gray-500">Du lundi au vendredi, 8h-18h</p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-france-blueLight rounded-full p-3 mr-4">
                  <Mail className="w-6 h-6 text-france-navy" />
                </div>
                <div>
                  <h3 className="font-playfair font-medium">Email</h3>
                  <p className="text-gray-600">contact@raccordement-elec.fr</p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-france-blueLight rounded-full p-3 mr-4">
                  <Clock className="w-6 h-6 text-france-navy" />
                </div>
                <div>
                  <h3 className="font-playfair font-medium">Horaires</h3>
                  <p className="text-gray-600">Lun-Ven: 8h-18h</p>
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
                  <label htmlFor="name" className="block text-sm fr-label mb-1">
                    Nom
                  </label>
                  <input type="text" id="name" className="fr-input w-full" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm fr-label mb-1">
                    Email
                  </label>
                  <input type="email" id="email" className="fr-input w-full" placeholder="Votre email" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm fr-label mb-1">
                  Sujet
                </label>
                <input type="text" id="subject" className="fr-input w-full" placeholder="Sujet du message" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm fr-label mb-1">
                  Message
                </label>
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
    </section>;
};
export default ContactSection;