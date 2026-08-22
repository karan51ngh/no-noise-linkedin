export type Settings = {
  disablePromoted: boolean;
  disableSuggested: boolean;
  disableFromActivity: boolean;
  disableImages: boolean;
  disableNews: boolean;
  disableFeed: boolean;
  theme: 'LIGHT' | 'DARK';
};

export const DEFAULTS: Settings = {
  disablePromoted: true,
  disableSuggested: true,
  disableFromActivity: true,
  disableImages: false,
  disableNews: true,
  disableFeed: false,
  theme: 'LIGHT',
};

export type StorageArea = 'sync' | 'local';
