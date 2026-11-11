'use client';

import Image from 'next/image';
import Link from 'next/link';
import menuIcon from '@/assets/icons/menu.svg';
import { Popover } from '@/components/common/Popover';
import * as styles from './SubmissionMenu.css';

export default function SubmissionMenu({ submissionId, onDelete, isDeleting }) {
  return (
    <Popover
      align="right"
      className={styles.panel}
      trigger={
        <button
          type="button"
          className={styles.trigger}
          aria-label="작성물 수정 및 삭제 메뉴"
        >
          <Image src={menuIcon} alt="" width={24} height={24} />
        </button>
      }
    >
      {({ close }) => (
        <>
          <Link
            href={`/submissions/${submissionId}/edit`}
            className={styles.item}
            onClick={close}
          >
            수정하기
          </Link>

          <button
            type="button"
            className={styles.deleteItem}
            onClick={() => {
              close();
              onDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? '삭제 중...' : '삭제하기'}
          </button>
        </>
      )}
    </Popover>
  );
}
