import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchSearchFilms = async (query) => {
  const response = await axios.get(`search/movie`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDUxM2IzMzRhYWY4OGIwNGM3YjU4NTNhMmQ5NWU0ZiIsInN1YiI6IjY2MWY3YWM3NTI4YjJlMDE3ZDQwNTRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqXqpcwr5toykUHuTXHsxwVGFDppc72zI4uHWUB8Q4g",
    },
    params: {
      query: query,
      page: 1,
      include_adult: false,
    },
  });
  return response.data;
};
