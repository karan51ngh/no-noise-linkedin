import { useState } from 'react';
import { X } from 'lucide-react';

type ControlPanelProps = {
    closePanel: () => void
    hardRefresh: () => void
}

export default function ControlPanel(props: ControlPanelProps) {
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
                <strong style={{ fontSize: 14 }}>No Noise LinkedIn Control panel</strong>
                <button
                    type="button"
                    onClick={props.closePanel}
                    aria-label="Close panel"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',       // Helps center the icon vertically/horizontally
                        alignItems: 'center',
                        padding: 0             // Resets default button padding
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
                        type="checkbox"
                    />
                    <label htmlFor="nnl-subscribe">Disable Promoted Posts</label>
                </div>

                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        id="nnl-suggested"
                        type="checkbox"
                    />
                    <label htmlFor="nnl-subscribe">Disable Suggested Posts</label>
                </div>

                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        id="nnl-news"
                        type="checkbox"
                        title='Disable LinkedIn News Section'
                    />
                    <label htmlFor="nnl-subscribe">Disable LinkedIn News Section</label>
                </div>

                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        id="nnl-news"
                        type="checkbox"
                    />
                    <label htmlFor="nnl-feed">Disable LinkedIn Feed</label>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
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
        </div>

    )
}