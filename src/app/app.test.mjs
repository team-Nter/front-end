import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { compileFunction } from 'node:vm';
import swc from 'next/dist/build/swc/index.js';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Use Next's existing JSX compiler so these tests need no additional runner or
// Babel configuration. Only stylesheet imports are isolated from rendering.
function loadComponent(relativePath) {
  const filename = fileURLToPath(new URL(relativePath, import.meta.url));
  const require = createRequire(filename);
  const stylesheets = [];
  const { code } = swc.transformSync(readFileSync(filename, 'utf8'), {
    filename,
    jsc: {
      target: 'es2022',
      parser: { syntax: 'ecmascript', jsx: true },
      transform: { react: { runtime: 'automatic' } },
    },
    module: { type: 'commonjs' },
  });
  const componentModule = { exports: {} };

  compileFunction(code, ['require', 'module', 'exports'], { filename })(
    (specifier) => {
      if (specifier.endsWith('.css') || specifier.endsWith('.css.js')) {
        stylesheets.push(specifier);
        return {};
      }
      return require(specifier);
    },
    componentModule,
    componentModule.exports,
  );

  return { exports: componentModule.exports, stylesheets };
}

const layout = loadComponent('./layout.js');
const { default: RootLayout, metadata } = layout.exports;
const { default: Home } = loadComponent('./page.js').exports;

describe('Home', () => {
  it('renders the Korean landing message in the main landmark', () => {
    assert.equal(
      renderToStaticMarkup(React.createElement(Home)),
      '<main>독스루 랜딩 페이지</main>',
    );
  });
});

describe('RootLayout', () => {
  it('exports the service title and Korean description', () => {
    assert.deepEqual(metadata, {
      title: 'Docthru',
      description: '개발 문서 번역 챌린지 서비스',
    });
  });

  it('loads the subset font and applies global styles after the reset', () => {
    assert.deepEqual(layout.stylesheets, [
      'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
      '@/styles/reset.css.js',
      '@/styles/global.css.js',
    ]);
  });

  it('declares Korean on the document root and wraps content in a body', () => {
    const document = RootLayout({ children: '페이지 내용' });

    assert.equal(document.type, 'html');
    assert.equal(document.props.lang, 'ko');
    assert.equal(React.Children.only(document.props.children).type, 'body');
  });

  const childCases = [
    ['an element', React.createElement('section', null, '챌린지')],
    [
      'multiple children',
      [
        React.createElement('header', { key: 'header' }, '제목'),
        React.createElement('main', { key: 'main' }, '본문'),
      ],
    ],
    ['a fragment', React.createElement(React.Fragment, null, '첫째', '둘째')],
    ['text', '번역 챌린지'],
    ['zero', 0],
    ['an empty string', ''],
    ['false', false],
    ['null', null],
    ['undefined', undefined],
  ];

  for (const [label, children] of childCases) {
    it(`preserves ${label} as the body content`, () => {
      const document = RootLayout({ children });
      const body = React.Children.only(document.props.children);

      assert.equal(body.props.children, children);
    });
  }

  it('renders the home page inside the document body', () => {
    const html = renderToStaticMarkup(
      React.createElement(RootLayout, null, React.createElement(Home)),
    );

    assert.match(html, /^<html lang="ko">/);
    assert.match(html, /<body><main>독스루 랜딩 페이지<\/main><\/body>/);
    assert.ok(html.endsWith('</html>'));
  });
});
