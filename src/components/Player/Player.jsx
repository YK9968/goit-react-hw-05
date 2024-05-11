import ReactPlayer from "react-player/youtube";
import css from "./Player.module.css";

export default function Player({ trailer }) {
  const ulrTrailer = `https://www.youtube.com/watch?v=${trailer}`;

  return (
    <div className={css.trailerContainer}>
      <ReactPlayer url={ulrTrailer} width="600px" height="400px" />
    </div>
  );
}
