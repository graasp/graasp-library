import type { Meta, StoryObj } from '@storybook/react-vite';

import { PRIMARY_COLOR } from '../theme.js';
import { CCSharing } from '../types.js';
import { CreativeCommonsComponent } from './CreativeCommons.js';

const TABLE_CATEGORY_LICENSE = 'License';
const TABLE_CATEGORY_APPEARANCE = 'Appearance';

const meta: Meta<typeof CreativeCommonsComponent> = {
  title: 'Common/CreativeCommons',
  component: CreativeCommonsComponent,

  argTypes: {
    requireAccreditation: {
      name: 'Require Accreditation',
      defaultValue: true,
      table: { category: TABLE_CATEGORY_LICENSE },
    },
    allowSharedAdaptation: {
      name: 'Allow Shared Adaptation',
      options: Object.keys(CCSharing).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(CCSharing).map((x) => x.toLowerCase()),
      },
      if: { arg: 'requireAccreditation', truthy: true },
      table: { category: TABLE_CATEGORY_LICENSE },
    },
    allowCommercialUse: {
      name: 'Allow Commercial Use',
      if: { arg: 'requireAccreditation', truthy: true },
      table: { category: TABLE_CATEGORY_LICENSE },
    },

    textColor: {
      name: 'Text Color',
      defaultValue: PRIMARY_COLOR,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    iconSize: {
      name: 'Icon Size',
      defaultValue: 64,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    withLicenseName: {
      name: 'Show License Name',
      defaultValue: true,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    textSize: {
      name: 'License Text Size',
      defaultValue: 16,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CreativeCommonsComponent>;

export const Example: Story = {
  args: {
    requireAccreditation: true,
    allowCommercialUse: false,
    allowSharedAdaptation: 'yes',
    iconSize: 50,
  },
};

export const CC0: Story = {
  args: {
    requireAccreditation: false,
    allowCommercialUse: true,
    allowSharedAdaptation: 'yes',
    iconSize: 50,
  },
};

export const NoDerivatives: Story = {
  args: {
    requireAccreditation: true,
    allowCommercialUse: true,
    allowSharedAdaptation: 'no',
    iconSize: 50,
  },
};

export const NoncommercialShareAlike: Story = {
  args: {
    requireAccreditation: true,
    allowCommercialUse: false,
    allowSharedAdaptation: 'alike',
    iconSize: 50,
  },
};
