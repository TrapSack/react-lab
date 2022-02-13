import { Link } from "react-router-dom";
import { products } from "../../../helpers/links";

interface IPlatformLinkProps {
  cover: string;
  title: string;
  link: string;
}

export default function PlatformLink(props: IPlatformLinkProps) {
  return (
    <Link to={`${products}/${props.link}`} className="platform-link" id={props.title}>
      <img src={props.cover} alt={props.title} className="platform-link__logo" />
      <div className="platform-link__title">{props.title}</div>
    </Link>
  );
}
