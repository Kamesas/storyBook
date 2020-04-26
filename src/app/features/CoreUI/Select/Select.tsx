import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import DropDownIcon from '../Icons/DropDownIcon';
import CheckboxIcon from '../Icons/CheckboxIcon';
import styles from './Select.module.scss';
import useKeyPress from '../../../../utils/hooks/useKeyPress';

interface SelectProps {
  placeholder: string;
  items?: Array<string>;
  multiSelect?: boolean;
  disabled?: boolean;
}
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role

const Select: React.FC<SelectProps> = ({ placeholder, items, multiSelect = false, disabled = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState < Array < string >>([]);

  const closeSelectHandlerWhenOnBlur = (event: MouseEvent) => {
    if (!(event.target as HTMLDivElement).dataset.select) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSelectHandlerWhenOnBlur);
    return () => document.removeEventListener('click', closeSelectHandlerWhenOnBlur);
  }, []);

  // keys

  const [t, setT] = useState<number | null>(null);
  const optionReference = useRef<HTMLButtonElement>(null);
  const ArrowDown = useKeyPress('ArrowDown');
  const ArrowUp = useKeyPress('ArrowUp');
  const Escape = useKeyPress('Escape');
  const Tab = useKeyPress('Tab');
  useEffect(() => {
    if (Escape) {
      setIsOpen(false);
      return;
    }

    if (Tab) {
      setT(null);
      return;
    }

    if (!Array.isArray(items)) return;

    if (ArrowDown) {
      setT((previous) => {
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
      setT((previous) => (previous ? previous - 1 : 0));
    }
  }, [ArrowDown, ArrowUp, Escape, Tab]);

  useEffect(() => {
    if (optionReference && optionReference.current) {
      optionReference.current.focus();
    }
  }, [t]);

  // keys

  const onClickHandler = (item: string) => {
    if (!selectedItems.some((current) => current === item)) {
      if (!multiSelect) {
        setSelectedItems([item]);
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

  const classesHeader = classNames(
    styles.SelectHeader,
    { [styles.SelectHeaderActive]: isOpen },
    { [styles.SelectDisabled]: disabled },
  );

  const classesListItem = classNames(
    styles.SelectHeaderListItem,
    { [styles.SelectHeaderListItemDefault]: !multiSelect },
  );

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
    <div className={styles.Select} data-select>
      <div
        tabIndex={0}
        role='button'
        onKeyPress={() => setIsOpen(!isOpen)}
        onClick={() => setIsOpen(!isOpen)}
        className={classesHeader}
        data-select
      >
        {Array.isArray(selectedItems) && selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
        <DropDownIcon />
      </div>

      {isOpen && (
        <div className={styles.SelectHeaderList} data-select>
          {Array.isArray(items) && items.map((item, i) => {
            const activeItem = !multiSelect && selectedItems[0] === item
              ? styles.SelectHeaderListItemDefaultSelected : '';

            return (
              <button
                ref={t === i ? optionReference : null}
                className={`${classesListItem} ${activeItem}`}
                key={item}
                role='option'
                aria-selected='true'
                onClick={() => onClickHandler(item)}
                tabIndex={-1}
                data-index={i}
                data-select
              >
                {multiSelect && (isItemSelected(item) ? <CheckboxIcon isActive /> : <CheckboxIcon />)}
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>

  );
};

export default Select;
