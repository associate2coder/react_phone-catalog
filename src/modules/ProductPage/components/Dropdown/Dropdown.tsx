import React, { useCallback, useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import cn from 'classnames';
import { Icon } from '../../../../shared/components/Icon';

interface Props {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<Props> = React.memo(
  ({ title, options, selected, onSelect }) => {
    const [expanded, setExpanded] = useState(false);

    const handleSelection = useCallback(
      (selectedValue: string) => {
        onSelect(selectedValue);
      },
      [onSelect],
    );

    const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setExpanded(current => !current);
    };

    useEffect(() => {
      if (!expanded) {
        return;
      }

      const handleDocumentClick = () => {
        setExpanded(false);
      };

      document.addEventListener('click', handleDocumentClick);

      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, [expanded]);

    return (
      <div className={styles.dropdown}>
        <p className={cn('small-text', styles.label)}>{title}</p>
        <div className={styles.list} onClick={handleDropdownClick}>
          <span>{selected}</span>
          <button
            className={cn(styles.button, {
              [styles.buttonActive]: expanded,
            })}
          >
            <Icon configKey="expand" />
          </button>
        </div>

        {expanded && (
          <div className={styles.listContent}>
            {options.map(option => (
              <div
                key={option}
                className={styles.link}
                hidden={!expanded}
                onClick={() => handleSelection(option)}
              >
                <span className="button-text">{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
