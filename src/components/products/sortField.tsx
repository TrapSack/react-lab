import getFilter from "@/redux/actions/filterActions";
import { clearGames, getGames } from "@/redux/actions/gamesActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useState, ChangeEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import products from "./products.module.scss";

export default function SortField() {
  const params = useParams<{ platformId?: string; "*": string }>();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootReducerType) => state.filter);
  const [sortState, setSortState] = useState(() => ({
    platform: params.platformId,
    genre: "",
    age: "",
    sortBy: "name",
    orderBy: "asc",
  }));
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setSortState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const genreFilterComponents = useMemo(
    () =>
      filter.genre.map((genre) => (
        <label htmlFor={genre} className={products["sort-field__option"]} key={genre}>
          {`${genre[0].toUpperCase()}${genre.slice(1)}`}
          <input type="radio" name="genre" id={genre} value={genre} onChange={handleChange} />
        </label>
      )),
    [filter.genre]
  );
  const ageFilterComponents = useMemo(
    () =>
      filter.age.map((age) => (
        <label htmlFor={age.toString()} className={products["sort-field__option"]} key={age.toString()}>
          {`${age}+`}
          <input type="radio" name="age" id={age.toString()} value={age} onChange={handleChange} />
        </label>
      )),
    [filter.age]
  );
  useEffect(() => {
    dispatch(clearGames());
    dispatch(getGames(sortState.platform, sortState.genre, sortState.age, sortState.sortBy, sortState.orderBy));
  }, [sortState]);
  useEffect(() => {
    if (params.platformId !== sortState.platform)
      setSortState((prev) => ({
        ...prev,
        platform: params.platformId,
      }));
  }, [params.platformId]);
  useEffect(() => {
    dispatch(getFilter());
  }, []);
  return (
    <form className={products["sort-field"]}>
      <h3 className={products["sort-field__title"]}>
        {params.platformId ? `${params.platformId[0].toUpperCase()}${params.platformId?.slice(1)}` : "All games"}
      </h3>
      <div className={products["sort-field__column"]}>
        <span className={products["sort-field__sort-type-title"]}>Genre</span>
        <label htmlFor="all-genre" className={products["sort-field__option"]}>
          All
          <input type="radio" name="genre" id="all-genre" value="" onChange={handleChange} defaultChecked />
        </label>
        {genreFilterComponents}
      </div>
      <div className={products["sort-field__column"]}>
        <span className={products["sort-field__sort-type-title"]}>Age</span>
        <label htmlFor="all-age" className={products["sort-field__option"]}>
          All
          <input type="radio" name="age" id="all-age" value="" onChange={handleChange} defaultChecked />
        </label>
        {ageFilterComponents}
      </div>
      <div className={products["sort-field__column"]}>
        <span className={products["sort-field__sort-type-title"]}>Sort by:</span>
        <select
          name="sortBy"
          id=""
          className={products["sort-field__select"]}
          defaultValue="name"
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className={products["sort-field__column"]}>
        <span className={products["sort-field__sort-type-title"]}>Order by:</span>
        <select
          name="orderBy"
          id=""
          className={products["sort-field__select"]}
          defaultValue="asc"
          onChange={handleChange}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </form>
  );
}
