
import { PersonalInfoFields } from "./applicant-info/PersonalInfoFields";
import { AccountTypeSelect } from "./applicant-info/AccountTypeSelect";
import { ContactPreference } from "./applicant-info/ContactPreference";
import { AppointmentDatePicker } from "./applicant-info/AppointmentDatePicker";

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
      
      <div className="bg-enedis-lightGreen rounded-md p-4 mt-6">
        <h4 className="text-enedis-gray-800 font-medium mb-1">Information sur la visite technique</h4>
        <p className="text-sm text-enedis-gray-700">
          Une visite technique peut être nécessaire pour évaluer précisément les besoins de raccordement. 
          Nos techniciens sont disponibles du lundi au vendredi, de 8h à 17h. Un délai minimum de 3 jours ouvrés est nécessaire pour planifier la visite.
        </p>
      </div>
    </div>
  );
};

export default ApplicantInfoStep;
