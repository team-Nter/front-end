import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

// 팝업 안쪽 (피그마: 필터 제목 / 구역마다 구분선 / 아래 버튼 2개)
export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  width: 320,
  maxWidth: '100%',
  fontSize: 14,
  color: vars.color.gray[800],
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 12,
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const heading = style({
  fontSize: 16,
  fontWeight: 600,
});

export const closeButton = style({
  display: 'inline-flex',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

// 상태 / 정렬 한 묶음
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: '12px 0',
  border: 'none',
  borderBottom: `1px solid ${vars.color.gray[200]}`,
});

export const legend = style({
  float: 'left',
  width: '100%',
  marginBottom: 4,
  padding: 0,
  fontWeight: 600,
});

// 아이콘 + 글자 한 줄
export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
});

// 진짜 input은 눈에 안 보이게 (키보드, 화면 낭독기는 그대로 사용)
export const hiddenInput = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

// 키보드로 이동했을 때 아이콘에 테두리
globalStyle(`${hiddenInput}:focus-visible + img`, {
  outline: `2px solid ${vars.color.gray[800]}`,
  outlineOffset: 2,
  borderRadius: 4,
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingTop: 16,
});
