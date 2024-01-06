import React, { memo, useState } from 'react';
import cx from 'clsx';

import { EyeCrossedIcon } from '../icons/EyeCrossedIcon';
import { EyeOpenIcon } from '../icons/EyeOpenIcon';

export interface TextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string | null;
  label: string;
  inputRef?: any;
  inputClassName?: string;
}
export const PasswordInput = memo<TextInputProps>(function PasswordInput(props) {
  const { label, error, inputRef, className, inputClassName, required, ...inputProps } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control">
      <label>{label}</label>
      <div className={cx('password-input-wrapper', className)}>
        <input
          {...inputRef}
          aria-required={required ? 'true' : 'false'}
          {...inputProps}
          className={cx('password-input', inputClassName, error ? 'error' : null)}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
        />
        <button
          className="show-password btn"
          type="button"
          aria-label={`press to ${showPassword ? 'hide' : 'show'} password`}
          aria-pressed={showPassword}
          onClick={e => {
            e.preventDefault();

            setShowPassword(!showPassword);
          }}>
          <div>{showPassword ? <EyeOpenIcon /> : <EyeCrossedIcon />}</div>
        </button>
      </div>
      <div className={cx('error-message', Boolean(error) && 'visible', !Boolean(error) && 'hidden')}>{error}</div>
    </div>
  );
});
