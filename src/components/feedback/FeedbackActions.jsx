'use client';

import Image from 'next/image';
import menuIcon from '@/assets/icons/menu.svg';
import * as styles from './Feedback.css';
import { Button } from '@/components/common/Button';
import { Popover } from '@/components/common/Popover';

export default function FeedbackActions({
  onEdit,
  onDelete,
  disabled = false,
}) {
  return (
    <Popover
      align="right"
      className={styles.menuPanel}
      trigger={
        <Button
          variant="ghost"
          className={styles.menuTrigger}
          disabled={disabled}
          aria-label="피드백 관리"
        >
          <Image src={menuIcon} alt="" width={24} height={24} />
        </Button>
      }
    >
      {({ close }) => (
        <div className={styles.menuItems}>
          <Button
            variant="ghost"
            fullWidth
            className={styles.menuItem}
            disabled={disabled}
            onClick={() => {
              close();
              onEdit();
            }}
          >
            수정하기
          </Button>
          <Button
            variant="ghost"
            fullWidth
            className={styles.menuItem}
            disabled={disabled}
            onClick={() => {
              close();
              onDelete();
            }}
          >
            삭제하기
          </Button>
        </div>
      )}
    </Popover>
  );
}
