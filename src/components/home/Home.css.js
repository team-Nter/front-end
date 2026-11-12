import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css.js';
import { media } from '@/styles/media';

const color = {
  page: '#F5F5F5',
  title: '#000000',
  desc: '#676767',
  dark: vars.color.gray[800],
  white: vars.color.brand.white,
  line: vars.color.gray[300],
};

const dashed = `1px dashed ${color.line}`;

export const main = style({
  backgroundColor: color.page,
  overflowX: 'clip',
});

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
  gap: 16,
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
    marginTop: 10,
    paddingInline: 16,
    border: `1px solid ${color.dark}`,
    borderRadius: 12,
    backgroundColor: color.white,
    color: color.dark,
    '@media': {
      [media.mobile]: {
        height: 32,
        marginTop: 13,
        borderRadius: 10,
        fontSize: 14,
      },
    },
  },
]);

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

export const featureRow1 = style([
  featureRow,
  {
    paddingTop: 89,
    paddingBottom: 7,
    borderBottom: dashed,
    '@media': {
      [media.tablet]: {
        paddingTop: 46,
        paddingBottom: 34,
        rowGap: 31,
      },
      [media.mobile]: {
        paddingTop: 38,
        paddingBottom: 7,
        rowGap: 22,
      },
    },
  },
]);

export const featureRow2 = style([
  featureRow,
  {
    paddingTop: 9,
    paddingBottom: 9,
    borderBottom: dashed,
    '@media': {
      [media.tablet]: {
        paddingTop: 62,
        paddingBottom: 18,
        rowGap: 16,
      },
      [media.mobile]: {
        paddingTop: 33,
        paddingBottom: 6,
        rowGap: 12,
      },
    },
  },
]);

export const featureRow3 = style([
  featureRow,
  {
    paddingTop: 42,
    '@media': {
      [media.tablet]: {
        paddingTop: 62,
        rowGap: 36,
      },
      [media.mobile]: {
        paddingTop: 48,
        rowGap: 35,
      },
    },
  },
]);

export const featureText = style({
  flexShrink: 0,
  width: 309,
  '@media': {
    [media.tablet]: {
      marginLeft: 50,
    },
    [media.mobile]: {
      marginLeft: 5,
      maxWidth: 'calc(100% - 5px)',
    },
  },
});

export const featureTextLow = style([
  featureText,
  {
    marginTop: 32,
    '@media': {
      [media.tablet]: {
        marginTop: 0,
      },
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
  marginTop: 8,
  marginBottom: 12,
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

const imageBase = style({
  display: 'block',
  flexShrink: 0,
  height: 'auto',
  '@media': {
    [media.tablet]: {
      alignSelf: 'center',
    },
    [media.mobile]: {
      width: '100%',
      maxWidth: '100%',
    },
  },
});

export const image1 = style([
  imageBase,
  {
    width: 570,
  },
]);

export const image2 = style([
  imageBase,
  {
    width: 570,
  },
]);

export const image3 = style([
  imageBase,
  {
    width: 505,
    marginTop: 32,
    marginRight: 30,
    borderRadius: 14.25,
    '@media': {
      [media.tablet]: {
        marginTop: 0,
        marginRight: 0,
      },
    },
  },
]);

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
