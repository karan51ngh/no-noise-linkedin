export type Settings = {
  disablePromoted: boolean;
  disableSuggested: boolean;
  disableNews: boolean;
  disableFeed: boolean;
};

export const DEFAULTS: Settings = {
  disablePromoted: true,
  disableSuggested: true,
  disableNews: true,
  disableFeed: false,
};

export type StorageArea = 'sync' | 'local';
