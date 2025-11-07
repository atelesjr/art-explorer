import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Error Boundary to catch React rendering errors.
 * Prevents entire app crash when component fails.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log to error reporting service (Sentry, LogRocket, etc.)
		console.error('ErrorBoundary caught an error:', error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="error-boundary">
					<div className="error-boundary-content">
						<h2 className="error-boundary-title">Something went wrong</h2>
						<p className="error-boundary-message">
							{this.state.error?.message || 'An unexpected error occurred'}
						</p>
						<button onClick={this.handleReset} className="error-boundary-btn">
							Try again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
