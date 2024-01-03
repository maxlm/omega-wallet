import React from 'react';
import clsx from 'clsx';

export interface EyeOpenIconProps {
  className?: string;
}
export const EyeOpenIcon = (props: EyeOpenIconProps) => {
  const { className } = props;
  return (
    <svg className={clsx('eye-icon eye-open-icon', className)} viewBox="0 0 20 17" fill="none">
      <g clip-path="url(#clip0)">
        <path
          className="fg"
          d="M7.9998 14C15.7998 15.2 19.1998 8.6 19.1998 8.6C19.1998 8.6 17.0998 6.3 15.9998 5.7C14.0998 4.6 11.0998 3 7.2998 4.2C3.3998 5.4 0.799805 9.3 0.799805 9.3C0.799805 9.3 1.7998 11 3.4998 12.2C5.2998 13.7 7.9998 14 7.9998 14Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="fg"
          d="M9.8998 11.7C11.3357 11.7 12.4998 10.5359 12.4998 9.1C12.4998 7.66406 11.3357 6.5 9.8998 6.5C8.46386 6.5 7.2998 7.66406 7.2998 9.1C7.2998 10.5359 8.46386 11.7 9.8998 11.7Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="19.9" height="11.9" fill="white" transform="translate(0 3)" />
        </clipPath>
      </defs>
    </svg>
  );
};
