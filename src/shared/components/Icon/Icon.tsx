import React, { useCallback } from 'react';
import { icons } from './iconConfig';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  configKey: string;
  inactive?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

export const Icon: React.FC<Props> = React.memo(
  ({ configKey, inactive = false, hidden = false, selected = false }) => {
    const config = icons[configKey] || icons.empty;

    const theme = useAppSelector(state => state.theme);

    const resolvePath = useCallback(
      (file: string = config.base) => {
        return `icons/${theme}/${file}`;
      },
      [config.base, theme],
    );

    const getSrc = useCallback(() => {
      if (inactive) {
        return resolvePath(config.inactive);
      }

      if (selected) {
        return resolvePath(config.selected);
      }

      return resolvePath(config.base);
    }, [
      config.base,
      config.inactive,
      config.selected,
      inactive,
      resolvePath,
      selected,
    ]);

    return (
      <>
        <img src={getSrc()} alt={config.alt} hidden={hidden} className="icon" />
      </>
    );
  },
);

Icon.displayName = 'Icon';
