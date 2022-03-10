import footer from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={footer.footer}>
      <span>Incredible convenient</span>
      <div className={footer["footer__companies-logo-container"]}>
        <a
          href="https://www.nintendo.ru/"
          className={footer["footer__company-logo"]}
          aria-label="nintendo"
          id={footer.nintendo}
        >
          Nintendo
        </a>
        <a
          href="https://www.activisionblizzard.com/"
          className={footer["footer__company-logo"]}
          aria-label="activision blizzard"
          id={footer["activision-blizzard"]}
        >
          Activision blizzard
        </a>
        <a
          href="https://www.ubisoft.com/ru-ru/"
          className={footer["footer__company-logo"]}
          aria-label="ubisoft"
          id={footer.ubisoft}
        >
          Ubisoft
        </a>
        <a
          href="https://www.ea.com/ru-ru"
          className={footer["footer__company-logo"]}
          aria-label="ea-games"
          id={footer["ea-games"]}
        >
          Ubisoft
        </a>
      </div>
    </footer>
  );
}
