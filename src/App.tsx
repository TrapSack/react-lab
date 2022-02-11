import { Component, ErrorInfo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import { about, home, products, profile } from "./helpers/links";
import About from "./components/about/about";
import Home from "./components/home/Home";
import Products from "./components/products/products";
import Profile from "./components/profile/profile";

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    return <Navigate to="/" />;
  }

  render() {
    if (this.state.error.isError) return <div>Error</div>;
    return (
      <>
        <Header currentUser={this.state.currentUser} setState={this.setState} />
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={products} element={this.state.currentUser.login ? <Products /> : <Navigate to={home} />}>
            <Route path=":platFormId" element={<Products />} />
          </Route>
          <Route path={about} element={this.state.currentUser.login ? <About /> : <Navigate to={home} />} />
          <Route path="*" element={<Home />} />
          <Route path={profile} element={<Profile />} />
        </Routes>
        <Footer />
      </>
    );
  }
}
