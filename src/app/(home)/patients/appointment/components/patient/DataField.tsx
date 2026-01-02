import React from 'react';

interface DataFieldProps {
  label: string;
  value: string;
}

export const DataField: React.FC<DataFieldProps> = ({ label, value }) => (
  <div className="grid gap-1">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);