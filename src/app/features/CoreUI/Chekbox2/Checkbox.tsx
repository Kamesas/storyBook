import React, { Ref, FC, useState, useCallback, forwardRef } from 'react';

import styles from './Checkbox.module.scss';
import CheckboxIcon from '../Icons/CheckboxIcon';

interface CheckboxProps {
  label?: string;
  defaultValue?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (newChecked: boolean) => void;
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = forwardRef((props, ref) => {
  const { label, defaultValue, disabled, onChange, name } = props;

  const [isChecked, setChecked] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    const newValue = !isChecked;
    setChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  }, [isChecked, onChange]);

  const onKeyHandler = (event: React.KeyboardEvent) => {
    if (event.charCode !== 32) return;
    toggle();
  };

  return (
    <div
      tabIndex={disabled ? -1 : 0}
      onKeyPress={(event: React.KeyboardEvent) => onKeyHandler(event)}
      role='checkbox'
      aria-checked
    >
      <input
        ref={ref}
        type='checkbox'
        name={name}
        className={styles.input}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        id='customCheckbox'
      />
      <label
        htmlFor='customCheckbox'
        className={styles.checkboxLabel}
      >
        {isChecked && !disabled ? <CheckboxIcon isActive /> : <CheckboxIcon />}
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
