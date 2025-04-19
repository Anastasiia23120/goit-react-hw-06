"use client";

import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice.js";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label className={css.label} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        id="filter"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
