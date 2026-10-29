'use client';

import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Pagination } from '@/components/common/Pagination';
import { Popover } from '@/components/common/Popover';
import { Textarea } from '@/components/common/Textarea';
import { useState } from 'react';

export default function Test() {
  const emailError = '이메일을 입력해주세요.'; // 현재는 테스트용으로 강제로 받게 해둠. 차후 사용할 땐 onChange 사용해서 적용할 것.
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const onFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelected((previous) =>
      checked
        ? [...previous.filter((item) => item !== value), value]
        : previous.filter((item) => item !== value),
    );
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <main>독스루 랜딩 페이지</main>
      <Button>안녕</Button>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        error={emailError}
      />
      <Textarea
        label="내용"
        rows={6}
        placeholder="내용을 입력해주세요"
        maxLength={1000}
      />
      <main style={{ padding: 40, display: 'flex', gap: 24 }}>
        <Popover trigger={<Button variant="secondary">필터</Button>}>
          {({ close }) => (
            <div style={{ display: 'grid', gap: 12 }}>
              <label>
                <input
                  type="checkbox"
                  value="document"
                  checked={selected.includes('document')}
                  onChange={onFilterChange}
                />{' '}
                공식 문서
              </label>
              <label>
                <input
                  type="checkbox"
                  value="blog"
                  checked={selected.includes('blog')}
                  onChange={onFilterChange}
                />{' '}
                블로그
              </label>
              <Button onClick={close}>적용하기</Button>
            </div>
          )}
        </Popover>
        <Popover trigger={<button type="button">신청 기준</button>}>
          <p>펼쳐질 내용을 여기에 넣으면 돼요.</p>
        </Popover>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPage={10}
        groupSize={7}
        onPageChange={onPageChange}
      />
    </div>
  );
}
