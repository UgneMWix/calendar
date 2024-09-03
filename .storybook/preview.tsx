import type { Preview } from '@storybook/react';
import '../src/stylesheets/reset.css';
import '../src/stylesheets/global.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="root">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
