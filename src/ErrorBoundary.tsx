import React from 'react';

type State = {
  hasError: boolean;
  error?: Error | null;
  info?: React.ErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error, info });
    // Also keep the error in console for Vercel logs
    // eslint-disable-next-line no-console
    console.error('Captured error in ErrorBoundary:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children as React.ReactElement;

    const message = this.state.error?.message ?? 'Unknown error';
    const stack = this.state.error?.stack ?? this.state.info?.componentStack ?? '';

    return (
      <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ color: '#b91c1c' }}>Um erro ocorreu</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        <pre style={{ background: '#111', color: '#eee', padding: 12, overflow: 'auto' }}>{stack}</pre>
      </div>
    );
  }
}
