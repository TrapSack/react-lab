import { Link } from "react-router-dom";

interface IPlatformLinkProps {
  cover: string;
  title: string;
  link: string;
}

export default function PlatformLink(props: IPlatformLinkProps) {
  return (
    <Link to={props.link} className="platform-link" id="playstation">
      <img src={props.cover} alt="" className="platform-link__logo" />
      <div className="platform-link__title">
        <span className="platform-link__title-text">{props.title}</span>
      </div>
    </Link>
  );
}
