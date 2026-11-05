import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/global.css';
import { media } from '@/styles/media';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
});
export const logo = style({
  width: 120,
  height: 'auto',
  '@media': { [media.mobile]: { width: 80 } },
});
export const actions = style({
  display: 'flex',
  gap: 8,
  '@media': { [media.mobile]: { gap: 4 } },
});
export const action = style({
  selectors: {
    '&&': {
      width: 90,
      height: 40,
      minHeight: 40,
      padding: '0 12px',
      borderRadius: 12,
      fontSize: 16,
      lineHeight: 'normal',
    },
  },
  '@media': {
    [media.mobile]: {
      selectors: {
        '&&': { height: 32, minHeight: 32, borderRadius: 10, fontSize: 14 },
      },
    },
  },
});
export const save = style({
  selectors: { '&&': { borderColor: vars.color.brand.dark } },
  '@media': { [media.mobile]: { selectors: { '&&': { width: 80 } } } },
});
export const exit = style({
  selectors: {
    '&&': { width: 95, gap: 5, color: '#F24744', backgroundColor: '#FFE7E7' },
    '&&:hover': { backgroundColor: '#FFDADA' },
  },
  '@media': {
    [media.mobile]: { selectors: { '&&': { width: 36, padding: 0 } } },
  },
});
export const exitText = style({
  '@media': { [media.mobile]: { display: 'none' } },
});
export const exitIcon = style({
  width: 24,
  height: 24,
  '@media': { [media.mobile]: { width: 16, height: 16 } },
});
export const modal = style({
  width: 327,
  padding: 24,
  border: 0,
  borderRadius: 12,
  gap: 20,
  textAlign: 'center',
});
export const modalTitle = style({ fontSize: 18, fontWeight: 600 });
export const modalDescription = style({
  fontSize: 14,
  color: vars.color.gray[500],
});
export const modalActions = style({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
});
