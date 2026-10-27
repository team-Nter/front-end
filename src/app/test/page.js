'use client';

import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Pagination } from '@/components/common/Pagination';
import { Popover } from '@/components/common/Popover';
import { Textarea } from '@/components/common/Textarea';
import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <main>독스루 랜딩 페이지</main>
      <Button>안녕</Button>
      <Input type="email" placeholder="이메일을 입력하세요" />
      <Textarea rows={6} placeholder="내용을 입력해주세요" maxLength={1000} />
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
      <Pagination
        currentPage={currentPage}
        totalPage={10}
        pageSize={5}
        onPageChange={onPageChange}
      />
    </div>
  );
}
