import { useEffect, useState } from 'react';
import { initPurger } from '../../content-script';
import ControlPanel from './ControlPanel'
const icon48 = chrome.runtime.getURL('images/icon-48.png');


export default function App() {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    console.log("No-Noise-LinkedIn: React is injected and running");
    initPurger();
  }, []);

  useEffect(() => {
    let prev = location.href;

    const onChange = () => {
      const current = location.href;
      if (getFirstPathSegment(current) !== getFirstPathSegment(prev)) {
        console.log("No-Noise-LinkedIn: URL changed", { from: prev, to: current });
        reloadExtension();
        prev = current;
      }
    };

    const intervalId = window.setInterval(onChange, 500);
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  function getFirstPathSegment(urlString: string): string | null {
    try {
      const url = new URL(urlString);
      const segments = url.pathname.split('/').filter(segment => segment.length > 0);
      return segments.length > 0 ? segments[0] : null;
    } catch (error) {
      console.error("Invalid URL provided");
      return null;
    }
  }

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
          <img src={icon48} alt="No Noise LinkedIn Control panel" width={48} height={48} style={{ display: 'block' }} />
        </button>
      </div>
      {showPanel && (
        <ControlPanel closePanel={() => { setShowPanel(false) }} />
      )}
    </div>
  );
}
