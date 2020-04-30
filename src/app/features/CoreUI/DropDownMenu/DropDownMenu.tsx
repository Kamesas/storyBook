import React from 'react';

import styles from './DropDownMenu.module.scss';
import BurgerMenuIcon from '../Icons/BurgerMenuIcon';

interface DropDownMenuProps {
  items?: Array<string>;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ items }) => (
  <div className={styles.ddMenu}>
    <input type='checkbox' id='checkboxMenu' className={styles.ddMenuCheckbox} />
    <label className={styles.ddMenuIcon} htmlFor='checkboxMenu'>
      <BurgerMenuIcon />
    </label>

    <ul className={styles.ddMenuList}>
      {Array.isArray(items) && items.map((item) => <li key={item} className={styles.ddMenuListItem}>{item}</li>)}
    </ul>
  </div>
);

export default DropDownMenu;
