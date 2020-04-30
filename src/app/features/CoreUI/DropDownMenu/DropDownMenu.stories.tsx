import React from 'react';

import DropDownMenu from './DropDownMenu';

export default {
  component: DropDownMenu,
  title: 'DropDownMenu',
};

const items: Array<string> = ['Item-1', 'Item-2', ' Item-4', 'Item-4', 'Item-5', 'Item-6'];

export const normal = () => <DropDownMenu items={items} />;
