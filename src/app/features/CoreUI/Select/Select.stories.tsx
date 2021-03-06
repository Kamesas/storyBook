import React from 'react';
// import { action } from '@storybook/addon-actions';

import Select from './Select';

export default {
  component: Select,
  title: 'Select',
};

const items: Array<string> = ['Label', 'Dublicate', ' Delete', 'Item-4', 'Item-5', 'Item-6'];

export const normal = () => <Select placeholder='Selct title' items={items} />;
export const normalWithLimitItems = () => <Select placeholder='Selct title' items={items} size={3} />;
export const disabled = () => <Select placeholder='Selct title' disabled />;
