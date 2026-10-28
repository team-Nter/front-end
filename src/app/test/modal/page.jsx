'use client';

import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Textarea } from '@/components/common/Textarea';
import { useState } from 'react';

export default function ModalPreview() {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');
  const onClick = () => {
    console.log(message);
    setIsOpen(false);
  };

  if (!isOpen) return null;
  return (
    <Modal>
      <h2 style={{ fontSize: 18, lineHeight: '26px' }}>거절 사유</h2>
      <label style={{ display: 'grid', gap: 8 }}>
        내용
        <Textarea
          rows={7}
          placeholder="거절 사유를 입력해주세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          role="dialog"
          aria-modal="true"
        />
      </label>
      <Button fullWidth onClick={onClick}>
        전송
      </Button>
    </Modal>
  );
}
