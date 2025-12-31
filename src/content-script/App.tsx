import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    console.log("No-Noise-LinkedIn: React is injected and running");
  }, []);

  return (
    <div
      style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 2147483647, pointerEvents: 'none' }}
    >
      <div>
        Hello Friend.
      </div>
    </div>
  );
}
