import Image from 'next/image';
import nextjsChip from '@/assets/icons/chip-type-nextjs.svg';
import modernjsChip from '@/assets/icons/chip-type-modernjs.svg';
import apiChip from '@/assets/icons/chip-type-api.svg';
import webChip from '@/assets/icons/chip-type-web.svg';
import careerChip from '@/assets/icons/chip-type-career.svg';
import documentChip from '@/assets/icons/chip-category-document.svg';
import blogChip from '@/assets/icons/chip-category-blog.svg';
import pendingChip from '@/assets/icons/chip-status-pending.svg';
import approvedChip from '@/assets/icons/chip-status-fulfilled.svg';
import rejectedChip from '@/assets/icons/chip-status-rejected.svg';
import canceledChip from '@/assets/icons/chip-status-delete.svg';

import {
  CHALLENGE_CATEGORY_OPTIONS,
  CHALLENGE_STATUS_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  getOptionLabel,
} from '@/constants/challenge';

const CHIPS = {
  category: {
    options: CHALLENGE_CATEGORY_OPTIONS,
    images: {
      NEXTJS: nextjsChip,
      MODERN_JS: modernjsChip,
      API: apiChip,
      WEB: webChip,
      CAREER: careerChip,
    },
  },
  documentType: {
    options: DOCUMENT_TYPE_OPTIONS,
    images: {
      OFFICIAL_DOCUMENT: documentChip,
      BLOG: blogChip,
    },
  },
  status: {
    options: CHALLENGE_STATUS_OPTIONS,
    images: {
      PENDING: pendingChip,
      APPROVED: approvedChip,
      REJECTED: rejectedChip,
      CANCELED: canceledChip,
    },
  },
};

export default function ChallengeChip({ kind, value, className }) {
  const chip = CHIPS[kind];
  const src = chip?.images[value];

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={getOptionLabel(chip.options, value)}
      className={className}
    />
  );
}
