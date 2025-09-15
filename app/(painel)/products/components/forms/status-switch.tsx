import { Switch } from '@heroui/react';

interface StatusSwitchProps {
  isChecked: boolean;
  onValueChange: (checked: boolean) => void;
  label: string;
}

export const StatusSwitch = ({ isChecked, onValueChange, label }: StatusSwitchProps) => {
  return (
    <div className="flex items-center">
      <Switch
        isSelected={isChecked}
        onValueChange={onValueChange}
      />
      <span className="ml-2 text-sm">{label}</span>
    </div>
  );
};