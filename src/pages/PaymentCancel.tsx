
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Paiement annulé",
      description: "Votre demande n'a pas été finalisée car le paiement a été annulé.",
      variant: "destructive",
    });
  }, []);

  const handleRetry = () => {
    // Navigate back to the form's last step
    navigate("/#demande");
    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById("demande");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <XCircle size={48} className="text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-enedis-gray-800 mb-4">
          Paiement annulé
        </h1>
        <p className="text-gray-600 mb-6">
          Votre paiement a été annulé et votre demande de raccordement n'a pas été soumise.
          Aucun montant n'a été débité de votre compte.
        </p>
        <div className="space-y-4">
          <Button 
            onClick={handleRetry}
            className="bg-enedis-blue hover:bg-blue-700 text-white w-full"
          >
            Réessayer le paiement
          </Button>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
