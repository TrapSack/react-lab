import { Component, ErrorInfo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";

interface IError {
  isError: boolean;
}
interface IState {
  error: IError;
  currentUser: {
    login: string;
  };
}

export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      error: { isError: false },
      currentUser: { login: "" },
    };
    this.setState = this.setState.bind(this);
  }

  static getDerivedStateFromError() {
    return {
      error: {
        isError: true,
      },
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const navigate = useNavigate();
    console.log(error, errorInfo);
    navigate("/", { replace: true });
  }

  render() {
    if (this.state.error.isError) return <div>Error</div>;
    return (
      <>
        <Header currentUser={this.state.currentUser} setState={this.setState} />
        <Outlet />
        <Footer />
      </>
    );
  }
}
