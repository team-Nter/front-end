import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

const color = {
  page: '#F5F5F5', // Figma gray/gray100 (global.css.js의 gray[100]과 값이 달라요)
  title: '#000000',
  desc: '#676767',
  dark: vars.color.gray[800], // #262626
  white: vars.color.brand.white,
  line: vars.color.gray[300], // 점선 색 (시안에서 한 번 더 확인해 주세요)
};

const dashed = `1px dashed ${color.line}`;

/* ───────── 페이지 전체 ───────── */
export const main = style({
  backgroundColor: color.page,
  overflowX: 'clip',
});

/* ───────── 버튼 공통 모양 ───────── */
const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  fontSize: 16,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
});

/* ───────── 1. 히어로 ───────── */
export const hero = style({
  width: '100%',
  height: 278,
  backgroundColor: color.dark,
  backgroundImage: "url('/landing-lg.png')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  '@media': {
    [media.tablet]: {
      backgroundImage: "url('/landing-md.png')",
    },
    [media.mobile]: {
      height: 248,
      backgroundImage: "url('/landing-sm.png')",
    },
  },
});

export const heroInner = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 50,
  gap: 16, // 로고 ~ 문구
  textAlign: 'center',
  '@media': {
    [media.mobile]: {
      paddingTop: 48,
      gap: 11,
    },
  },
});

export const heroTitle = style({
  margin: 0,
});

export const logo = style({
  display: 'block',
  width: 126,
  height: 'auto',
});

export const heroText = style({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '36px',
  letterSpacing: 0.39,
  color: color.white,
  '@media': {
    [media.mobile]: {
      fontSize: 20,
      lineHeight: '28px',
    },
  },
});

export const heroButton = style([
  buttonBase,
  {
    height: 40,
    marginTop: 10, // 문구 ~ 버튼 = gap 16 + 10 = 26
    paddingInline: 16,
    border: `1px solid ${color.dark}`,
    borderRadius: 12,
    backgroundColor: color.white,
    color: color.dark,
    '@media': {
      [media.mobile]: {
        height: 32,
        marginTop: 13, // gap 11 + 13 = 24
        borderRadius: 10,
        fontSize: 14,
      },
    },
  },
]);

/* ───────── 2~4. 기능 소개 (한 줄 = row) ───────── */
// desktop: 왼쪽 글 + 오른쪽 이미지 / tablet, mobile: 글 위 + 이미지 아래
const featureRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  width: 'calc(100% - 48px)',
  maxWidth: 991,
  marginInline: 'auto',
  paddingInline: 24,
  columnGap: 24,
  '@media': {
    [media.tablet]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      maxWidth: 607,
      paddingInline: 0,
    },
    [media.mobile]: {
      width: 'calc(100% - 32px)',
    },
  },
});

// 첫 번째 줄: 위 여백 89 / 아래 점선
export const featureRow1 = style([
  featureRow,
  {
    paddingTop: 89,
    paddingBottom: 7,
    borderBottom: dashed,
    '@media': {
      [media.tablet]: { paddingTop: 46, paddingBottom: 34, rowGap: 31 },
      [media.mobile]: { paddingTop: 38, paddingBottom: 7, rowGap: 22 },
    },
  },
]);

// 두 번째 줄: 위아래 점선
export const featureRow2 = style([
  featureRow,
  {
    paddingTop: 9,
    paddingBottom: 9,
    borderBottom: dashed,
    '@media': {
      [media.tablet]: { paddingTop: 62, paddingBottom: 18, rowGap: 16 },
      [media.mobile]: { paddingTop: 33, paddingBottom: 6, rowGap: 12 },
    },
  },
]);

// 세 번째 줄: 아래 점선 없음
export const featureRow3 = style([
  featureRow,
  {
    paddingTop: 42,
    '@media': {
      [media.tablet]: { paddingTop: 62, rowGap: 36 },
      [media.mobile]: { paddingTop: 48, rowGap: 35 },
    },
  },
]);

/* ───────── 글 영역 ───────── */
export const featureText = style({
  flexShrink: 0,
  width: 309,
  '@media': {
    [media.tablet]: {
      marginLeft: 50,
    },
    [media.mobile]: {
      marginLeft: 5,
    },
  },
});

// 두 번째 줄만 desktop에서 글이 이미지보다 32 아래에서 시작
export const featureTextLow = style([
  featureText,
  {
    marginTop: 32,
    '@media': {
      [media.tablet]: { marginTop: 0 },
    },
  },
]);

export const featureIcon = style({
  display: 'block',
  width: 24,
  height: 24,
});

export const featureTitle = style({
  margin: 0,
  marginTop: 8, // 아이콘 ~ 제목
  marginBottom: 12, // 제목 ~ 설명
  fontSize: 24,
  fontWeight: 700,
  lineHeight: '32px',
  letterSpacing: 0.39,
  color: color.title,
  '@media': {
    [media.mobile]: {
      fontSize: 20,
      lineHeight: '28px',
    },
  },
});

export const featureDesc = style({
  margin: 0,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.39,
  color: color.desc,
});

/* ───────── 이미지 ───────── */
// Lg: desktop + tablet 에서 보이는 이미지 / Sm: mobile 에서만 보이는 이미지
const imageLg = style({
  display: 'block',
  flexShrink: 0,
  height: 'auto',
  '@media': {
    [media.tablet]: {
      alignSelf: 'center',
    },
    [media.mobile]: {
      display: 'none',
    },
  },
});

const imageSm = style({
  display: 'none',
  height: 'auto',
  '@media': {
    [media.mobile]: {
      display: 'block',
      alignSelf: 'center',
    },
  },
});

export const image1Lg = style([imageLg, { width: 570 }]);
export const image2Lg = style([imageLg, { width: 570 }]);
export const image3Lg = style([
  imageLg,
  {
    width: 505,
    marginTop: 32, // 글보다 32 아래에서 시작
    marginRight: 30,
    borderRadius: 14.25,
    '@media': {
      [media.tablet]: { marginTop: 0, marginRight: 0 },
    },
  },
]);

export const image1Sm = style([imageSm, { width: 343, maxWidth: '100%' }]);
// 두 번째 이미지는 화면 가로를 꽉 채워요
export const image2Sm = style([imageSm, { width: 375, maxWidth: '100vw' }]);
export const image3Sm = style([
  imageSm,
  { width: 343, maxWidth: '100%', borderRadius: 9.679 },
]);

/* ───────── 5. 마지막 CTA ───────── */
export const cta = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  paddingTop: 96,
  paddingBottom: 123,
  '@media': {
    [media.tablet]: {
      paddingTop: 66,
      paddingBottom: 135,
    },
    [media.mobile]: {
      gap: 12,
      paddingTop: 53,
      paddingBottom: 89,
    },
  },
});

export const ctaTitle = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '32px',
  letterSpacing: 0.39,
  color: color.title,
});

export const ctaButton = style([
  buttonBase,
  {
    width: 153,
    height: 48,
    borderRadius: 12,
    backgroundColor: color.dark,
    color: color.white,
    '@media': {
      [media.mobile]: {
        width: 120,
        height: 40,
        fontSize: 14,
        fontWeight: 700,
      },
    },
  },
]);
