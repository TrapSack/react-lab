import { getGames } from "@/redux/actions/gamesActions";
import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SortField() {
  const params = useParams<{ platformId?: string; "*": string }>();
  const dispatch = useDispatch();
  const [sortState, setSortState] = useState(() => ({
    genre: "",
    age: "",
    sortBy: "",
    orderBy: "",
  }));

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setSortState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    dispatch(getGames(params.platformId, sortState.genre, sortState.age, sortState.sortBy, sortState.orderBy));
  }, [sortState]);
  return (
    <form className="sort-field">
      <h3 className="sort-field__title">
        {params.platformId ? `${params.platformId[0].toUpperCase()}${params.platformId?.slice(1)}` : "All games"}
      </h3>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Genre</span>
        <label htmlFor="all-genre" className="sort-field__option">
          All
          <input type="radio" name="genre" id="all-genre" value="" onChange={handleChange} defaultChecked />
        </label>
        <label htmlFor="shooter" className="sort-field__option">
          Shooter
          <input type="radio" name="genre" id="shooter" value="shooter" onChange={handleChange} />
        </label>
        <label htmlFor="racing" className="sort-field__option">
          Racing
          <input type="radio" name="genre" id="racing" value="racing" onChange={handleChange} />
        </label>
        <label htmlFor="sandbox" className="sort-field__option">
          Sandbox
          <input type="radio" name="genre" id="sandbox" value="sandbox" onChange={handleChange} />
        </label>
        <label htmlFor="fighting" className="sort-field__option">
          Fighting
          <input type="radio" name="genre" id="fighting" value="fighting" onChange={handleChange} />
        </label>
      </div>

      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Age</span>
        <label htmlFor="all-age" className="sort-field__option">
          All
          <input type="radio" name="age" id="all-age" value="" onChange={handleChange} defaultChecked />
        </label>
        <label htmlFor="6" className="sort-field__option">
          6+
          <input type="radio" name="age" id="6" value="6" onChange={handleChange} />
        </label>
        <label htmlFor="12" className="sort-field__option">
          12+
          <input type="radio" name="age" id="12" value="12" onChange={handleChange} />
        </label>
        <label htmlFor="16" className="sort-field__option">
          16+
          <input type="radio" name="age" id="16" value="16" onChange={handleChange} />
        </label>
        <label htmlFor="18" className="sort-field__option">
          18+
          <input type="radio" name="age" id="18" value="18" onChange={handleChange} />
        </label>
      </div>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Sort by:</span>
        <select name="sortBy" id="" className="sort-field__select" defaultValue="name" onChange={handleChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Order by:</span>
        <select name="orderBy" id="" className="sort-field__select" defaultValue="asc" onChange={handleChange}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </form>
  );
}
