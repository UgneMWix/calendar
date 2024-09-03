import { Calendar } from './Calendar';
import { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
          <Story />
        </div>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof Calendar>;
export const Default: Story = {
  args: {
    chosenDay: '2024-09-03T12:29:19.153Z',
    openModal: () => {},
    events: [],
  },
  argTypes: {
    chosenDay: {},
    openModal: {
      action: 'openModal',
    },
    events: {
      control: {
        type: 'object',
      },
    },
  },
};
