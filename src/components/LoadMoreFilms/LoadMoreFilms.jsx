import css from "./LoadMoreFilms.module.css";

export default function LoadMoreFilms({ next, prev, totalPage, page }) {
  return (
    <div className={css.container}>
      {page > 1 && (
        <button className={css.btnMovies} onClick={prev}>
          Prev page
        </button>
      )}
      {totalPage > page && (
        <button className={css.btnMovies} onClick={next}>
          Next page
        </button>
      )}
    </div>
  );
}
