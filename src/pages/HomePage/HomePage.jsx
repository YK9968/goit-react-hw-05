import { useEffect, useState } from "react";
import { fetchTrendingFilms } from "../../api-trending-film";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListFiln = async () => {
      try {
        setError(false);
        setLoading(true);
        const dataFilms = await fetchTrendingFilms();
        setFilms(dataFilms);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListFiln();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {films.length > 0 && <MovieList films={films} />}
      {error && <Error />}
    </div>
  );
}
