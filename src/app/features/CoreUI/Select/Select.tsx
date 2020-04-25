import React, { useState } from 'react';
import classNames from 'classnames';

import DropDownIcon from '../Icons/DropDownIcon';
import CheckboxIcon from '../Icons/CheckboxIcon';
import styles from './Select.module.scss';

interface SelectProps {
  title: string;
  items?: Array<string>;
  multiSelect?: boolean;
  disabled?: boolean;
}
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role

const Select: React.FC<SelectProps> = ({ title, items, multiSelect = false, disabled = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState < Array < string >>([]);

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
          {title}
          <DropDownIcon />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Select} role='listbox'>
      <div
        tabIndex={0}
        role='button'
        onKeyPress={() => setIsOpen(!isOpen)}
        onClick={() => setIsOpen(!isOpen)}
        className={classesHeader}
      >
        {title}
        <DropDownIcon />
      </div>

      {isOpen && (
        <div className={styles.SelectHeaderList}>
          {Array.isArray(items) && items.map((item) => {
            const activeItem = !multiSelect && selectedItems[0] === item
              ? styles.SelectHeaderListItemDefaultSelected : '';

            return (
              <button
                className={`${classesListItem} ${activeItem}`}
                key={item}
                role='option'
                aria-selected='true'
                type='button'
                onClick={() => onClickHandler(item)}
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
