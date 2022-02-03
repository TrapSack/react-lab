import "./errorBoundary.scss";

import { Component } from "react";

interface State {
  error: boolean;
}

export default class ErrorBoundary extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch() {
    console.log("ERROR");
  }

  render() {
    if (this.state.error) return <div>ERROR</div>;
    return <div>{this.props.children}</div>;
  }
}

// export default function ErrorBoundary() {
//   return <div>ERROR</div>;
// }
