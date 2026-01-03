import { useEffect, useState } from 'react';
import { initPurger } from '../../content-script';
import  ControlPanel from './ControlPanel'
const icon48 = chrome.runtime.getURL('images/icon-48.png');


export default function App() {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    console.log("No-Noise-LinkedIn: React is injected and running");
    initPurger();
  }, []);

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
        <ControlPanel closePanel={()=>{setShowPanel(false)}}/>
      )}
    </div>
  );
}
