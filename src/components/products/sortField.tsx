import { useParams } from "react-router-dom";

export default function SortField() {
  const params = useParams<{ platformId?: string; "*": string }>();
  return (
    <form className="sort-field">
      <h3 className="sort-field__title">
        {params.platformId ? `${params.platformId[0].toUpperCase()}${params.platformId?.slice(1)}` : "All games"}
      </h3>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Genre</span>
        <label htmlFor="shooter" className="sort-field__option">
          Shooter
          <input type="radio" name="genre" id="shooter" value="shooter" />
        </label>
        <label htmlFor="racing" className="sort-field__option">
          Racing
          <input type="radio" name="genre" id="racing" value="racing" />
        </label>
        <label htmlFor="sandbox" className="sort-field__option">
          Sandbox
          <input type="radio" name="genre" id="sandbox" value="sandbox" />
        </label>
        <label htmlFor="fighting" className="sort-field__option">
          Fighting
          <input type="radio" name="genre" id="fighting" value="fighting" />
        </label>
      </div>

      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Age</span>
        <label htmlFor="6" className="sort-field__option">
          6+
          <input type="radio" name="age" id="6" value="6" />
        </label>
        <label htmlFor="12" className="sort-field__option">
          12+
          <input type="radio" name="age" id="12" value="12" />
        </label>
        <label htmlFor="16" className="sort-field__option">
          16+
          <input type="radio" name="age" id="16" value="16" />
        </label>
        <label htmlFor="18" className="sort-field__option">
          18+
          <input type="radio" name="age" id="18" value="18" />
        </label>
      </div>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Sort by:</span>
        <select name="sortBy" id="" className="sort-field__select" defaultValue="name">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="sort-field__column">
        <span className="sort-field__sort-type-title">Order by:</span>
        <select name="orderBy" id="" className="sort-field__select" defaultValue="asc">
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </form>
  );
}
