import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Blog from '../../components/Blog/Blog';
import FooterHome from '../../components/FooterHome/FooterHome';
import Landing from '../../components/LandingSVG/Landing';
import Navbar from '../../components/Navbar/Navbar';
import {
  HOME_DESCRIPTION,
  HOME_SECTION_FEATS,
  HOME_SECTION_FEATS_SUB,
  HOME_TITLE1,
  HOME_TITLE2,
  LEARN_MORE,
  REGISTER,
  VIEW_MORE
} from '../../data/constants';
import { cardsDetails, homeCards } from '../../data/homeCards';
import preview from '../../images/preview.svg';
import './Home.css';

const Home = () => {
  const user = useSelector((state) => state.auth.session);
  const LinkScroll = Scroll.Link;

  useEffect(() => {
    document.title = 'Vink';
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Vink</title>
        <meta name="description" content="crea tu perfil, crea tu presentación" />
      </Helmet>
      <main>
        <Navbar top home />
        {/* landing section */}
        <section className="flex items-center h-screen mt-16 text-gray-400 body-font sm:mt-0">
          <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
            <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
              <h1 className="mb-4 text-3xl font-medium text-white title-font sm:text-4xl">
                {HOME_TITLE1}
                <br className="hidden lg:inline-block" />
                {HOME_TITLE2}
              </h1>
              <p className="mb-8 leading-relaxed">{HOME_DESCRIPTION}</p>
              <div className="flex justify-center">
                <LinkScroll
                  smooth={true}
                  to="feats"
                  className="inline-flex px-6 py-2 text-lg text-white border-0 rounded cursor-pointer bg-vink-800 focus:outline-none hover:bg-vink-700"
                >
                  {VIEW_MORE}
                </LinkScroll>
                {!user && (
                  <Link
                    to="/register"
                    className="inline-flex px-6 py-2 ml-4 text-lg text-gray-400 bg-gray-800 border border-gray-700 rounded focus:outline-none hover:bg-gray-700 hover:text-white"
                  >
                    {REGISTER}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex justify-center w-5/6 lg:max-w-lg lg:w-full md:w-1/2 md:h-full">
              <Landing className="w-2/3 md:w-full sm:h-full h-1/2" />
            </div>
          </div>
        </section>
        {/* card features section */}
        <section className="text-gray-400 body-font">
          <div className="container flex flex-wrap px-5 py-24 mx-auto" id="feats">
            <div className="flex flex-col w-full mb-16 text-center">
              <h2 className="mb-1 text-xs font-medium tracking-widest text-vink-800 title-font">
                {HOME_SECTION_FEATS_SUB}
              </h2>
              <h1 className="text-2xl font-medium text-white sm:text-3xl title-font">{HOME_SECTION_FEATS}</h1>
              <div className="flex justify-center w-full pt-6">
                <a
                  href="user/joaquinnieva"
                  className="inline-flex px-6 py-2 ml-4 text-lg text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none hover:bg-gray-700 hover:text-white"
                >
                  Ver ejemplo
                </a>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {homeCards.map((card, index) => (
                <div className="w-full p-4 md:w-1/3" key={index}>
                  <div className="flex flex-col h-full p-8 bg-gray-700 rounded-lg bg-opacity-60">
                    <div className="flex items-center mb-3">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white rounded-full bg-vink-800">
                        {card.svg}
                      </div>
                      <h2 className="text-lg font-medium text-white title-font">{card.title}</h2>
                    </div>
                    <div className="flex-grow">
                      <p className="text-base leading-relaxed">{card.description}</p>
                      <LinkScroll
                        to={card.id}
                        smooth={true}
                        offset={-80}
                        className="inline-flex items-center mt-3 cursor-pointer text-vink-500 hover:text-vink-600"
                      >
                        {LEARN_MORE}
                        {/* arrow icon */}
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </LinkScroll>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* preview section */}
        <section className="flex flex-col justify-center gap-4 py-6 sm:flex-row sm:justify-around">
          <h1 className="m-auto text-lg font-medium leading-relaxed text-center text-white">
            Esquema de un perfil en Vink
          </h1>
          <img src={preview} className="w-1/2 m-auto sm:w-1/3" alt="preview" />
        </section>
        {/* card detail section */}
        <section className="text-gray-400 body-font">
          {cardsDetails.map((card, index) => (
            <div
              className={
                index === 1
                  ? 'container px-5 py-16 mx-auto flex flex-wrap flex-row md:flex-row-reverse'
                  : 'container px-5 py-16 mx-auto flex flex-wrap'
              }
              key={index}
              id={card.id}
            >
              <h2
                className={
                  index === 1
                    ? 'sm:text-3xl text-2xl text-white font-medium title-font text-right pr-6 mb-2 md:w-2/5 md:border-l border-gray-500'
                    : 'sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5 md:border-r border-gray-500'
                }
              >
                {card.title}
              </h2>
              <div className={index === 1 ? 'md:w-3/5 md:pr-6' : 'md:w-3/5 md:pl-6'}>
                <p className="text-base leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* blog section */}
        <section className="overflow-hidden text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto my-24">
            <Blog />
          </div>
        </section>
        <FooterHome></FooterHome>
      </main>
    </>
  );
};

export default Home;
