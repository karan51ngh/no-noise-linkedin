import { useEffect, useState } from 'react';
import { initPurger } from '../../content-script';
import ControlPanel from './ControlPanel'
import { useSettings } from './useSettings';
import { DEFAULTS, type Settings } from './constants';

const icon32 = chrome.runtime.getURL('images/no-noise-linkedin-logo.svg');

export function getFirstPathSegment(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const segments = url.pathname.split('/').filter(segment => segment.length > 0);
    return segments.length > 0 ? segments[0] : null;
  } catch (error) {
    console.error("Invalid URL provided");
    return null;
  }
}


export default function App() {
  const [showPanel, setShowPanel] = useState(false);
  const [hover, setHover] = useState(false);
  const { area, getAll } = useSettings();
  const [userSettings, setUserSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    updateUserSettings();

    let prev = location.href;

    const onChange = () => {
      const current = location.href;
      if (getFirstPathSegment(current) !== getFirstPathSegment(prev)
        && (getFirstPathSegment(prev) == 'mynetwork' || getFirstPathSegment(prev) == 'jobs')) {
        reloadExtension();
        prev = current;
      }
    };

    const intervalId = window.setInterval(onChange, 500);
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);


    const onStorageChanged = () => {
      updateUserSettings();
    };

    try {
      chrome?.storage?.onChanged?.addListener(onStorageChanged);
    } catch (e) {
      console.log("Chrome API is unavailable")
    }

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);

      try {
        chrome?.storage?.onChanged?.removeListener(onStorageChanged);
      } catch {
        console.log("Chrome API is unavailable")
      }

    };
  }, []);

  useEffect(() => {
    initPurger(userSettings);
  }, [JSON.stringify(userSettings)]);


  const reloadExtension = () => {
    try {
      if (chrome?.runtime?.reload) {
        chrome.runtime.reload();
      } else {
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  const updateUserSettings = () => {
    getAll(area, DEFAULTS)
      .then((data) => {
        setUserSettings(data)
      })
  }

  return (
    <div
      style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 2147483647, pointerEvents: 'auto' }}
    >
      <div>
        <button
          onClick={() => {
            setShowPanel((prev) => !prev);
          }}
          title='No Noise LinkedIn Control panel'
          style={{ background: 'transparent', border: 'none', padding: 0, margin: 0, lineHeight: 0, boxShadow: 'none', cursor: 'pointer', display: 'inline-block' }}
        >
          <img
            src={icon32}
            alt="No Noise LinkedIn Control panel"
            width={32}
            height={32}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: 'block',
              filter: `brightness(${(showPanel ? 70 : 100)}%)`,
              transition: 'filter .2s ease, transform .2s ease',
              transform: hover ? 'translateY(-1px)' : 'translateY(0)'
            }}
          />
        </button>
      </div>
      {showPanel && (
        <ControlPanel closePanel={() => { setShowPanel(false) }} hardRefresh={reloadExtension} userSettings={userSettings} />
      )}
    </div>
  );
}
