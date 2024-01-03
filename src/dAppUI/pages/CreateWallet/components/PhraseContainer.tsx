import { useState, FC } from 'react';
import clsx from 'clsx';

import { delay } from '@root/src/shared/utils';

export type PhraseContainerProps = {
  phrase: string;
};
export const PhraseContainer: FC<PhraseContainerProps> = ({ phrase }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  return (
    <div className="phrase-container">
      <div className="phrase">
        <div className="phrase-buttons">
          <button
            className="btn btn-xs"
            onClick={async () => {
              await window.navigator.clipboard.writeText(phrase);
              setShowCopyMessage(true);
              await delay(1000);
              setShowCopyMessage(false);
            }}>
            Copy
          </button>
          <button
            className="btn btn-xs"
            style={{ width: '50px' }}
            onClick={() => {
              setIsHidden(!isHidden);
            }}>
            {isHidden ? 'Show' : 'Hide'}
          </button>
        </div>
        <div className="text-md phrase-text text-break">{isHidden ? '*'.repeat(phrase.length || 48) : phrase}</div>
      </div>
      <div className={clsx({ visible: showCopyMessage, hidden: !showCopyMessage })}>
        <div className="mb-1 text-sm text-weight-lg">Mnemonic phrase copied to clipboard</div>
      </div>
    </div>
  );
};
