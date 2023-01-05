const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=uk`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&language=uk`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=uk`,

  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=99`,
  fetchAdventure: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=12`,
  fetchAnimation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=16`,
  fetchCrime: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=80`,
  fetchDrama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=18`,
  fetchFamily: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10751`,
  fetchFantasy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=14`,
  fetchHistory: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=36`,
  fetchMusic: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10402`,
  fetchMystery: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=9648`,
  fetchRomance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10749`,
  fetchScienceFiction: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=878`,
  fetchTVMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10770`,
  fetchThriller: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=53`,
  fetchWar: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=uk&with_genres=10752`,
};

export default requests;
