import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

// 제목 + 오른쪽 메뉴(⋮) 한 줄 (titleAction을 넘길 때만 사용)
export const titleRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12,
});

// ↓ 아래는 ChallengeDetailBody에서 값 그대로 옮겨왔어요.
export const title = style({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  color: vars.color.gray[800],
});

export const chipRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
});

export const chips = style({
  display: 'flex',
  gap: 8,
});

export const actions = style({
  display: 'flex',
  gap: 8,
  flexShrink: 0,
});

export const description = style({
  margin: 0,
  fontSize: 16,
  lineHeight: 1.6,
  color: vars.color.gray[700],
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});
