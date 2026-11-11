'use client';

import Image from 'next/image.js';
import Link from 'next/link.js';

import logo from '@/assets/images/logo.svg';
import homeImg1 from '@/assets/images/home_img_01.png';
import homeImg2 from '@/assets/images/home_img_02.png';
import homeImg3 from '@/assets/images/home_img_03.png';

import imoji1 from '@/assets/icons/imoji1.svg';
import imoji2 from '@/assets/icons/imoji2.svg';
import imoji3 from '@/assets/icons/imoji3.svg';

import * as styles from './Home.css.js';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn.js';
import { OfflineNotice } from '@/components/auth/commonAuth/AuthCheckNotices.jsx';

export default function HomePage() {
  const { isLoggedIn, isPending, isPaused } = useRedirectIfLoggedIn();
  if (isPending && isPaused) return <OfflineNotice />;
  if (isPending || isLoggedIn) return null;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <Image src={logo} alt="Docthru" className={styles.logo} />
          </h1>

          <p className={styles.heroText}>
            함께 번역하며 성장하는
            <br />
            개발자의 새로운 영어 습관
          </p>

          <Link href="/login" className={styles.heroButton}>
            번역 시작하기
          </Link>
        </div>
      </section>

      <section aria-labelledby="feature-title-1">
        <div className={styles.featureRow1}>
          <div className={styles.featureText}>
            <Image src={imoji1} alt="" className={styles.featureIcon} />
            <h2 id="feature-title-1" className={styles.featureTitle}>
              혼자서는 막막했던 번역,
              <br />
              챌린지로 함께 완성하기
            </h2>
            <p className={styles.featureDesc}>
              중요한 건 꺾이지 않는 마음! 동료들과 함께
              <br />
              기술 문서를 번역해 보세요.
            </p>
          </div>

          <Image src={homeImg1} alt="" className={styles.image1} />
        </div>
      </section>

      <section aria-labelledby="feature-title-2">
        <div className={styles.featureRow2}>
          <div className={styles.featureTextLow}>
            <Image src={imoji2} alt="" className={styles.featureIcon} />
            <h2 id="feature-title-2" className={styles.featureTitle}>
              내가 좋아하는 기술 번역,
              <br />
              내가 필요한 기술 번역
            </h2>
            <p className={styles.featureDesc}>
              이미 진행 중인 번역 챌린지에 참여하거나,
              <br />
              새로운 번역 챌린지를 시작해 보세요.
            </p>
          </div>

          <Image src={homeImg2} alt="" className={styles.image2} />
        </div>
      </section>

      <section aria-labelledby="feature-title-3">
        <div className={styles.featureRow3}>
          <div className={styles.featureText}>
            <Image src={imoji3} alt="" className={styles.featureIcon} />
            <h2 id="feature-title-3" className={styles.featureTitle}>
              피드백으로 함께 성장하기
            </h2>
            <p className={styles.featureDesc}>
              번역 작업물에 대해 피드백을 주고 받으며
              <br />
              영어 실력은 물론, 개발 실력까지 키워 보세요
            </p>
          </div>

          <Image src={homeImg3} alt="" className={styles.image3} />
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>함께 번역하고 성장하세요!</h2>
        <Link href="/login" className={styles.ctaButton}>
          번역 시작하기
        </Link>
      </section>
    </main>
  );
}
