/* import type { NextPage } from 'next'; */
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Hero from '../components/Hero';
import requests from '../utils/requests';
import { Movie } from '../typings';
import MovieSlider from '../components/MovieSlider';
import useAuth from '../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import Modal from '../components/Modal';
import { modalState } from '../atoms/modalAtom';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  adventureMovies: Movie[];
  animations: Movie[];
  crimeMovies: Movie[];
  dramaMovies: Movie[];
  familyMovies: Movie[];
  fantasyMovies: Movie[];
  historyMovies: Movie[];
  music: Movie[];
  mysteryMovies: Movie[];
  scifiMovies: Movie[];
  tvMovies: Movie[];
  thrillerMovies: Movie[];
  warMovies: Movie[];
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
  adventureMovies,
  animations,
  crimeMovies,
  dramaMovies,
  familyMovies,
  fantasyMovies,
  historyMovies,
  music,
  mysteryMovies,
  scifiMovies,
  tvMovies,
  thrillerMovies,
  warMovies,
}: Props) => {
  const { logout, loading } = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading)
    return null

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
          <MovieSlider title='Трилери' movies={thrillerMovies} />
          <MovieSlider title='Кримінал' movies={crimeMovies} />
        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
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
    adventureMovies,
    animations,
    crimeMovies,
    dramaMovies,
    familyMovies,
    fantasyMovies,
    historyMovies,
    music,
    mysteryMovies,
    scifiMovies,
    tvMovies,
    thrillerMovies,
    warMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    /* */
    fetch(requests.fetchAdventure).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchCrime).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchFamily).then((res) => res.json()),
    fetch(requests.fetchFantasy).then((res) => res.json()),
    fetch(requests.fetchHistory).then((res) => res.json()),
    fetch(requests.fetchMusic).then((res) => res.json()),
    fetch(requests.fetchMystery).then((res) => res.json()),
    fetch(requests.fetchScienceFiction).then((res) => res.json()),
    fetch(requests.fetchTVMovie).then((res) => res.json()),
    fetch(requests.fetchThriller).then((res) => res.json()),
    fetch(requests.fetchWar).then((res) => res.json()),
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
      adventureMovies: adventureMovies.results,
      animations: animations.results,
      crimeMovies: crimeMovies.results,
      dramaMovies: dramaMovies.results,
      familyMovies: familyMovies.results,
      fantasyMovies: fantasyMovies.results,
      historyMovies: historyMovies.results,
      music: music.results,
      mysteryMovies: mysteryMovies.results,
      scifiMovies: scifiMovies.results,
      tvMovies: tvMovies.results,
      thrillerMovies: thrillerMovies.results,
      warMovies: warMovies.results,
    },
  };
};
