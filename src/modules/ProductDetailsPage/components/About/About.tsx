import cn from 'classnames';

import styles from './About.module.scss';
import { Description } from '../../types/Description';
import { pageConfig } from '../../../../config/componentConfig';

interface Props {
  description: Description[];
}

export const About: React.FC<Props> = ({ description }) => {
  const config = pageConfig.ProductPage.About;

  return (
    <div className={styles.about}>
      <div className={styles.section}>
        <h3>{config.title}</h3>

        <div className="divider"></div>
      </div>

      {description.map(section => (
        <div className={styles.section} key={section.title}>
          <h4>{section.title}</h4>

          {section.text.map((paragraph, i) => (
            <p
              className={cn('body-text', styles.paragraph)}
              key={`${section.title}-${i}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
