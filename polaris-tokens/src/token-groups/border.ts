import type {Experimental, MetadataProperties} from '../types';

type BorderRadiusScaleExperimental = Experimental<'0' | '1_5'>;

export type BorderRadiusScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'full'
  | BorderRadiusScaleExperimental;

type BorderWidthScaleExperimental = Experimental<'1' | '2'>;

export type BorderWidthScale =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | BorderWidthScaleExperimental;

export type BorderTokenName =
  | `border-radius-${BorderRadiusScale}`
  | `border-width-${BorderWidthScale}`;

export type BorderTokenGroup = {
  [TokenName in BorderTokenName]: string;
};

export const border: {
  [TokenName in BorderTokenName]: MetadataProperties;
} = {
  'border-radius-0-experimental': {
    value: '0px',
  },
  'border-radius-05': {
    value: '2px',
  },
  'border-radius-1': {
    value: '4px',
  },
  'border-radius-2': {
    value: '8px',
  },
  'border-radius-3': {
    value: '12px',
  },
  'border-radius-4': {
    value: '16px',
  },
  'border-radius-5': {
    value: '20px',
  },
  'border-radius-6': {
    value: '30px',
  },
  'border-radius-full': {
    value: '9999px',
  },
  'border-radius-1_5-experimental': {
    value: '6px',
  },
  'border-width-1': {
    value: '1px',
  },
  'border-width-2': {
    value: '2px',
  },
  'border-width-3': {
    value: '3px',
  },
  'border-width-4': {
    value: '4px',
  },
  'border-width-5': {
    value: '5px',
  },
  'border-width-1-experimental': {
    value: '0.66px',
  },
  'border-width-2-experimental': {
    value: '1px',
  },
};
