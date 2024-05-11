import { useEffect, useState } from "react";
import { fetchTrailerFilms } from "../../api-trailer-film";
import Player from "../Player/Player";

export default function Trailer({ id }) {
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const trailerFilm = async () => {
      const data = await fetchTrailerFilms(id);
      setTrailer(data.results[0].key);
    };

    trailerFilm();
  }, [id]);

  return <Player trailer={trailer} />;
}
