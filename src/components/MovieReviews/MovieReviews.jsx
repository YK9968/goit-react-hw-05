import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAboutFilms } from "../../api-details-film";
import css from "./MovieReviews.module.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

export default function MovieReviews() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(filmDetails);

  const { filmId } = useParams();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await fetchAboutFilms(filmId, "reviews");
        setFilmDetails(details.reviews.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmId]);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error />}
      <h3 className={css.filmReviews}>Reviews</h3>
      {filmDetails && filmDetails.length ? (
        <ul>
          {filmDetails.map(({ id, author_details: { username }, content }) => (
            <li className={css.reviewsContainer} key={id}>
              <p className={css.reviewsFilmText}>
                <b className={css.reviewsTextFilm}>Author: </b>
                {username}
              </p>
              <p className={css.reviewsFilmText}>
                <b className={css.reviewsTextFilm}>Review: </b>
                {content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movie </p>
      )}
    </div>
  );
}
