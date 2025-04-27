
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackFormSubmission, trackPaymentCompletion } from '@/lib/google-tag-manager';
import { CheckCircle, Download, Calendar } from 'lucide-react';

const ThankYou = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get('transaction_id') || `T-${Date.now()}`;
  const amount = parseFloat(queryParams.get('amount') || '99');

  useEffect(() => {
    // Track successful form submission and payment completion
    trackFormSubmission(true);
    trackPaymentCompletion(transactionId, amount);
    
    // Google Ads Conversion Tracking - Event Snippet
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID,
        'value': amount,
        'currency': 'EUR',
        'transaction_id': transactionId
      });
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [transactionId, amount]);

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-enedis-gray-800 mb-4">
          Merci pour votre demande !
        </h1>
        
        <p className="text-lg text-enedis-gray-700 mb-6">
          Votre demande de raccordement a été enregistrée avec succès. Un conseiller Enedis examinera votre dossier dans les plus brefs délais.
        </p>
        
        <div className="bg-enedis-blue/10 rounded-md p-6 mb-8">
          <h2 className="font-medium text-lg mb-3 text-enedis-blue">Prochaines étapes</h2>
          <ol className="list-decimal list-inside text-left space-y-2 text-enedis-gray-700">
            <li>Vous recevrez un email de confirmation avec votre numéro de référence.</li>
            <li>Un conseiller examinera votre demande sous 5 jours ouvrés.</li>
            <li>Un technicien vous contactera pour planifier une visite si nécessaire.</li>
            <li>Vous recevrez une proposition technique et financière détaillée.</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="border border-enedis-blue/20 rounded-md p-4 flex flex-col items-center">
            <Download className="h-8 w-8 text-enedis-blue mb-2" />
            <h3 className="font-medium mb-2">Télécharger votre récépissé</h3>
            <p className="text-sm text-gray-600 mb-3">Conservez ce document comme référence de votre demande</p>
            <Button variant="outline" className="w-full">Télécharger PDF</Button>
          </div>
          
          <div className="border border-enedis-blue/20 rounded-md p-4 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-enedis-blue mb-2" />
            <h3 className="font-medium mb-2">Suivre votre demande</h3>
            <p className="text-sm text-gray-600 mb-3">Consultez l'état d'avancement de votre dossier</p>
            <Button variant="outline" className="w-full">Espace client</Button>
          </div>
        </div>
        
        <p className="text-sm text-enedis-gray-600 mb-8">
          Si vous avez des questions, n'hésitez pas à nous contacter par email à <a href="mailto:contact@racco-service.com" className="text-enedis-blue hover:underline">contact@racco-service.com</a> ou par téléphone au <span className="font-medium">01 23 45 67 89</span>.
        </p>
        
        <Button asChild className="bg-enedis-blue hover:bg-blue-700 text-white">
          <Link to="/">Retourner à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;

// Type definition for Google Ads gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}
