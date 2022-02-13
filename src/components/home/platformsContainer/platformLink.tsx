import { Link } from "react-router-dom";
import { products } from "../../../helpers/links";

interface IPlatformLinkProps {
  cover: string;
  title: string;
  link: string;
}

export default function PlatformLink(props: IPlatformLinkProps) {
  return (
    <Link to={`${products}/${props.link}`} className="platform-link" id="playstation">
      <img src={props.cover} alt="" className="platform-link__logo" />
      <div className="platform-link__title">{props.title}</div>
    </Link>
  );
}
