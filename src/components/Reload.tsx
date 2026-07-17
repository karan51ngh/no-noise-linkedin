import type { FC } from 'react';

interface ReloadProps {
    closePanel: () => void;
    hardRefresh: () => void;
}

const Reload: FC<ReloadProps> = ({ closePanel, hardRefresh }) => {
    return (
        <div className="nnl-cp-actions">
            <button
                type="button"
                onClick={() => {
                    hardRefresh();
                    closePanel();
                }}
                className="nnl-cp-button"
            >
                Reload
            </button>
            <a
                href="https://github.com/karan51ngh/no-noise-linkedin/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="nnl-cp-button"
            >
                Report issue
            </a>
        </div>
    );
};

export default Reload;
