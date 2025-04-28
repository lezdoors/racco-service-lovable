
import { PersonalInfoFields } from "./applicant-info/PersonalInfoFields";
import { AccountTypeSelect } from "./applicant-info/AccountTypeSelect";
import { ContactPreference } from "./applicant-info/ContactPreference";
import { AppointmentDatePicker } from "./applicant-info/AppointmentDatePicker";
import { CompanyField } from "./applicant-info/CompanyField";
import { InfoBox } from "@/components/ui/InfoBox";

const ApplicantInfoStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Informations du demandeur</h2>
      
      <div className="space-y-4">
        <PersonalInfoFields />
        <AccountTypeSelect />
        <CompanyField />
        <ContactPreference />
        <AppointmentDatePicker />
      </div>
      
      <InfoBox 
        title="Information importante"
        content="Vos coordonnées nous permettent de vous contacter pour planifier votre raccordement. 
          Nous vous contacterons sous 48h pour confirmer votre demande."
        type="info"
      />
    </div>
  );
};

export default ApplicantInfoStep;
