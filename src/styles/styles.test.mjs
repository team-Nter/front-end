import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import '@vanilla-extract/css';
import { removeAdapter, setAdapter } from '@vanilla-extract/css/adapter';
import { endFileScope, setFileScope } from '@vanilla-extract/css/fileScope';

// Capture the real vanilla-extract declarations, without a browser or generated
// class-name snapshots. Each source module is evaluated in its own file scope.
async function captureStyles(relativePath) {
  const sourceUrl = new URL(relativePath, import.meta.url);
  const declarations = [];

  setAdapter({
    appendCss: (declaration) => declarations.push(declaration),
    registerClassName() {},
    registerComposition() {},
    markCompositionUsed() {},
    onEndFileScope() {},
    getIdentOption: () => 'debug',
  });
  setFileScope(fileURLToPath(sourceUrl), 'front-end');

  try {
    const exports = await import(sourceUrl.href);
    return { exports, declarations };
  } finally {
    try {
      endFileScope();
    } finally {
      removeAdapter();
    }
  }
}

function ruleFor(declarations, selector) {
  const matches = declarations.filter(
    (declaration) =>
      declaration.type === 'global' && declaration.selector === selector,
  );

  assert.equal(matches.length, 1, `Expected one global rule for ${selector}`);
  return matches[0].rule;
}

const globalStyles = await captureStyles('./global.css.js');
const resetStyles = await captureStyles('./reset.css.js');

describe('global theme', () => {
  const { vars } = globalStyles.exports;
  const expectedColors = {
    gray: {
      50: '#FAFAFA',
      100: '#E8EBED',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    brand: {
      dark: '#262626',
      gold: '#FFC117',
      light: '#F1F2F5',
      white: '#FFFFFF',
    },
    error: '#EB3E3E',
  };
  const tokens = [
    ...Object.entries(expectedColors.gray).map(([shade, value]) => [
      `gray.${shade}`,
      vars.color.gray[shade],
      value,
    ]),
    ...Object.entries(expectedColors.brand).map(([name, value]) => [
      `brand.${name}`,
      vars.color.brand[name],
      value,
    ]),
    ['error', vars.color.error, expectedColors.error],
  ];

  for (const [name, reference, value] of tokens) {
    it(`exports the ${name} CSS variable with its root theme value`, () => {
      assert.equal(typeof reference, 'string');
      assert.match(reference, /^var\(--[\w-]+\)$/);
      assert.equal(
        ruleFor(globalStyles.declarations, ':root').vars[reference],
        value,
      );
    });
  }

  it('keeps references distinct for tokens with identical colors', () => {
    const references = tokens.map(([, reference]) => reference);

    assert.equal(new Set(references).size, references.length);
    assert.notEqual(vars.color.gray[800], vars.color.brand.dark);
  });

  it('reserves a stable scrollbar gutter to avoid layout shifts', () => {
    assert.equal(
      ruleFor(globalStyles.declarations, 'html').scrollbarGutter,
      'stable',
    );
  });

  it('uses the variable font with local and generic font fallbacks', () => {
    assert.equal(
      ruleFor(globalStyles.declarations, 'body').fontFamily,
      '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
    );
  });
});

describe('CSS reset', () => {
  const { declarations } = resetStyles;
  const resetCases = [
    ['*, *::before, *::after', { boxSizing: 'border-box' }],
    ['body', { lineHeight: 1.5, WebkitFontSmoothing: 'antialiased' }],
    [
      'img, picture, video, canvas, svg',
      { display: 'block', maxWidth: '100%' },
    ],
    ['input, textarea, select', { font: 'inherit', border: 0 }],
    ['p, h1, h2, h3, h4, h5, h6', { overflowWrap: 'break-word' }],
    ['p', { textWrap: 'pretty' }],
    ['h1, h2, h3, h4, h5, h6', { textWrap: 'balance' }],
    ['a', { textDecoration: 'none', color: 'inherit' }],
    ['ul, ol', { listStyle: 'none', padding: 0 }],
    [
      'button',
      {
        padding: 0,
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        color: 'inherit',
        font: 'inherit',
      },
    ],
  ];

  for (const [selector, expected] of resetCases) {
    it(`applies the base reset to ${selector}`, () => {
      assert.deepEqual(ruleFor(declarations, selector), expected);
    });
  }

  it('excludes dialogs from the universal margin reset', () => {
    assert.equal(ruleFor(declarations, '*:not(dialog)').margin, 0);
    assert.equal(
      ruleFor(declarations, '*, *::before, *::after').margin,
      undefined,
    );
    assert.ok(
      !declarations.some(
        ({ selector, rule }) =>
          (selector === '*' || selector === 'dialog') &&
          rule.margin !== undefined,
      ),
    );
  });

  it('enables intrinsic-size interpolation only without reduced motion', () => {
    const htmlRule = ruleFor(declarations, 'html');

    assert.equal(htmlRule.interpolateSize, undefined);
    assert.deepEqual(htmlRule['@media'], {
      '(prefers-reduced-motion: no-preference)': {
        interpolateSize: 'allow-keywords',
      },
    });
  });
});
