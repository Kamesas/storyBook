import React, { KeyboardEvent, useState, useEffect, useRef, Ref, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';
import DropDownIcon from '../Icons/DropDownIcon';
import CheckboxIcon from '../Icons/CheckboxIcon';
import useKeyPress from '../../../../utils/hooks/useKeyPress';
import useOnClickOutside from '../../../../utils/hooks/useOnClickOutside';

interface SelectProps {
  placeholder: string;
  items?: Array<string>;
  multiSelect?: boolean;
  disabled?: boolean;
  size?: number;
  labelTitle?: string;
  name?: string;
  ref?: Ref<HTMLSelectElement>;
}

const Select: React.FC<SelectProps> = forwardRef(({
  placeholder,
  items, multiSelect = false,
  size,
  disabled = false,
  name,
}, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState < Array < string >>([]);

  /**
  * close current component when click was on outer component
  */
  const selectReference = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectReference, () => setIsOpen(false));

  /**
  * controls from keyboard
  */
  const [customTabIndex, setCustomTabIndex] = useState<number | null>(null);
  const optionReference = useRef<HTMLButtonElement>(null);
  const ArrowDown = useKeyPress('ArrowDown');
  const ArrowUp = useKeyPress('ArrowUp');
  const Escape = useKeyPress('Escape');
  const Tab = useKeyPress('Tab');

  useEffect(() => {
    if (Tab) {
      setCustomTabIndex(null);
      return;
    }

    if (!Array.isArray(items) || !isOpen) return;

    if (Escape) {
      setIsOpen(false);
      return;
    }

    if (ArrowDown) {
      setCustomTabIndex((previous) => {
        let copyS = previous;
        if (copyS === null) {
          copyS = 0;
          return copyS;
        }
        if (copyS >= 0 && copyS < items.length - 1) {
          copyS += 1;
          return copyS;
        }

        return previous;
      });
    }

    if (ArrowUp) {
      setCustomTabIndex((previous) => (previous ? previous - 1 : 0));
    }
  }, [ArrowDown, ArrowUp, Escape, Tab, items, isOpen]);

  useEffect(() => {
    if (optionReference && optionReference.current) {
      optionReference.current.focus();
    }
  }, [customTabIndex]);

  const selectKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  /**
  * calculation the selected items
  */
  const onSelectOptionItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
    event.preventDefault();

    if (!selectedItems.some((current) => current === item)) {
      if (!multiSelect) {
        setSelectedItems([item]);
        setIsOpen(false);
      } else if (multiSelect) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      let filterDeletedItem = selectedItems;
      filterDeletedItem = filterDeletedItem.filter(
        (current) => current !== item,
      );
      setSelectedItems([...filterDeletedItem]);
    }
  };

  const isItemSelected = (item: string) => {
    if (selectedItems.some((current) => current === item)) {
      return true;
    }
    return false;
  };

  /**
  * Adding dynamic classes
  */
  const classesHeader = classNames(
    styles.SelectHeader,
    { [styles.SelectHeaderActive]: isOpen },
    { [styles.SelectDisabled]: disabled },
  );

  const classesListItem = classNames(
    styles.SelectListItem,
    { [styles.SelectListItemDefault]: !multiSelect },
  );

  const showItesmStyles = size ? { height: `${size * 40 + 20}px`, overflow: 'scroll' } : {};

  if (disabled) {
    return (
      <div className={styles.Select}>
        <div className={classesHeader}>
          {placeholder}
          <DropDownIcon />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.Select} ref={selectReference}>
        <div
          tabIndex={0}
          role='button'
          onKeyPress={(event: KeyboardEvent<HTMLDivElement>) => selectKeyPressHandler(event)}
          onClick={() => setIsOpen(!isOpen)}
          className={classesHeader}
        >
          {Array.isArray(selectedItems) && selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
          <DropDownIcon />
        </div>

        {isOpen && (
        <div
          className={styles.SelectList}
          role='listbox'
          style={showItesmStyles}
        >
          {Array.isArray(items) && items.map((item, i) => {
            const activeItem = !multiSelect && selectedItems[0] === item
              ? styles.SelectListItemDefaultSelected : '';

            return (
              <button
                ref={customTabIndex === i ? optionReference : null}
                className={`${classesListItem} ${activeItem}`}
                key={item}
                role='option'
                aria-selected='true'
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSelectOptionItem(event, item)}
                tabIndex={-1}
                data-index={i}
              >
                {multiSelect && (isItemSelected(item) ? <CheckboxIcon isActive /> : <CheckboxIcon />)}
                {item}
              </button>
            );
          })}
        </div>
        )}
      </div>

      <select className={styles.SelectOrigin} name={name} ref={ref}>
        <option value={selectedItems}>{selectedItems.join(',')}</option>
      </select>
    </>

  );
});

export default Select;
