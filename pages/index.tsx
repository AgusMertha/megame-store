import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/organisms/navbar';
import MainBanner from '../components/organisms/mainBanner';
import TransactionStep from '../components/organisms/transactionStep';
import FeaturedGames from '../components/organisms/featuredGames';
import Reached from '../components/organisms/reached';
import Story from '..';
import Footer from '../components/organisms/footer';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar/>
      <MainBanner/>
      <TransactionStep/>
      <FeaturedGames/>
      <Reached/>
      <Story/>
      <Footer/>
    </>
  );
}
