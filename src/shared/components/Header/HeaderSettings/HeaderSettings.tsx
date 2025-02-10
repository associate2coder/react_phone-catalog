import cn from 'classnames';
import styles from './HeaderSettings.module.scss';
import { Modal } from '../../Modal';
import { Theme } from '../../../types/Theme';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { set as setTheme } from '../../../../store/themeSlice';
import { HeaderButton } from '../HeaderButton';
import { useEffect, useState } from 'react';

export const HeaderSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.theme);
  const [active, setActive] = useState(false);

  const changeTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  useEffect(() => {
    setTimeout(() => setActive(true), 0);
  }, []);

  return (
    <Modal overlay={false}>
      <div
        className={cn(styles.settings, {
          [styles.settingsActive]: active,
        })}
      >
        <div className={styles.row}>
          {Object.entries(Theme).map(([key, value]) => (
            <HeaderButton
              key={key}
              type={key}
              hasBorder={true}
              selected={currentTheme === value}
              onClick={() => changeTheme(value)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
