import React, { Ref, FC, useState, useCallback, useEffect, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import Label from '../Label/Label';
import CheckboxIcon from '../Icons/CheckboxIcon';
import useKeyPress from '../../../../utils/hooks/useKeyPress';

interface CheckboxProps {
  label?: string;
  defaultValue?: boolean;
  disabled?: boolean;
  onChange?: (newChecked: boolean) => void;
  name?: string;
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = forwardRef((props, ref) => {
  const { label, defaultValue, disabled, onChange, name, ...otherProps } = props;
  const pressedKey = useKeyPress(' '); // key space ' '

  const [isChecked, setChecked] = useState(!!defaultValue);

  const classes = classNames(
    { [styles.checkboxLabel]: !disabled },
  );

  useEffect(() => {
    if (!pressedKey) return;
    setChecked((previous) => !previous);
  }, [pressedKey]);

  const toggle = useCallback(() => {
    const newValue = !isChecked;
    setChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  }, [isChecked, onChange]);

  return (
    <Label
      title={label || ''}
      className={classes}
      disabled={disabled}
      tabIndex={0}
      position='right'
    >
      <input
        name={name}
        ref={ref}
        type='checkbox'
        className={styles.input}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        {...otherProps}
      />

      {isChecked && !disabled ? <CheckboxIcon isActive /> : <CheckboxIcon />}

    </Label>
  );
});

export default Checkbox;
