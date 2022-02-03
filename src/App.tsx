import { Component } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
// import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

interface IError {
  isError: boolean;
}
interface IState {
  error: IError;
}

export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      error: { isError: false },
    };
  }

  static getDerivedStateFromError() {
    return {
      error: {
        isError: true,
      },
    };
  }

  componentDidCatch() {
    console.error("Error");
    const navigate = useNavigate();
    console.log("WORK");
    navigate("/", { replace: true });
  }

  render() {
    if (this.state.error.isError) return <div>Error</div>;
    return (
      // <ErrorBoundary>
      <div>
        <Header />
        {/* {this.state.error.isError && <ErrorBoundary />} */}
        <Outlet />
        <Footer />
      </div>
      // </ErrorBoundary>
    );
  }
}
