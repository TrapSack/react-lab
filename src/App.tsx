import React, { Component, ErrorInfo, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { about, cart, home, products, profile } from "./helpers/links";
import Home from "./components/home/Home";
import { IUserState } from "./redux/types/types";
import NotificationComponent from "./elements/notification";
import { getTopProducts } from "./redux/actions/topProductsActions";

const Products = lazy(() => import("./components/products/Products"));
const About = lazy(() => import("./components/about/About"));
const Profile = lazy(() => import("./components/profile/profile"));
const Cart = lazy(() => import("./components/cart/cart"));

interface IError {
  isError: boolean;
}
interface IState {
  error: IError;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
  user: IUserState;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: { isError: false },
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount(): void {
    this.props.getProducts();
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
        <NotificationComponent />
        <Routes>
          <Route path={home} element={<Home />} />
          <Route
            path={products}
            element={
              this.props.user.isAuth ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </React.Suspense>
              ) : (
                <Navigate to={home} />
              )
            }
          >
            <Route path=":platformId" element={<Products />} />
          </Route>
          <Route
            path={about}
            element={
              this.props.user.isAuth ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <About />
                </React.Suspense>
              ) : (
                <Navigate to={home} />
              )
            }
          />
          <Route path="*" element={<Home />} />
          <Route
            path={profile}
            element={
              this.props.user.isAuth ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </React.Suspense>
              ) : (
                <Navigate to={home} />
              )
            }
          />
          <Route
            path={cart}
            element={
              this.props.user.isAuth ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </React.Suspense>
              ) : (
                <Navigate to={home} />
              )
            }
          />
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

const mapDispatchToProps = {
  getProducts: () => getTopProducts(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
