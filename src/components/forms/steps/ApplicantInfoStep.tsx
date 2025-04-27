
import { PersonalInfoFields } from "./applicant-info/PersonalInfoFields";
import { AccountTypeSelect } from "./applicant-info/AccountTypeSelect";
import { ContactPreference } from "./applicant-info/ContactPreference";
import { AppointmentDatePicker } from "./applicant-info/AppointmentDatePicker";
import { InfoBox } from "@/components/ui/InfoBox";

const ApplicantInfoStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Informations du demandeur</h2>
      
      <div className="space-y-4">
        <PersonalInfoFields />
        <AccountTypeSelect />
        <ContactPreference />
        <AppointmentDatePicker />
      </div>
      
      <InfoBox 
        title="Information sur la visite technique"
        content="Une visite technique peut être nécessaire pour évaluer précisément les besoins de raccordement. 
          Nos techniciens sont disponibles du lundi au vendredi, de 8h à 17h. Un délai minimum de 3 jours ouvrés est nécessaire pour planifier la visite."
        type="info"
      />
    </div>
  );
};

export default ApplicantInfoStep;
