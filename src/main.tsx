import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
