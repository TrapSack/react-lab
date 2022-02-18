import { getTopProducts, searchGame } from "@/redux/actions/gamesActions";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "../helpers/useDebounce";

// eslint-disable-next-line react/require-default-props
export default function SearchField(props: { topProducts?: boolean }) {
  const [searchState, setSearchState] = useState<string>("");
  function toggleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchState(e.target.value);
  }
  const dispatch = useDispatch();
  function doSearchToApi() {
    if (!searchState && props.topProducts) {
      dispatch(getTopProducts());
    } else {
      dispatch(searchGame(searchState));
    }
  }
  const debouncedSearch = debounce(doSearchToApi, 500);
  useEffect(() => {
    debouncedSearch();
  }, [searchState]);
  return (
    <input
      type="text"
      name="search-game"
      className="home__game-search"
      placeholder="Search..."
      onChange={toggleChange}
      value={searchState}
    />
  );
}
