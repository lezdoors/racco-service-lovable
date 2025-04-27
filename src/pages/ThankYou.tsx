
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackFormSubmission } from '@/lib/google-tag-manager';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  useEffect(() => {
    // Track successful form submission
    trackFormSubmission(true);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

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
