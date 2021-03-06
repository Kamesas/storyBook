import React from 'react';
// import { action } from '@storybook/addon-actions';

import Select from './Select';

export default {
  component: Select,
  title: 'CombinedSelect',
};

const items: Array<string> = ['Label', 'Dublicate', ' Delete', 'Item-4', 'Item-5', 'Item-6'];

export const normal = () => <Select placeholder='Selct title' items={items} />;
export const multiSelect = () => <Select placeholder='Selct title' items={items} multiSelect />;
export const normalWithLimitItems = () => <Select placeholder='Selct title' items={items} size={3} />;
export const multiSelectWithLimitItems = () => (
  <Select
    placeholder='Selct title'
    items={items}
    multiSelect
    size={3}
  />
);
export const disabled = () => <Select placeholder='Selct title' disabled />;
