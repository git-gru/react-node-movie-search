import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import {
  selectAllPosters,
  fetchPosters,
  postersEmptied,
  statusReset,
} from "../postersSlice";
import { PosterItem } from "../PosterItem";

export const PostersList = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const dispatch = useDispatch();
  const posters = useSelector(selectAllPosters);

  const postersStatus = useSelector((state) => state.posters.status);

  useEffect(() => {
    if (debouncedKeyword) {
      if (postersStatus === "idle") {
        dispatch(fetchPosters(debouncedKeyword));
      }
    } else {
      dispatch(postersEmptied());
    }
  }, [debouncedKeyword, postersStatus, dispatch]);

  const renderedPosters = posters.map((poster) => (
    <div className="poster-container">
      <PosterItem title={poster.Title} url={poster.Poster} />
    </div>
  ));

  return (
    <div className="posters-view">
      <span>Search: </span>
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="posters-list">{renderedPosters}</div>
    </div>
  );
};

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const dispatch = useDispatch();
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        dispatch(statusReset());
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay, dispatch] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default PostersList;
