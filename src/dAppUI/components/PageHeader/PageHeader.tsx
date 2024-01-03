import React, { memo, useEffect, ReactNode, useRef } from 'react';
import clsx from 'clsx';

export interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export const PageHeader = memo<PageHeaderProps>(function PageHeader(props) {
  const { title } = props;

  const headerNode = useRef<HTMLHeadingElement>(null);

  return (
    <div className={clsx('page-header', true && 'primary-bg')}>
      <div className={clsx('page-header-wrap')}>
        <div className={clsx('page-header-content')}>
          <div style={{ display: 'flex', fontSize: '20px', fontWeight: '600', letterSpacing: '-2px', color: 'white' }}>
            <span style={{ textTransform: 'uppercase' }}>Ω</span> <span>ω</span>
          </div>
          <h1 tabIndex={-1} ref={headerNode} className={clsx('page-header-text', 'center')}>
            {title}
          </h1>
        </div>
        {props.children}
      </div>
    </div>
  );
});
