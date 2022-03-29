/* eslint-disable react-hooks/exhaustive-deps */
import { ShareIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CopyIcon from '../../components/CopyIcon/CopyIcon';
import Editicon from '../../components/EditIcon/EditIcon';
import FormEdit from '../../components/Form/Form';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Toast from '../../components/Toast/Toast';
import VinkIcon from '../../components/VinkIcon/VinkIcon';
import { COPY_SUCCESS, EDIT_PROFILE, IN_LOAD, SAMPLE_IMAGE } from '../../data/constants';
import { getUser } from '../../functions/apiService';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const userLogged = useSelector((state) => state.auth.session);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const userOptions = user?.options[0];
  const getDataUser = async () => {
    setUser(null);
    setLoading(true);
    const res = await getUser(username);
    const userInfo = res[0];
    if (userInfo) {
      setUser(userInfo);
      setLoading(false);
    } else {
      navigate('/home');
    }
  };
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link.link);
    setNotification(true);
    setTimeout(() => {
      return setNotification(false);
    }, 3500);
  };
  const handleCopyProfile = (link) => {
    navigator.clipboard.writeText(`https://vink.vercel.app${pathname}`);
    setNotification(true);
    setTimeout(() => {
      return setNotification(false);
    }, 3500);
  };

  useEffect(() => {
    getDataUser();
  }, [username, userLogged]);
  return (
    <>
      <Helmet>
        <title>{`${username} - Vink`}</title>
        <meta name="description" content={`Mira el perfil de ${username}`} />
        <meta property="og:image" content={user && user.image}></meta>
        <meta property="og:url" content={`https://vink.vercel.app${pathname}`}></meta>
      </Helmet>
      <section className="w-screen" style={{ background: userOptions?.color || '#202937' }}>
        {/* Loader */}
        {loading && (
          <span className="absolute inset-y-0 flex items-center text-white -translate-x-1/2 left-1/2">
            <Loader className="w-10 h-10 mr-3" />
            {IN_LOAD}
          </span>
        )}

        {/* Noti */}
        {notification && (
          <div className="absolute flex justify-center w-screen my-4">
            <Toast msg={COPY_SUCCESS} action={() => setNotification(false)} />
          </div>
        )}

        {user && (
          <>
            <div className="flex flex-wrap justify-center">
              <div
                className={`w-full ${userLogged ? 'min-h-screen' : 'section-profile'}`}
                style={{ background: userOptions?.color || '#202937' }}
              >
                {/* Background */}
                <div className="h-48 overflow-hidden">
                  {user.background ? (
                    <img className="w-screen h-full sm:h-auto sm:w-full " src={user.background} alt={user.name} />
                  ) : (
                    <img
                      className="w-full"
                      src="https://asset.gecdesigns.com/img/backgrounds/modern-crystal-abstract-background-template-1612247149783-cover.webp"
                      alt="background"
                    />
                  )}
                </div>

                {/* Profile Photo and button */}
                <header className="relative flex flex-col justify-start px-5 ml-4 -mt-12 overflow-hidden sm:-mt-14 sm:ml-12 sm:mr-12 ">
                  {user.username === userLogged.username && (
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="absolute top-0 right-0 z-10 flex items-center gap-1 px-4 py-1 mr-4 text-base font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-100 mt-14 sm:mt-16"
                        >
                          {EDIT_PROFILE}
                          <Editicon />
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="bg-transparent modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <FormEdit data={user} close={close} />
                        </div>
                      )}
                    </Popup>
                  )}
                  <div
                    style={{ background: userOptions?.color }}
                    className="flex items-center justify-center w-24 h-24 p-1 overflow-hidden bg-gray-800 rounded-full sm:h-28 sm:w-28"
                  >
                    {user.image ? (
                      <img
                        style={{ background: userOptions?.color || '#ffffff' }}
                        className="object-cover w-full h-full rounded-full"
                        src={user.image}
                        alt={user.name}
                      />
                    ) : (
                      <img
                        style={{ background: userOptions?.color || '#ffffff' }}
                        className="w-full h-full bg-white rounded-full"
                        src={SAMPLE_IMAGE}
                        alt="avatar"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex flex-row justify-start text-xl font-bold text-left text-gray-200 sm:text-2xl h-fit sm:mb-4">
                    <p
                      style={{ color: userOptions?.textColor || '#9ca3af' }}
                      className="w-auto text-gray-400 whitespace-nowrap"
                    >
                      {user.name || user.username}
                    </p>
                    <p
                      style={{ color: userOptions?.textColor || '#9ca3af', opacity: '.6' }}
                      className="w-auto text-gray-400"
                    >
                      &nbsp;@{user.username}
                    </p>
                    <button
                      className="flex w-10 h-10 p-1 ml-4 rounded-full opacity-50 bg-neutral-800"
                      onClick={() => handleCopyProfile()}
                    >
                      <abbr title="Copy profile link" className="m-auto">
                        <ShareIcon className="w-6 h-6 m-auto text-neutral-400" />
                      </abbr>
                    </button>
                  </div>
                </header>

                {/* Descripcion */}
                <div>
                  <div
                    className="px-4 m-4 mt-8 text-left text-white min-h-16 lg:px-16"
                    style={{ color: userOptions?.textColor || '#ffffff' }}
                  >
                    <ReactMarkdown
                      className="markdown"
                      children={user?.description}
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
                </div>

                {/* Links */}
                <div className="">
                  <div className="pl-6 pr-2 mb-20 text-center lg:px-16">
                    <div className="flex flex-col h-auto mt-6">
                      {user.links?.map((link, index) => (
                        <p key={index} className="flex w-100">
                          <a
                            href={link.link}
                            rel="noreferrer"
                            target="_blank"
                            className={`w-full relative bg-gray-200 text-black font-medium p-2 m-2 w-100 ${
                              userOptions?.buttonRadius || 'rounded'
                            }`}
                            style={{
                              background: userOptions?.buttonColor || '#fff',
                              color: userOptions?.buttonText || '#000',
                            }}
                          >
                            {link.title}
                          </a>
                          <button
                            className=""
                            style={{
                              color: userOptions?.textColor || '#fff',
                            }}
                            onClick={() => handleCopy(link)}
                          >
                            <abbr title="Copy to clipboard">
                              <CopyIcon className="text-white" />
                            </abbr>
                          </button>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {userLogged ? (
          <Navbar />
        ) : (
          <div className="relative flex justify-center w-screen">
            <Link to="/" className="w-auto h-auto">
              <VinkIcon
                colour={userOptions?.textColor || '#9ca3af'}
                className="my-4 drop-shadow-2xl"
                height={40}
                width={120}
              />
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
