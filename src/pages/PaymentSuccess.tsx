
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    // Clear the form data from localStorage
    localStorage.removeItem("enedis-form-data");
    localStorage.removeItem("enedis-form-data-step");
    
    toast({
      title: "Merci pour votre demande !",
      description: "Nous avons bien reçu votre paiement. Vous recevrez un email de confirmation sous peu.",
    });
    
    setIsVerifying(false);
  }, [sessionId, navigate, toast]);

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-enedis-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-enedis-gray-800 mb-4">
          Merci pour votre confiance !
        </h1>
        
        <div className="space-y-4 text-left mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Prochaines étapes :</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-green-800">
              <li>Vous allez recevoir un email de confirmation dans quelques minutes</li>
              <li>Un conseiller Enedis examinera votre dossier sous 48h ouvrées</li>
              <li>Nous vous contacterons pour planifier une visite technique si nécessaire</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Votre référence :</h2>
            <p className="text-blue-800 font-mono">
              {sessionId ? sessionId.substring(0, 8).toUpperCase() : "ENE-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Conservez cette référence pour le suivi de votre dossier
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/")}
            className="bg-enedis-blue hover:bg-blue-700 text-white w-full"
          >
            Retour à l'accueil
          </Button>
          <p className="text-sm text-gray-500">
            Des questions ? Contactez-nous au 09 70 83 19 70
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
