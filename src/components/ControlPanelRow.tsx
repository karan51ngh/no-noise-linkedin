import type { ReactNode } from 'react';

type ControlPanelRowProps = {
    children: ReactNode;
    primaryText: ReactNode;
    secondaryText?: string;
};

export default function ControlPanelRow({
    children,
    primaryText,
    secondaryText,
}: ControlPanelRowProps) {
    return (
        <label className="nnl-cp-row">
            <span className="nnl-cp-text">
                <span className="nnl-cp-label">{primaryText}</span>
                {secondaryText && <span className="nnl-cp-desc">{secondaryText}</span>}
            </span>
            {children}
        </label>
    );
}
