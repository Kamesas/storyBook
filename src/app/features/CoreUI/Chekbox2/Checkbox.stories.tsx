import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox2 from './Checkbox';

export default {
  component: Checkbox2,
  title: 'Checkbox2',
};

export const normal = () => <Checkbox2 onChange={action('changed')} label='Checkbox' />;
export const disabled = () => <Checkbox2 disabled label='Checkbox' />;
export const withoutLabel = () => <Checkbox2 onChange={action('changed')} />;
