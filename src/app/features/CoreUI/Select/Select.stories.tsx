import React from 'react';
// import { action } from '@storybook/addon-actions';

import Select from './Select';

export default {
  component: Select,
  title: 'Select',
};

const items: Array<string> = ['Label', 'Dublicate', ' Delete'];

export const normal = () => <Select placeholder='Selct title' items={items} />;
export const multiselect = () => <Select placeholder='Selct title' items={items} multiSelect />;
export const disabled = () => <Select placeholder='Selct title' disabled />;
