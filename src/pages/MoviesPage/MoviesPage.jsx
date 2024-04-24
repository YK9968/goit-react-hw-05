import { useEffect, useState } from "react";
import { fetchSearchFilms } from "../../api-search-film";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
// import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchListFilm = async () => {
      try {
        setLoading(true);
        const dataFilms = await fetchSearchFilms(query);
        setFilms(dataFilms.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListFilm();
  }, [query]);

  const handleSearchFilms = (e) => {
    e.preventDefault();
    const form = e.target;
    setQuery(form.elements.search.value);
    setError(false);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearchFilms}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          placeholder="Search films"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <Loading />}
      {films.length > 0 && <MovieList films={films} />}
      {error && <Error />}
    </div>
  );
}
