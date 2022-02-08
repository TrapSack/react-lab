import { Component, ErrorInfo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    return <Navigate to="/" />;
  }

  render() {
    if (this.state.error.isError) return <div>Error</div>;
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
}
