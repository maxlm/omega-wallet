import { FC, ReactElement, ReactNode } from 'react';

interface MatchProps {
  children?: ReactNode;
  when: string | number;
}

interface DefaultProps {
  children?: ReactNode;
  when?: never;
}

interface SwitchComponentProps {
  condition: undefined | string | number;
  children?: ReactElement<MatchProps | DefaultProps> | ReactElement<MatchProps | DefaultProps>[];
}

interface SwitchComponentType extends FC<SwitchComponentProps> {
  Match: FC<MatchProps>;
  Default: FC<DefaultProps>;
}

export const Switch: SwitchComponentType = ({ condition, children }) => {
  if (!children) {
    return null;
  }

  const arrayOfChildren = Array.isArray(children) ? children : [children];
  const cases = arrayOfChildren.filter(child => child.props.when == condition);
  const defaultCases = arrayOfChildren.filter(child => !child.props.when);
  if (defaultCases.length > 1) {
    throw new Error('Only one <Switch.Default> is allowed');
  }
  const defaultCase = defaultCases[0];

  return cases.length > 0 ? <>{cases}</> : <>{defaultCase}</>;
};

Switch.Match = ({ children }) => {
  return <>{children}</>;
};

Switch.Default = ({ children }) => {
  return <>{children}</>;
};
