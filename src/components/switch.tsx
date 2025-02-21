import { useState } from 'react';
import "../styles/switch.css"
import { SwitchProps } from '../models/propInterfaces';

const Switch: React.FC<SwitchProps> = ({ onChange, checked: initialChecked }) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);

  const handleClick = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div
      className={`switch ${checked && "active"}`}
      onClick={handleClick}
    >
      <div className="switch-handle" />
    </div>
  );
};

export default Switch;