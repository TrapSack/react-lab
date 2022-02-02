import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      Incredible convenient
      <div className="footer__companies-logo-container">
        <a href="https://www.nintendo.ru/" className="footer__company-logo" aria-label="nintendo" id="nintendo">
          Nintendo
        </a>
        <a
          href="https://www.activisionblizzard.com/"
          className="footer__company-logo"
          aria-label="activision blizzard"
          id="activision-blizzard"
        >
          Activision blizzard
        </a>
        <a href="https://www.ubisoft.com/ru-ru/" className="footer__company-logo" aria-label="ubisoft" id="ubisoft">
          Ubisoft
        </a>
        <a href="https://www.ea.com/ru-ru" className="footer__company-logo" aria-label="ea-games" id="ea-games">
          Ubisoft
        </a>
      </div>
    </footer>
  );
}
