import { useEffect, useState } from "react";
import { fetchTrendingFilms } from "../../api-trending-film";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState("day");

  useEffect(() => {
    const fetchListFiln = async () => {
      try {
        setError(false);
        setLoading(true);
        const dataFilms = await fetchTrendingFilms(top);
        setFilms(dataFilms);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListFiln();
  }, [top]);

  return (
    <div>
      <ul className={css.btnContainer}>
        <li>
          <button className={css.changeTop} onClick={() => setTop("day")}>
            Top Day
          </button>
        </li>
        <li>
          <button className={css.changeTop} onClick={() => setTop("week")}>
            Top Week
          </button>
        </li>
      </ul>
      {loading && <Loading />}
      {films.length > 0 && <MovieList films={films} />}
      {error && <Error />}
    </div>
  );
}
