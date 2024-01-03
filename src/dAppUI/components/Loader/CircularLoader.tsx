import { memo } from 'react';
import clsx from 'clsx';

export type CircularLoaderProps = {
  size?: number;
  thickness?: number;
  inline?: boolean;
};

export const CircularLoader = memo<CircularLoaderProps>(function CircularLoader(props) {
  const { size: sizeProps, thickness: thicknessProps, inline = true } = props;

  const componentSize = sizeProps || 22;
  const thickness = thicknessProps || 3.6;

  const circleSize = 44;
  const viewBox = `${circleSize / 2} ${circleSize / 2} ${circleSize} ${circleSize}`;

  return (
    <div className={clsx(!inline && 'loader-wrapper')}>
      <div
        className="circular-wrapper"
        role="progressbar"
        aria-busy="true"
        aria-label="loading"
        style={{
          width: componentSize,
          height: componentSize,
          padding: thickness,
        }}>
        <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" className="circular-svg">
          <circle
            className="circle-indeterminate circle"
            cx={circleSize}
            cy={circleSize}
            r={(circleSize - thickness) / 2}
            fill="none"
            strokeWidth={thickness}></circle>
        </svg>
      </div>
    </div>
  );
});
