import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { aboutFilms } from "../../api-details-film";
import css from "./MovieDetailsPage.module.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

export default function MovieDetailsPage() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { filmId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? "/";

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await aboutFilms(filmId);
        setFilmDetails(details);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmId]);

  if (!filmDetails) {
    return;
  }

  const { title, overview, genres, poster_path, release_date, vote_average } =
    filmDetails;

  const poster = `https://image.tmdb.org/t/p/w300/${poster_path}`;

  return (
    <div>
      {loading && <Loading />}

      <Link className={css.backBtn} to={backLinkHref}>
        Back
      </Link>
      {filmDetails && (
        <div>
          <div className={css.detailsContainer}>
            <img src={poster} alt={title} />
            <div className={css.detailsFilm}>
              <ul>
                <li>
                  <h2 className={css.filmTitle}>
                    {title} ({release_date})
                  </h2>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>User Score: </b>
                    <br />
                    {vote_average.toFixed(1)}
                  </p>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>Overview: </b>
                    <br />
                    {overview}
                  </p>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>Genres: </b>
                    <br />
                    {genres.map((genre) => (
                      <span key={genre.id}>{genre.name}, </span>
                    ))}
                  </p>
                </li>
              </ul>
              <ul className={css.moreDetailsFilm}>
                <Link className={css.filmInfo} to="cast">
                  Cast
                </Link>
                <Link className={css.filmInfo} to="review">
                  Reviews
                </Link>
              </ul>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      )}
      {error && <Error />}
    </div>
  );
}
