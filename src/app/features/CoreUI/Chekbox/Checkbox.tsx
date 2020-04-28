import React, { Ref, FC, useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import Label from '../Label/Label';
import CheckboxIcon from '../Icons/CheckboxIcon';
// import useHover from '../../../../utils/hooks/useHover';
import useFocus from '../../../../utils/hooks/useFocus';
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
  const labelReference = useRef(null);
  // const hover = useHover(labelReference);
  const focus = useFocus(labelReference);
  const pressedKey = useKeyPress(' '); // key space ' '

  const [isChecked, setChecked] = useState(!!defaultValue);

  const classes = classNames(
    { [styles.checkboxLabel]: !disabled },
    { [styles.svgHover]: !disabled && !isChecked && !focus },
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
      ref={labelReference}
    >

      {isChecked ? <CheckboxIcon isActive /> : <CheckboxIcon />}

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
    </Label>
  );
});

export default Checkbox;
