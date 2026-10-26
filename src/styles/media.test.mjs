import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { media } from './media.js';

describe('responsive media queries', () => {
  it('includes 1024px in the tablet query for screens', () => {
    assert.equal(media.tablet, 'screen and (width <= 1024px)');
  });

  it('includes 480px in the mobile query for screens', () => {
    assert.equal(media.mobile, 'screen and (width <= 480px)');
  });
});
