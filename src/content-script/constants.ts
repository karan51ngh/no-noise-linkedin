export type Settings = {
  disablePromoted: boolean;
  disableSuggested: boolean;
  disableNews: boolean;
  disableFeed: boolean;
};

export const DEFAULTS: Settings = {
  disablePromoted: false,
  disableSuggested: false,
  disableNews: false,
  disableFeed: false,
};

export type StorageArea = 'sync' | 'local';
