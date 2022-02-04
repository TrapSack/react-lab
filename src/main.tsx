import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./components/home/home";
import { products, about, home } from "./helpers/links";
import Products from "./components/products/products";
import About from "./components/about/about";
import App from "./App";
import "./styles/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={home} element={<App />}>
        <Route path={home} element={<Home />} />
        <Route path={products} element={<Products />}>
          <Route path=":platFormId" element={<Products />} />
        </Route>
        <Route path={about} element={<About />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
