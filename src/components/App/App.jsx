import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));

import Layout from "../Layout/Layout";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Loading from "../Loading/Loading";

export default function App() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:filmId" element={<MovieDetailsPage />}>
            <Route path="/movies/:filmId/review" element={<MovieReviews />} />
            <Route path="/movies/:filmId/cast" element={<MovieCast />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
