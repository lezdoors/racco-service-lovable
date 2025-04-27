
import React from 'react';

interface InfoBoxProps {
  title: string;
  content: string;
  type?: 'info' | 'warning' | 'success';
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, content, type = 'info' }) => {
  const colorStyles = {
    info: 'bg-enedis-lightGreen text-enedis-gray-800',
    warning: 'bg-amber-50 text-amber-800',
    success: 'bg-green-50 text-green-800',
  };
  
  return (
    <div className={`rounded-md p-4 ${colorStyles[type]}`}>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-enedis-gray-700">
        {content}
      </p>
    </div>
  );
};
