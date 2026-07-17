import type { ChangeEvent } from 'react';
import { useSettings } from './useSettings';
import type { Settings } from './constants';
// @ts-ignore: allow side-effect CSS import when no typings are provided
import '../style.css';
import Header from './Header';
import Footer from './Footer';
import Switch from './Switch';
import ControlPanelRow from './ControlPanelRow';
import Reload from './Reload';

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
    <div className="nnl-cp">
      <Header
        closePanel={props.closePanel}
        theme={props.userSettings.theme}
        toggleTheme={async () => {
          const newTheme = props.userSettings.theme === 'DARK' ? 'LIGHT' : 'DARK';
          await setSetting('theme', newTheme);
        }}
      />
      <div className="nnl-cp-section" data-title="LinkedIn Feed">
        <ControlPanelRow
          primaryText={<span>Disable <strong>Promoted</strong> Posts</span>}
          // secondaryText="Block Promoted posts from your feed."
        >
          <Switch
            id="nnl-promoted"
            name="nnl-promoted"
            checked={props.userSettings.disablePromoted}
            onChange={toggle('disablePromoted')}
          />
        </ControlPanelRow>

        <ControlPanelRow
          primaryText={<span>Disable <strong>Suggested</strong> Posts</span>}
          // secondaryText="Block Suggested posts from your feed."
        >
          <Switch
            id="nnl-suggested"
            name="nnl-suggested"
            checked={props.userSettings.disableSuggested}
            onChange={toggle('disableSuggested')}
          />
        </ControlPanelRow>

        <ControlPanelRow
          primaryText={<span>Disable <strong>From your activity</strong> Posts</span>}
          // secondaryText="Block From your activity posts from your feed."
        >
          <Switch
            id="nnl-from-activity"
            name="nnl-from-activity"
            checked={props.userSettings.disableFromActivity}
            onChange={toggle('disableFromActivity')}
          />
        </ControlPanelRow>

        <ControlPanelRow
          primaryText={<span><strong>Focus Mode:</strong></span>}
          secondaryText="Hide LinkedIn home feed."
        >
          <Switch
            id="nnl-feed"
            name="nnl-feed"
            checked={props.userSettings.disableFeed}
            onChange={toggle('disableFeed')}
          />
        </ControlPanelRow>
        <ControlPanelRow
          primaryText="News, Ad & Puzzles Sections"
          // secondaryText="Remove LinkedIn News & Ad sidebars."
        >
          <Switch
            id="nnl-news"
            name="nnl-news"
            checked={props.userSettings.disableNews}
            onChange={toggle('disableNews')}
          />
        </ControlPanelRow>
      </div>
      <div className="nnl-cp-section" data-title="Troubleshooting">
        <Reload closePanel={props.closePanel} hardRefresh={props.hardRefresh} />
      </div>
      <Footer />
    </div>
  );
}
