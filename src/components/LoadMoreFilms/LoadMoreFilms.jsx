import css from "./LoadMoreFilms.module.css";

export default function LoadMoreFilms({ onClick }) {
  return (
    <button className={css.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
}
