import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  return (
    <ul className={css.filmContainer}>
      {films.map((film) => (
        <li className={css.filmContainerItem} key={film.id}>
          <Link className={css.filmLink} to={`movies/${film.id}`}>
            <img
              className={css.filmImg}
              src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
              alt={film.original_title}
            />
            <p className={css}>{film.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
