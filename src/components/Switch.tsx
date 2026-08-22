import type { ChangeEventHandler } from 'react';

type SwitchProps = {
    id: string;
    name?: string;
    checked: boolean;
    disabled?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Switch({ id, name, checked, disabled, onChange }: SwitchProps) {
    return (
        <>
            <input
                id={id}
                name={name || id}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
                <span className="nnl-cp-knob" />
            </span>
        </>
    );
}
