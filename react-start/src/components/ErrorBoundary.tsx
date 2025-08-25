import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Widget failed to load</h2>
    }
    return this.props.children
  }
}

export default ErrorBoundary