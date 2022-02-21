/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

  useEffect(() => {
    getDataUser();
    document.title = `${username} - Vink`;
  }, [username, userLogged]);
  return (
    <section className="w-screen" style={{ background: userOptions?.color || '#202937' }}>
      {/* Loader */}
      {loading && (
        <span className="absolute left-1/2 -translate-x-1/2 inset-y-0 flex items-center text-white">
          <Loader className="h-10 w-10 mr-3" />
          {IN_LOAD}
        </span>
      )}

      {/* Noti */}
      {notification && (
        <div className="flex justify-center absolute w-screen my-4">
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
                  <img className="w-full" src={user.background} alt={user.name} />
                ) : (
                  <img
                    className="w-full"
                    src="https://asset.gecdesigns.com/img/backgrounds/modern-crystal-abstract-background-template-1612247149783-cover.webp"
                    alt="background"
                  />
                )}
              </div>

              {/* Profile Photo */}
              <header className="relative flex flex-col overflow-hidden justify-start px-5 -mt-12 sm:-mt-14 sm:ml-12 ml-4 sm:mr-12 ">
                {user.username === userLogged.username && (
                  <Popup
                    trigger={
                      <button
                        type="button"
                        className="absolute rounded flex items-center gap-1 text-gray-800 text-base font-semibold bg-gray-300 hover:bg-gray-100 top-0 right-0 px-4 py-1 mt-14 sm:mt-16 mr-4 z-10"
                      >
                        {EDIT_PROFILE}
                        <Editicon />
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal bg-transparent">
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
                  className="h-24 w-24 sm:h-28 sm:w-28 bg-gray-800 p-1 rounded-full overflow-hidden flex items-center"
                >
                  {user.image ? (
                    <img
                      style={{ background: userOptions?.color || '#ffffff' }}
                      className="h-full w-full rounded-full"
                      src={user.image}
                      alt={user.name}
                    />
                  ) : (
                    <img
                      style={{ background: userOptions?.color || '#ffffff' }}
                      className="h-full w-full bg-white rounded-full"
                      src={SAMPLE_IMAGE}
                      alt="avatar"
                    />
                  )}
                </div>

                {/* name */}
                <div className="flex flex-row text-xl sm:text-2xl h-fit text-left justify-start sm:mb-4 font-bold text-gray-200">
                  <p
                    style={{ color: userOptions?.textColor || '#9ca3af' }}
                    className="text-gray-400  w-auto whitespace-nowrap"
                  >
                    {user.name || user.username}
                  </p>
                  <p
                    style={{ color: userOptions?.textColor || '#9ca3af', opacity: '.6' }}
                    className="text-gray-400 w-auto"
                  >
                    &nbsp;@{user.username}
                  </p>
                </div>
              </header>

              {/* descripcion */}
              <div>
                <div
                  className="m-4 mt-8 text-left min-h-16 px-4 lg:px-16 text-white"
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

              {/* links */}
              <div className="">
                <div className="text-center pl-6 pr-2 lg:px-16 mb-10">
                  <div className="flex flex-col mt-6 h-auto">
                    {user.links?.map((link, index) => (
                      <p key={index} className="w-100 flex">
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
        <div className="relative w-screen flex justify-center">
          <Link to="/" className="h-auto w-auto">
            <VinkIcon
              colour={userOptions?.textColor || '#9ca3af'}
              className="drop-shadow-2xl my-4"
              height={40}
              width={120}
              complete
            />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Profile;
