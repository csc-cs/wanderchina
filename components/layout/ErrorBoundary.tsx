'use client';

import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: (error: Error, reset: () => void) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary] Caught error:', error);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
          <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
          <h3 className="text-lg font-semibold text-rose-900 mb-2">
            Something went wrong.
          </h3>
          <p className="text-sm text-rose-700 mb-5">
            We hit an unexpected error rendering this section. Please try again.
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="rounded-full bg-rose-600 text-white px-5 py-2 text-sm font-medium hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}