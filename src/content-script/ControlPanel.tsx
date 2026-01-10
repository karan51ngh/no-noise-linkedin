import type { ChangeEvent } from 'react';
import { X, Github, Linkedin, Twitter } from 'lucide-react';
import { useSettings } from './useSettings';
import type { Settings } from './constants';
import './control-panel.css';

type ControlPanelProps = {
  closePanel: () => void;
  hardRefresh: () => void;
  userSettings: Settings;
};

export default function ControlPanel(props: ControlPanelProps) {
  const { setSetting } = useSettings();

  const toggle =
    (key: keyof Settings) => async (e: ChangeEvent<HTMLInputElement>) => {
      await setSetting(key, e.target.checked);
    };

  return (
    <div
      className="nnl-cp"
      style={{
        position: 'fixed',
        bottom: 76,
        left: 32,
        width: 280,
        background: 'rgba(255,255,255,0.75)',
        color: '#1d1d1f',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 20,
        boxShadow:
          '0 20px 40px rgba(0,0,0,0.20), inset 0 0.5px 0 rgba(255,255,255,0.8)',
        padding: 12,
        zIndex: 2147483647,
        pointerEvents: 'auto',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        letterSpacing: '-0.01em',
        lineHeight: 1.35,
        fontSize: 13,
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >

      <div className="nnl-cp-header">
        <div className="nnl-cp-title">
          <span className="brand">No Noise LinkedIn</span>
          <span className="panel">Control Panel</span>
        </div>
        <button
          type="button"
          onClick={props.closePanel}
          className="nnl-cp-close"
          aria-label="Close panel"
          title="Close"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="nnl-cp-section">
          <label className="nnl-cp-row">
            <span className="nnl-cp-label">Disable Promoted Posts</span>
            <input
              id="nnl-promoted"
              name="nnl-promoted"
              type="checkbox"
              checked={props.userSettings.disablePromoted}
              onChange={toggle('disablePromoted')}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
              <span className="nnl-cp-knob" />
            </span>
          </label>

          <label className="nnl-cp-row">
            <span className="nnl-cp-label">Disable Suggested Posts</span>
            <input
              id="nnl-suggested"
              name="nnl-suggested"
              type="checkbox"
              checked={props.userSettings.disableSuggested}
              onChange={toggle('disableSuggested')}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
              <span className="nnl-cp-knob" />
            </span>
          </label>

          <label className="nnl-cp-row" title="Disable LinkedIn News Section">
            <span className="nnl-cp-label">Disable LinkedIn News Section</span>
            <input
              id="nnl-news"
              name="nnl-news"
              type="checkbox"
              checked={props.userSettings.disableNews}
              onChange={toggle('disableNews')}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
              <span className="nnl-cp-knob" />
            </span>
          </label>

          <label className="nnl-cp-row">
            <span className="nnl-cp-label">Disable LinkedIn Feed</span>
            <input
              id="nnl-feed"
              name="nnl-feed"
              type="checkbox"
              checked={props.userSettings.disableFeed}
              onChange={toggle('disableFeed')}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
              <span className="nnl-cp-knob" />
            </span>
          </label>
        </div>

        <div className="nnl-cp-actions nnl-cp-section" style={{ paddingTop: 8 }}>
          <button
            type="button"
            onClick={() => {
              props.hardRefresh();
              props.closePanel();
            }}
            className="nnl-cp-button"
          >
            Reload
          </button>
        </div>
      </form>

      <div className="nnl-cp-social">
        {[
          { Icon: Github, href: 'https://github.com/karan51ngh' },
          { Icon: Linkedin, href: '#' },
          { Icon: Twitter, href: 'https://twitter.com/karan5ingh' },
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${Icon.displayName || 'social'} link`}
            title="Open link"
          >
            <Icon size={20} strokeWidth={2} />
          </a>
        ))}
      </div>
    </div>
  );
}
