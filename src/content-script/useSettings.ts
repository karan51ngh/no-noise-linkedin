import { useCallback, useEffect, useState } from 'react';
import { DEFAULTS, Settings, StorageArea } from './constants';

async function getAll(area: StorageArea, defaults: Settings): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage[area].get(defaults as unknown as Record<string, unknown>, (items) => {
      resolve({ ...defaults, ...(items as Settings) });
    });
  });
}

async function setPartial(area: StorageArea, partial: Partial<Settings>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage[area].set(partial as Record<string, unknown>, () => resolve());
  });
}

export function useSettings(options?: { area?: StorageArea; defaults?: Settings }) {
  const area: StorageArea = options?.area ?? 'sync';
  const defaults: Settings = options?.defaults ?? DEFAULTS;

  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    getAll(area, defaults).then(setSettings);

    const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
      if (areaName !== area) return;

      const updated: Partial<Settings> = {};
      for (const key of Object.keys(changes)) {
        if (key in defaults) {
          const change = changes[key];
          if (change && 'newValue' in change) {
            (updated as any)[key] = (change as any).newValue;
          }
        }
      }

      if (Object.keys(updated).length > 0) {
        setSettings((prev) => ({ ...prev, ...updated }));
      }
    };

    chrome.storage.onChanged.addListener(onChanged);
    return () => {
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, [area, defaults]);

  const save = useCallback(async (partial: Partial<Settings>) => {
    await setPartial(area, partial);
  }, [area]);

  const setSetting = useCallback(async (key: keyof Settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    await setPartial(area, { [key]: value });
  }, [area]);

  return { settings, save, setSetting, area, defaults };
}

export async function logAllChromeStorage(): Promise<void> {
  const getAllArea = (area: StorageArea) =>
    new Promise<any>((resolve) => {
      chrome.storage[area].get(null, (items: any) => resolve(items));
    });

  const [localData, syncData] = await Promise.all([
    getAllArea('local'),
    getAllArea('sync'),
  ]);

  console.log('No-Noise-LinkedIn: chrome.storage.local ->', localData);
  console.log('No-Noise-LinkedIn: chrome.storage.sync ->', syncData);
}