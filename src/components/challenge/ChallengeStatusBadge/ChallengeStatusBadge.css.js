import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';

// ↓ ChallengeCard에서 값 그대로 옮겨왔어요.
// 위쪽 상태 칩 (피그마: 회색 알약, 13px Medium)
export const badge = style({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  margin: 0,
  padding: '8px 12px',
  borderRadius: 24,
  backgroundColor: vars.color.gray[200],
  color: vars.color.gray[800],
  fontSize: 13,
  fontWeight: 500,
});

// 마감 칩은 검정 바탕 + 흰 글자
export const badgeClosed = style({
  backgroundColor: vars.color.gray[800],
  color: vars.color.brand.white,
});
