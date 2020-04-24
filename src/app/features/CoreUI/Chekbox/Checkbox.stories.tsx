import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};


export const normal = () => <Checkbox onChange={action('changed')} label='Checkbox' />;
export const disabled = () => <Checkbox disabled label='Checkbox' />;
export const withoutLabel = () => <Checkbox onChange={action('changed')} />;
