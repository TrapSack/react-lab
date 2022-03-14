import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import pretty from "pretty";
import { act } from "react-dom/test-utils";
import { store } from "../../redux/store";
import Footer from "../footer/Footer";
// import Header from "../header/Header";
import Platforms from "../home/platformsContainer/platforms";
import SortField from "../products/sortField";
import CartItemsContainer from "../cart/cartItemsContainer";
import LoginForm from "../header/forms/loginForm";
import RegisterForm from "../header/forms/registerForm";

let container: Element = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render footer", () => {
  act(() => {
    render(<Footer />, container);
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<footer><span>Incredible convenient</span>
      <div><a href=\\"https://www.nintendo.ru/\\" aria-label=\\"nintendo\\">Nintendo</a><a href=\\"https://www.activisionblizzard.com/\\" aria-label=\\"activision blizzard\\">Activision blizzard</a><a href=\\"https://www.ubisoft.com/ru-ru/\\" aria-label=\\"ubisoft\\">Ubisoft</a><a href=\\"https://www.ea.com/ru-ru\\" aria-label=\\"ea-games\\">Ubisoft</a></div>
    </footer>"
  `);
});
it("should render platforms", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Platforms />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div><a id=\\"playstation\\" href=\\"/products/playstation\\"><img src=\\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png\\" alt=\\"playstation\\">
        <div>Playstation 5</div>
      </a><a id=\\"xbox\\" href=\\"/products/xbox\\"><img src=\\"https://www.freepnglogos.com/uploads/xbox-logo-black-png-7.png\\" alt=\\"xbox\\">
        <div>Xbox One</div>
      </a><a id=\\"desktop\\" href=\\"/products/desktop\\"><img src=\\"https://icon-library.com/images/desktop-icon-png/desktop-icon-png-23.jpg\\" alt=\\"desktop\\">
        <div>Desktop</div>
      </a></div>"
  `);
});

it("Should render filter in product page", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SortField />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<form>
      <h3>All games</h3>
      <div><span>Genre</span><label for=\\"all-genre\\">All<input type=\\"radio\\" name=\\"genre\\" id=\\"all-genre\\" value=\\"\\" checked=\\"\\"></label></div>
      <div><span>Age</span><label for=\\"all-age\\">All<input type=\\"radio\\" name=\\"age\\" id=\\"all-age\\" value=\\"\\" checked=\\"\\"></label></div>
      <div><span>Sort by:</span><select name=\\"sortBy\\" id=\\"\\">
          <option value=\\"name\\" selected=\\"\\">Name</option>
          <option value=\\"price\\">Price</option>
          <option value=\\"rating\\">Rating</option>
        </select></div>
      <div><span>Order by:</span><select name=\\"orderBy\\" id=\\"\\">
          <option value=\\"asc\\" selected=\\"\\">ASC</option>
          <option value=\\"desc\\">DESC</option>
        </select></div>
    </form>"
  `);
});

it("should render cart page", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItemsContainer />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<table>
      <tbody>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Platform</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Price($)</th>
        </tr>
        <tr>
          <td>Nothing here yet!</td>
        </tr>
      </tbody>
    </table>"
  `);
});

it("should render login modal", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm setIsOpen={() => null} />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<form class=\\"undefined undefined\\"><label for=\\"login\\">Login<input type=\\"text\\" placeholder=\\"Login\\" name=\\"login\\" value=\\"\\"></label><label for=\\"password\\">Password<input type=\\"password\\" placeholder=\\"Password\\" name=\\"password\\" value=\\"\\"></label><button type=\\"submit\\">Login</button></form>"`
  );
});

it("should render Register modal", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </BrowserRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<form class=\\"undefined undefined\\"><label for=\\"login\\">Login<input type=\\"text\\" placeholder=\\"Login\\" name=\\"login\\" value=\\"\\"></label><label for=\\"login\\">Password<input type=\\"password\\" placeholder=\\"Password\\" name=\\"password\\" value=\\"\\"></label><label for=\\"login\\">Confirm<input type=\\"password\\" placeholder=\\"Confirm password\\" name=\\"confirmPassword\\" value=\\"\\"></label><label for=\\"login\\">Phone<input type=\\"text\\" placeholder=\\"Phone\\" name=\\"phone\\" value=\\"\\"></label><span>Ex. +375441234567</span><label for=\\"login\\">Adress<input type=\\"text\\" placeholder=\\"Adress\\" name=\\"adress\\" value=\\"\\"></label><span>Ex. 24 bg Hello Str</span><button type=\\"submit\\">Register</button></form>"`
  );
});
