import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

// styles
import styles from './styles.module.css';

const Feature = ({ imageUrl, title, description, centered = true, as: Typography = 'h3' }) => {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className={clsx('col', styles.feature, centered && 'text--center')}>
      {imgUrl && <img src={imgUrl} alt={title} />}
      {title && <Typography>{title}</Typography>}
      {description && <p>{description}</p>}
    </div>
  );
};

export default Feature;
