import PlatformLink from "./platformLink";

export default function Platforms() {
  return (
    <div className="home__platforms">
      <PlatformLink
        cover="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png"
        title="Playstation 5"
        link="/"
      />
      <PlatformLink cover="https://www.freepnglogos.com/uploads/xbox-logo-black-png-7.png" title="Xbox One" link="/" />
      <PlatformLink
        cover="https://icon-library.com/images/desktop-icon-png/desktop-icon-png-23.jpg"
        title="Desktop"
        link="/"
      />
    </div>
  );
}
