
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Clear the form data from localStorage so they can start fresh next time
    localStorage.removeItem("enedis-form-data");
    localStorage.removeItem("enedis-form-data-step");
    
    // Show success toast
    toast({
      title: "Paiement réussi !",
      description: "Votre demande de raccordement a bien été envoyée.",
    });
    
    setIsVerifying(false);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-enedis-gray-800 mb-4">
          Paiement confirmé
        </h1>
        <p className="text-gray-600 mb-6">
          Votre demande de raccordement a bien été enregistrée et votre paiement a été traité avec succès. 
          Un email de confirmation vous a été envoyé avec tous les détails de votre demande.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            Un conseiller Enedis examinera votre demande dans les meilleurs délais et vous contactera 
            pour les prochaines étapes. Votre numéro de référence est : 
            <span className="font-bold block mt-1">
              {sessionId ? sessionId.substring(0, 8).toUpperCase() : "ENE-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
            </span>
          </p>
        </div>
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/")}
            className="bg-enedis-blue hover:bg-blue-700 text-white w-full"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
