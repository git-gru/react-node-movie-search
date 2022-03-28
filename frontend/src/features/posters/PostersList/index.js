import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { selectAllPosters, fetchPosters } from "../postersSlice";
import { PosterItem } from "../PosterItem";

export const PostersList = () => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const posters = useSelector(selectAllPosters);

  const postersStatus = useSelector((state) => state.posters.status);

  useEffect(() => {
    if (postersStatus === "idle") {
      dispatch(fetchPosters());
    }
  }, [postersStatus, dispatch]);

  const renderedPosters = posters.map((poster) => (
    <div className="poster-container">
      <PosterItem title={poster.Title} url={poster.Poster} />
    </div>
  ));

  const onKeywordChange = (e) => {
    setKeyword(e.target.value);

    if (e.target.value.length > 2) {
      if (this.timeOut) {
        try {
          clearInterval(this.timeOut);
        } catch (err) {
          console.log(err);
        }
      }

      this.timeOut = setTimeout(() => {
        this.props.getPosters(this.state.keyword);
      }, 300);
    }
  };

  return (
    <div className="posters-view">
      <span>Search: </span>
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={onKeywordChange}
      />
      <div className="posters-list">{renderedPosters}</div>
    </div>
  );
};

export default PostersList;
