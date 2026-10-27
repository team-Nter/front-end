'use client';

import { Button } from '@/components/common/Button';
import { Popover } from '@/components/common/Popover';

export default function PopoverPreview() {
  return (
    <main style={{ padding: 40, display: 'flex', gap: 24 }}>
      <Popover trigger={<Button variant="secondary">필터</Button>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            <input type="checkbox" /> 공식 문서
          </label>
          <label>
            <input type="checkbox" /> 블로그
          </label>
        </div>
      </Popover>
      <Popover trigger={<button type="button">신청 기준 ▾</button>}>
        <p>펼쳐질 내용을 여기에 넣으면 돼요.</p>
      </Popover>
    </main>
  );
}
