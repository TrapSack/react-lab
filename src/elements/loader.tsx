import elementStyles from "./elementStyles.module.scss";

export default function Loader() {
  return (
    <div className={elementStyles.loader}>
      <img
        src="https://1.bp.blogspot.com/-wRlbbo_FiaI/VayXP7GmH5I/AAAAAAAAPFU/Z8VyYeIWxEs/s1600/loading-gif1.gif"
        alt="loading"
        className={elementStyles.loader__image}
      />
      <span className={elementStyles.loader__text}>Loading...</span>
    </div>
  );
}
