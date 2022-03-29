import { LockClosedIcon } from '@heroicons/react/solid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Backarrow from '../../components/BackArrow/BackArrow';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import VinkIcon from '../../components/VinkIcon/VinkIcon';
import Visibility from '../../components/Visibility/Visibility';
import {
  ERROR_MSG,
  GRIS_OSCURO,
  ID_GOOGLE,
  LOGIN_ACCOUNT,
  LOGIN_WITH_GOOGLE,
  REGISTER,
  REGISTERING,
  REGISTER_PAGE
} from '../../data/constants';
import { loginUser, registerUser } from '../../functions/apiService';
import localAuth from '../../functions/localAuth';
import { login } from '../../redux/slice/authSlice';

function Register() {
  const [visible, setVisible] = useState(false);
  const isVisible = () => {
    setVisible(true);
    if (visible === true) {
      setVisible(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginGoogle = (res) => {
    console.log(res.profileObj);
    if (res.profileObj) {
      navigate('/profile');
    }
  };
  const registerButton = async (data) => {
    setLoading(true);
    const user = await registerUser(data);
    if (user) {
      const userToLog = await loginUser(data);
      if (userToLog) {
        setLoading(false);
        dispatch(login(userToLog));
        localAuth('login', {
          token: userToLog.token,
          id: userToLog.id,
          username: userToLog.username,
          image: userToLog.image,
        });
      }
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        return setError(false);
      }, 3500);
    }
  };
  const regex = new RegExp(/\s/);

  const google = false;

  useEffect(() => {
    document.title = 'Vink';
  });
  return (
    <>
      <Helmet>
        <title>Vink</title>
        <meta name="description" content="comienza a usar Vink, tu mejor perfil" />
      </Helmet>
      <section className="w-screen h-screen">
        <div className="absolute top-0 left-0 p-6 text-white">
          <Link to="/home">
            <Backarrow />
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-5 space-y-8 bg-white rounded">
            <div>
              <div className="flex justify-center w-auto h-auto mx-auto">
                <VinkIcon colour={GRIS_OSCURO} height={70} width={400} complete />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-center text-gray-800">{REGISTER_PAGE}</h2>
            </div>
            <Formik
              initialValues={{ username: '', password: '' }}
              validate={(values) => {
                const errors = {};
                if (values.username.length < 3) {
                  errors.username = '¡Usuario debe contener al menos 3 caracteres!';
                } else if (values.username.length > 15) {
                  errors.username = '¡Usuario debe contener menos de 15 caracteres!';
                } else if (regex.test(values.username)) {
                  errors.username = '¡Usuario no puede contener espacios!';
                } else if (values.password.length < 6) {
                  errors.password = '¡Contraseña debe contener al menos 6 caracteres!';
                }
                return errors;
              }}
              onSubmit={(values) => {
                registerButton(values);
              }}
            >
              {() => (
                <Form className="mt-8 space-y-6">
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <Field
                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        autoComplete="off"
                      />
                    </div>
                    <div className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm">
                      <Field
                        className="block w-full text-gray-900 appearance-none rounded-b-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                        type={`${visible ? 'text' : 'password'}`}
                        name="password"
                        placeholder="Contraseña"
                      />
                      <button type="button" onClick={isVisible} className="absolute inset-y-0 right-0 p-2 text-black">
                        {visible ? <Visibility visible /> : <Visibility />}
                      </button>
                    </div>
                    {error && <div className="p-2 text-red-400">{ERROR_MSG}</div>}
                    <ErrorMessage name="username">
                      {(msg) => <div className="p-2 text-red-400">{msg}</div>}
                    </ErrorMessage>
                    <ErrorMessage name="password">
                      {(msg) => <div className="p-2 text-red-400">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="pb-8 border-b-2 border-gray-400 ">
                    {loading ? (
                      <button
                        type="button"
                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md disabled group hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled
                      >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <Loader className="w-10 h-10 mr-3" />
                        </span>
                        {REGISTERING}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md group hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="w-5 h-5 text-gray-500 group-hover:text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                        {REGISTER}
                      </button>
                    )}
                    {google && (
                      <GoogleLogin
                        clientId={ID_GOOGLE}
                        render={(renderProps) => (
                          <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="relative flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-black bg-white border border-transparent border-black rounded-md border-1 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                className="w-5 h-5 text-gray-200 group-hover:text-gray-200"
                              >
                                <g>
                                  <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                  ></path>
                                  <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                  ></path>
                                  <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                  ></path>
                                  <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                  ></path>
                                  <path fill="none" d="M0 0h48v48H0z"></path>
                                </g>
                              </svg>
                            </span>
                            {LOGIN_WITH_GOOGLE}
                          </button>
                        )}
                        onSuccess={loginGoogle}
                        onFailure={loginGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    )}
                  </div>
                  <div className="flex justify-center w-full">
                    <Link className="text-center text-stone-900" to="/login">
                      {LOGIN_ACCOUNT},
                      <p className="font-semibold underline text-stone-800 decoration-1">inicia sesión aquí</p>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
