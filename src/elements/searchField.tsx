import { searchGame } from "@/redux/actions/gamesActions";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import debounce from "../helpers/useDebounce";
import elementStyles from "./elementStyles.module.scss";

export default function SearchField(props: {
  topProducts?: boolean;
  setShowTopProducts?: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  function doSearchToApi(search: string) {
    if (!search && props.topProducts) {
      props.setShowTopProducts(true);
    } else {
      dispatch(searchGame(search));
      props.setShowTopProducts(false);
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

SearchField.defaultProps = {
  topProducts: false,
  setShowTopProducts: (): null => null,
};
