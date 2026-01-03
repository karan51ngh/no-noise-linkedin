import { useState } from 'react';

type ControlPanelProps = {
    closePanel: () => void
}

export default function ControlPanel(props: ControlPanelProps) {
    const [name, setName] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    console.log(props)
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 60,
                left: 20,
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
                <strong style={{ fontSize: 14 }}>Control Panel</strong>
                <button
                    type="button"
                    onClick={props.closePanel}
                    aria-label="Close panel"
                    style={{ border: 'none', background: 'transparent', fontSize: 18, lineHeight: 1, cursor: 'pointer' }}
                >
                    ×
                </button>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Sample form submit', { name, subscribe });
                }}
            >
                <div style={{ marginBottom: 8 }}>
                    <label htmlFor="nnl-name" style={{ display: 'block', marginBottom: 4 }}>Name</label>
                    <input
                        id="nnl-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name"
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '6px 8px',
                            border: '1px solid #ccc',
                            borderRadius: 4
                        }}
                    />
                </div>

                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        id="nnl-subscribe"
                        type="checkbox"
                        checked={subscribe}
                        onChange={(e) => setSubscribe(e.target.checked)}
                    />
                    <label htmlFor="nnl-subscribe">Enable sample option</label>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={props.closePanel}
                        style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #ddd', background: '#f3f4f6', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #2563eb', background: '#3b82f6', color: 'white', cursor: 'pointer' }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    )
}