import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./components/home/Home";
import { products, about, home } from "./components/public/links";
import Products from "./components/products/Products";
import About from "./components/about/About";
import App from "./App";
import "./styles/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={home} element={<App />}>
        <Route path={home} element={<Home />} />
        <Route path={products} element={<Products />} />
        <Route path={about} element={<About />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
