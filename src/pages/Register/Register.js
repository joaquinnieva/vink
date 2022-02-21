import { LockClosedIcon } from '@heroicons/react/solid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
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
      <section className="w-screen h-screen">
        <div className="absolute left-0 top-0 p-6 text-white">
          <Link to="/home">
            <Backarrow />
          </Link>
        </div>
        <div className="min-h-full  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-5 rounded">
            <div>
              <div className="mx-auto h-auto w-auto flex justify-center">
                <VinkIcon colour={GRIS_OSCURO} height={70} width={400} complete />
              </div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">{REGISTER_PAGE}</h2>
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
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <Field
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        autoComplete="off"
                      />
                    </div>
                    <div className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm">
                      <Field
                        className="appearance-none block w-full text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                        type={`${visible ? 'text' : 'password'}`}
                        name="password"
                        placeholder="Contraseña"
                      />
                      <button type="button" onClick={isVisible} className="text-black absolute inset-y-0 right-0 p-2">
                        {visible ? <Visibility visible /> : <Visibility />}
                      </button>
                    </div>
                    {error && <div className="text-red-400 p-2">{ERROR_MSG}</div>}
                    <ErrorMessage name="username">
                      {(msg) => <div className="text-red-400 p-2">{msg}</div>}
                    </ErrorMessage>
                    <ErrorMessage name="password">
                      {(msg) => <div className="text-red-400 p-2">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="pb-8 border-b-2 border-gray-400 ">
                    {loading ? (
                      <button
                        type="button"
                        className="disabled group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-2">
                          <Loader className="h-10 w-10 mr-3" />
                        </span>
                        {REGISTERING}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
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
                            className="mt-3 border-1 border-black group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                className="h-5 w-5 text-gray-200 group-hover:text-gray-200"
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
                  <div className="w-full flex justify-center">
                    <Link className="text-stone-900 text-center" to="/login">
                      {LOGIN_ACCOUNT},
                      <p className="text-stone-800 underline font-semibold decoration-1">inicia sesión aquí</p>
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
