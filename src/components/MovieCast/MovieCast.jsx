import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { aboutFilms } from "../../api-details-film";
import css from "./MovieCast.module.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

export default function MovieCast() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { filmId } = useParams();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await aboutFilms(filmId);
        setFilmDetails(details.credits.cast);
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

  //   { profile_path, original_name, character }
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      <h3 className={css.castTitle}>Film Cast</h3>
      <ul className={css.castContainer}>
        {filmDetails.map(({ profile_path, original_name, character, id }) => (
          <li className={css.actorContainer} key={id}>
            <img
              className={css.actorImg}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlcM989vRkQnMY-r6Nd8SgVLt34-tPKMLouQ&s"
              }
              alt="original_name"
            />
            <p className={css.castFilmText}>
              <b className={css.castTextFilm}>Name: </b>
              {original_name}
            </p>
            <p className={css.castFilmText}>
              <b className={css.castTextFilm}>Character: </b>
              {character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
