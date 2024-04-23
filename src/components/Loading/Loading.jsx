import { ThreeDots } from "react-loader-spinner";
import css from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="rgba(225, 225, 225, 0.5)"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
