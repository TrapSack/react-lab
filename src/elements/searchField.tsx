import { getTopProducts, searchGame } from "@/redux/actions/gamesActions";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import debounce from "../helpers/useDebounce";
import elementStyles from "./elementStyles.module.scss";

// eslint-disable-next-line react/require-default-props
export default function SearchField(props: { topProducts?: boolean }) {
  const dispatch = useDispatch();
  function doSearchToApi(search: string) {
    if (!search && props.topProducts) {
      dispatch(getTopProducts());
    } else {
      dispatch(searchGame(search));
    }
  }
  const debouncedSearch = debounce(doSearchToApi, 300);

  function toggleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  return (
    <input
      type="text"
      name="search-game"
      className={elementStyles["game-search"]}
      placeholder="Search..."
      onChange={toggleChange}
    />
  );
}
