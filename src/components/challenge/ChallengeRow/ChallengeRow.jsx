import clsx from 'clsx';
import * as styles from './ChallengeRow.css';

export default function ChallengeRow({
  as: Tag = 'div',
  className,
  children,
  ...rest
}) {
  return (
    <Tag className={clsx(styles.row, className)} {...rest}>
      {children}
    </Tag>
  );
}
