'use client';

import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export default function QueryBoundary({
  children,
  resetKeys,
  loadingFallback = <p>불러오는 중...</p>,
  errorFallback,
  onError,
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={onError}
          onReset={reset}
          resetKeys={resetKeys}
          fallbackRender={({ error, resetErrorBoundary }) => {
            if (errorFallback) {
              return errorFallback({ error, retry: resetErrorBoundary });
            }

            return (
              <div role="alert">
                <p>데이터를 불러오지 못했습니다.</p>
                <button type="button" onClick={resetErrorBoundary}>
                  다시 시도
                </button>
              </div>
            );
          }}
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
