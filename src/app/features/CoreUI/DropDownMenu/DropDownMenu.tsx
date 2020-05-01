import React from 'react';

import styles from './DropDownMenu.module.scss';
import BurgerMenuIcon from '../Icons/BurgerMenuIcon';
import CrossIcon from '../Icons/CrossIcon';

interface DropDownMenuProps {
  items?: Array<string>;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ items }) => (
  <div className={styles.ddMenu}>
    <input type='checkbox' id='checkboxMenu' className={styles.ddMenuCheckbox} />
    <label className={styles.ddMenuIcon} htmlFor='checkboxMenu'>
      <span className={styles.ddMenuIconBurger}><BurgerMenuIcon /></span>
      <span className={styles.ddMenuIconClose}><CrossIcon /></span>
    </label>

    <ul className={styles.ddMenuList}>
      {Array.isArray(items) && items.map((item) => <li key={item} className={styles.ddMenuListItem}>{item}</li>)}
    </ul>
  </div>
);

export default DropDownMenu;
