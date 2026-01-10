import type { ChangeEvent } from 'react';
import { X, Github, Linkedin, Twitter } from 'lucide-react';
import { useSettings } from './useSettings';
import type { Settings } from './constants';

type ControlPanelProps = {
  closePanel: () => void;
  hardRefresh: () => void;
};

export default function ControlPanel(props: ControlPanelProps) {
  const { settings, setSetting } = useSettings();

  const toggle =
    (key: keyof Settings) => async (e: ChangeEvent<HTMLInputElement>) => {
      await setSetting(key, e.target.checked);
    };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 76,
        left: 32,
        width: 260,
        background: 'white',
        color: '#111',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        padding: 12,
        zIndex: 2147483647,
        pointerEvents: 'auto',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        fontSize: 14
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <strong style={{ fontSize: 18 }}>No Noise LinkedIn - Control Panel</strong>
        <button
          type="button"
          onClick={props.closePanel}
          aria-label="Close panel"
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          <X size={18} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Sample form submit');
        }}
      >
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            id="nnl-promoted"
            name="nnl-promoted"
            type="checkbox"
            checked={settings.disablePromoted}
            onChange={toggle('disablePromoted')}
          />
          <label htmlFor="nnl-promoted">Disable Promoted Posts</label>
        </div>

        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            id="nnl-suggested"
            name="nnl-suggested"
            type="checkbox"
            checked={settings.disableSuggested}
            onChange={toggle('disableSuggested')}
          />
          <label htmlFor="nnl-suggested">Disable Suggested Posts</label>
        </div>

        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            id="nnl-news"
            name="nnl-news"
            type="checkbox"
            title="Disable LinkedIn News Section"
            checked={settings.disableNews}
            onChange={toggle('disableNews')}
          />
          <label htmlFor="nnl-news">Disable LinkedIn News Section</label>
        </div>

        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            id="nnl-feed"
            name="nnl-feed"
            type="checkbox"
            checked={settings.disableFeed}
            onChange={toggle('disableFeed')}
          />
          <label htmlFor="nnl-feed">Disable LinkedIn Feed</label>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, borderTop: '1px solid #eee', paddingTop: 10 }}>
          <button
            type="button"
            onClick={() => {
              props.hardRefresh()
              props.closePanel()
            }}
            style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #ddd', background: '#f3f4f6', cursor: 'pointer' }}
          >
            Hard Reload.
          </button>
        </div>
      </form>

      <div style={{
        marginTop: 10, borderTop: '1px solid #eee', paddingTop: 10, display: 'flex', flexDirection: 'row', gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 10px', border: '1px solid #eee', borderRadius: 6, textDecoration: 'none', color: '#111', backgroundColor: 'black'
      }}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', color: 'white' }}
        >
          <Github size={28} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', color: 'white' }}
        >
          <Linkedin size={28} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', color: 'white' }}
        >
          <Twitter size={28} />
        </a>
      </div>
    </div>

  )
}