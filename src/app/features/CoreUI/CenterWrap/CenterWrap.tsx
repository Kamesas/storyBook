import React from 'react';

import styles from './CenterWrap.module.scss';

interface CenterWrapProps {
  children: React.ReactNode;
}

const CenterWrap: React.FC<CenterWrapProps> = ({ children }) => <div className={styles.CenterWrap}>{children}</div>;

export default CenterWrap;
