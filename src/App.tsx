import { Component, ErrorInfo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import { about, home, products, profile } from "./helpers/links";
import About from "./components/about/about";
import Home from "./components/home/Home";
import Products from "./components/products/products";
import Profile from "./components/profile/profile";
import { IUserState } from "./redux/types/types";

interface IError {
  isError: boolean;
}
interface IState {
  error: IError;
}

class App extends Component<{ user: IUserState }, IState> {
  constructor(props: { user: IUserState }) {
    super(props);
    this.state = {
      error: { isError: false },
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
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <>
        <Header />
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={products} element={this.props.user.isAuth ? <Products /> : <Navigate to={home} />}>
            <Route path=":platFormId" element={<Products />} />
          </Route>
          <Route path={about} element={this.props.user.isAuth ? <About /> : <Navigate to={home} />} />
          <Route path="*" element={<Home />} />
          <Route path={profile} element={this.props.user.isAuth ? <Profile /> : <Navigate to={home} />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state: { user: IUserState }) {
  // console.log(state.user);
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
