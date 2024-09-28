import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from '@/widgetes/PageError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const {hasError} = this.state;

    if (hasError) {
      return <Suspense fallback="">
        <PageError />
      </Suspense>
    }
    
    return this.props.children; 
  }
}

export default ErrorBoundary;