import { useEffect, useState } from 'react';
import { initPurger } from '../../content-script';
import  ControlPanel from './ControlPanel'


export default function App() {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    console.log("No-Noise-LinkedIn: React is injected and running");
    initPurger();
  }, []);

  return (
    <div
      style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 2147483647, pointerEvents: 'none' }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <button
          onClick={() => {
            setShowPanel((prev) => !prev);
          }}
        >Hello Friend.</button>
      </div>
      {showPanel && (
        <ControlPanel closePanel={()=>{setShowPanel(false)}}/>
      )}
    </div>
  );
}
