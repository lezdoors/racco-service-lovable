
import { ProjectTypeSelect } from "./project-info/ProjectTypeSelect";
import { AddressFields } from "./project-info/AddressFields";
import { CompletionDatePicker } from "./project-info/CompletionDatePicker";
import { PowerRequirements } from "./project-info/PowerRequirements";
import { ConnectionTypeSelector } from "./project-info/ConnectionTypeSelector";

const ProjectInfoStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Informations du projet</h2>
      
      <div className="space-y-4">
        <ProjectTypeSelect />
        <AddressFields />
        <CompletionDatePicker />
        <PowerRequirements />
        <ConnectionTypeSelector />
      </div>
      
      <div className="bg-enedis-lightBlue p-4 rounded-md mt-6">
        <p className="text-sm text-enedis-gray-700">
          <strong>Conseil :</strong> Pour un logement individuel standard, une puissance de 6 à 9 kVA en monophasé est généralement suffisante. Pour les projets industriels ou avec des équipements spécifiques, le triphasé est recommandé.
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoStep;
