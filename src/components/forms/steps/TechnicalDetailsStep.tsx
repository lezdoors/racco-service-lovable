
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "@/hooks/useMultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TechnicalDetailsStep = () => {
  const { control, formState: { errors }, register } = useFormContext<FormData>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const meterStatusOptions = [
    { value: "new", label: "Nouvelle installation (pas de compteur existant)" },
    { value: "existing", label: "Compteur existant à remplacer" },
    { value: "upgrade", label: "Augmentation de puissance (compteur existant)" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(uploadedFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-enedis-gray-800">Détails techniques</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="meterStatus">État actuel du compteur</Label>
          <Controller
            name="meterStatus"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Sélectionner l'état du compteur" />
                </SelectTrigger>
                <SelectContent>
                  {meterStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="buildingSpecs">Spécifications du bâtiment</Label>
          <Textarea
            id="buildingSpecs"
            placeholder="Décrivez le type de bâtiment, sa surface, le nombre d'étages, etc."
            className="mt-1 h-24"
            {...register("buildingSpecs")}
          />
          {errors.buildingSpecs && (
            <p className="text-red-500 text-sm mt-1">{errors.buildingSpecs.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="connectionDistance">
            Distance approximative au point de raccordement électrique le plus proche (mètres)
          </Label>
          <Input
            id="connectionDistance"
            type="number"
            min="0"
            className="mt-1"
            placeholder="Distance en mètres"
            {...register("connectionDistance", { valueAsNumber: true })}
          />
        </div>

        <div>
          <Label>Documents techniques</Label>
          <div className="mt-2 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileUpload}
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-enedis-lightBlue text-enedis-blue">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-enedis-blue">Cliquez pour télécharger</span> ou glissez-déposez
                  </div>
                  <p className="text-xs text-gray-500">
                    Plans du site, schémas électriques, photos (PNG, JPG, PDF, max 10 MB)
                  </p>
                </div>
              </Label>
            </div>

            {uploadedFiles.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Fichiers téléchargés</h4>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="bg-enedis-lightBlue text-enedis-blue p-2 rounded mr-2">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFile(index)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={cn(
        "p-4 rounded-md mt-6",
        "bg-yellow-50 border border-yellow-200"
      )}>
        <h4 className="font-medium text-yellow-800 mb-1">Information importante</h4>
        <p className="text-sm text-yellow-700">
          Les documents techniques comme les plans du site et les schémas électriques accélèrent le traitement de votre demande. Des documents détaillés permettent à nos techniciens d'évaluer précisément vos besoins de raccordement.
        </p>
      </div>
    </div>
  );
};

export default TechnicalDetailsStep;
