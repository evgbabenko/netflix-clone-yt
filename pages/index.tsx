/* import type { NextPage } from 'next'; */
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Hero from '../components/Hero';
import requests from '../utils/requests';
import { Movie } from '../typings';
import MovieSlider from '../components/MovieSlider';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  return (
    <div className='relative h-screen lg:h-[140vh] w-full'>
      <Head>
        <title>Moovie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Hero trendingNow={trendingNow} />

        <section className='md:space-y-24'>
          <MovieSlider title='Актуальне' movies={trendingNow} />
          <MovieSlider title='Популярне зараз' movies={topRated} />
          <MovieSlider title='Тільки на Netflix' movies={netflixOriginals} />
          <MovieSlider title='Бойовики' movies={actionMovies} />

          {/*  My List  */}

          <MovieSlider title='Комедії' movies={comedyMovies} />
          <MovieSlider title='Жахи' movies={horrorMovies} />
          <MovieSlider title='Романтичні фільми' movies={romanceMovies} />
          <MovieSlider title='Документальні' movies={documentaries} />
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
