
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FrenchAddressInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onAddressChange?: (address: {
    street: string;
    postalCode: string;
    city: string;
    cedex?: string;
  }) => void;
  defaultValues?: {
    street?: string;
    postalCode?: string;
    city?: string;
    cedex?: string;
  };
}

export function FrenchAddressInput({
  className,
  onAddressChange,
  defaultValues,
  ...props
}: FrenchAddressInputProps) {
  const [address, setAddress] = React.useState({
    street: defaultValues?.street || '',
    postalCode: defaultValues?.postalCode || '',
    city: defaultValues?.city || '',
    cedex: defaultValues?.cedex || '',
  });

  const handleInputChange = (field: string, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    if (onAddressChange) {
      onAddressChange(newAddress);
    }
  };

  const validatePostalCode = (code: string) => {
    return /^(0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(code);
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div>
        <Label htmlFor="street" className="fr-label">Adresse</Label>
        <Input
          id="street"
          placeholder="Numéro et nom de rue"
          className="fr-input mt-1"
          value={address.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode" className="fr-label">Code postal</Label>
          <Input
            id="postalCode"
            placeholder="Code postal"
            className={`fr-input mt-1 ${
              address.postalCode && !validatePostalCode(address.postalCode)
                ? 'border-france-red'
                : ''
            }`}
            value={address.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            maxLength={5}
            pattern="^(0[1-9]|[1-8]\d|9[0-8])\d{3}$"
          />
          {address.postalCode && !validatePostalCode(address.postalCode) && (
            <p className="text-france-red text-xs mt-1">
              Format invalide. Exemple: 75001
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="city" className="fr-label">Ville</Label>
          <Input
            id="city"
            placeholder="Ville"
            className="fr-input mt-1"
            value={address.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="cedex" className="fr-label">
          CEDEX <span className="text-xs text-gray-500">(optionnel)</span>
        </Label>
        <Input
          id="cedex"
          placeholder="CEDEX (si applicable)"
          className="fr-input mt-1"
          value={address.cedex}
          onChange={(e) => handleInputChange('cedex', e.target.value)}
        />
      </div>
    </div>
  );
}
