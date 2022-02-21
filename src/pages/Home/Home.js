import React, { useEffect } from 'react';
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
import './Home.css';

const Home = () => {
  const user = useSelector((state) => state.auth.session);
  const LinkScroll = Scroll.Link;

  useEffect(() => {
    document.title = 'Vink';
  }, [user]);
  return (
    <main>
      <Navbar top home />
      {/* landing section */}
      <section className="text-gray-400 body-font h-screen flex items-center mt-16 sm:mt-0">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              {HOME_TITLE1}
              <br className="hidden lg:inline-block" />
              {HOME_TITLE2}
            </h1>
            <p className="mb-8 leading-relaxed">{HOME_DESCRIPTION}</p>
            <div className="flex justify-center">
              <LinkScroll
                smooth={true}
                to="feats"
                className="inline-flex cursor-pointer text-white bg-vink-800 border-0 py-2 px-6 focus:outline-none hover:bg-vink-700 rounded text-lg"
              >
                {VIEW_MORE}
              </LinkScroll>
              {!user && (
                <Link
                  to="/register"
                  className="ml-4 inline-flex text-gray-400 border-gray-700 border bg-gray-800 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
                >
                  {REGISTER}
                </Link>
              )}
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2  md:h-full w-5/6 flex justify-center">
            <Landing className="md:w-full sm:h-full h-1/2 w-2/3" />
          </div>
        </div>
      </section>
      {/* card features section */}
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap" id="feats">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-vink-800 tracking-widest font-medium title-font mb-1">
              {HOME_SECTION_FEATS_SUB}
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">{HOME_SECTION_FEATS}</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {homeCards.map((card, index) => (
              <div className="p-4 w-full md:w-1/3" key={index}>
                <div className="flex rounded-lg h-full bg-gray-700 bg-opacity-60 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-vink-800 text-white flex-shrink-0">
                      {card.svg}
                    </div>
                    <h2 className="text-white text-lg title-font font-medium">{card.title}</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">{card.description}</p>
                    <LinkScroll
                      to={card.id}
                      smooth={true}
                      offset={-80}
                      className="mt-3 text-vink-500 hover:text-vink-600 inline-flex items-center cursor-pointer"
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
              <p className="leading-relaxed text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </section>
      {/* blog section */}
      <section className="text-gray-400 body-font overflow-hidden">
        <div className="container px-5 my-24 py-24 mx-auto">
          <Blog />
        </div>
      </section>
      <FooterHome></FooterHome>
    </main>
  );
};

export default Home;
