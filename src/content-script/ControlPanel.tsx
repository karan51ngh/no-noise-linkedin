import type { ChangeEvent } from 'react';
import { X, Github, Linkedin, Twitter, Instagram, Chrome, Mail, Star, Heart } from 'lucide-react';
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
        background: 'rgba(255, 255, 255, 0.95)',
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
        <div className="nnl-cp-section" style={{ paddingTop: 8 }}>
          <div className="nnl-cp-desc" style={{ padding: '0 4px 6px' }}>LinkedIn Feed</div>
          <label className="nnl-cp-row">
            <span className="nnl-cp-text">
              <span className="nnl-cp-label">Disable Promoted Posts</span>
              <span className="nnl-cp-desc">Hide ads and sponsored content in your feed.</span>
            </span>
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
            <span className="nnl-cp-text">
              <span className="nnl-cp-label">Disable Suggested Posts</span>
              <span className="nnl-cp-desc">Remove Suggested posts like "Because you follow" or "You might like".</span>
            </span>
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
            <span className="nnl-cp-text">
              <span className="nnl-cp-label">Disable LinkedIn News Section</span>
              <span className="nnl-cp-desc">Hide the right sidebar LinkedIn News module.</span>
            </span>
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
            <span className="nnl-cp-text">
              <span className="nnl-cp-label">Disable LinkedIn Feed</span>
              <span className="nnl-cp-desc">Blank out the home feed for distraction‑free networking.</span>
            </span>
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
        <div className="nnl-cp-section" style={{ paddingTop: 8 }}>
          <div className="nnl-cp-desc" style={{ padding: '0 4px 6px' }}>Troubleshooting</div>
          <div className="nnl-cp-actions">
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
        </div>
      </form>

      <div className="nnl-cp-section" style={{ paddingTop: 16, paddingBottom: 4 }}>
        <div className="nnl-cp-desc" style={{ textAlign: 'center', padding: '0 0 10px', fontSize: '12px' }}>
          Made by <a href="https://github.com/karan51ngh" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>@karan51ngh</a> with <Heart size={12} color="#ec4899" fill="#ec4899" strokeWidth={2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          {/* Project Actions (Pills) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              className="nnl-cp-pill"
              href="https://github.com/karan51ngh/no-noise-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              title="Star this repo on GitHub"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '100px', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}
            >
              <Star size={14} fill="currentColor" strokeWidth={2} />
              <span>Star</span>
            </a>
            <a
              className="nnl-cp-pill"
              href="https://chromewebstore.google.com/detail/nonoise-linkedin/hbcjelfhlljdepmifggbmhnklhmdmldn/reviews"
              target="_blank"
              rel="noopener noreferrer"
              title="Write a review on Chrome Web Store"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '100px', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}
            >
              <Chrome size={14} strokeWidth={2} />
              <span>Review</span>
            </a>
          </div>

          <div style={{ width: '1px', height: '18px', backgroundColor: '#e5e7eb' }}></div>
          <div className="nnl-cp-social" style={{ margin: 0, gap: '10px' }}>
            {[
              { Icon: Twitter, href: 'https://twitter.com/karan5ingh', Title: 'X / Twitter' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/karan51ngh', Title: 'LinkedIn' },
              { Icon: Instagram, href: 'https://www.instagram.com/karan51ngh', Title: 'Instagram' },
              { Icon: Mail, href: 'mailto:karansingh9535@gmail.com', Title: 'Email' },
            ].map(({ Icon, href, Title }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={Title}
                title={Title}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon size={18} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
