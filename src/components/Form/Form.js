/* eslint-disable react-hooks/exhaustive-deps */
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ADD_LINK,
  BG_COLOR,
  BUTTON,
  EDIT_PROFILE,
  MY_LINK,
  SAMPLE_BG,
  SAVE_PROFILE,
  TEXT_COLOR,
  USER_BG,
  USER_COLOR,
  USER_DESC,
  USER_LINK,
  USER_NAME,
  USER_PHOTO
} from '../../data/constants';
import { editUser } from '../../functions/apiService';
import { toBase64 } from '../../functions/fileToBlob';
import localAuth from '../../functions/localAuth';
import { prepareData } from '../../functions/prepareData';
import { login } from '../../redux/slice/authSlice';
import Loader from '../Loader/Loader';

const FormEdit = ({ data, close }) => {
  const [errorFile, setErrorFile] = useState(false);
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const buttonEditUser = async (infoUser) => {
    setLoading(true);
    const localstorage = JSON.parse(localAuth());
    if (localstorage) {
      const id = localstorage.id;
      const token = localstorage.token;
      const newUser = await editUser(id, infoUser, token);
      if (newUser) {
        const infoNewUser = {
          ...localstorage,
          image: infoUser.image || localstorage.image,
        };
        localAuth('login', infoNewUser);
        setLoading(false);
        dispatch(login(infoNewUser));
        close();
      }
    }
  };
  const dataOptions = data?.options[0];
  useEffect(() => {}, [buttonEditUser]);
  return (
    <div className="col-span-2 h-full overflow-auto rounded">
      <Formik
        initialValues={{
          name: '',
          description: data?.description || '',
          image: '',
          background: '',
          options: {
            color: dataOptions?.color || '#18181b',
            buttonColor: dataOptions?.buttonColor || '#ffffff',
            buttonText: dataOptions?.buttonText || '#000000',
            buttonRadius: dataOptions?.buttonRadius || 'rounded-none',
            textColor: dataOptions?.textColor || '#ffffff',
          },
          links: data?.links,
        }}
        onSubmit={(values) => {
          const infoUser = prepareData(values, image, background);
          buttonEditUser(infoUser);
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className="rounded-md">
              <div className="px-4 py-5 bg-gray-300 space-y-6 sm:p-6">
                {/* Imagenes */}
                <div className="flex justify-around flex-wrap px-1">
                  {/* Foto */}
                  <div className="pr-10">
                    <label className="block text-sm font-medium text-gray-700">{USER_PHOTO}</label>
                    <div className="mt-1 flex items-center">
                      <span className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-gray-500">
                        {image ? (
                          <img className="h-fit w-fit m-auto" src={image} alt="" />
                        ) : (
                          <img className="h-fit w-fit m-auto" src={data?.image} alt="" />
                        )}
                      </span>
                      <label className="cursor-pointer ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                        {EDIT_PROFILE}
                        <input
                          onChange={(event) => {
                            if (event.currentTarget.files[0].size < 4000000) {
                              toBase64(event.currentTarget.files[0]).then((data) => setImage(data));
                              setErrorFile(false);
                            } else {
                              setErrorFile(true);
                            }
                          }}
                          value={values.image}
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          name="image"
                        />
                      </label>
                    </div>
                  </div>
                  {/* Color */}
                  <div className="pr-10">
                    <label className="block text-sm font-medium text-gray-700">{USER_COLOR}</label>
                    <div className="mt-1 flex items-center">
                      <span
                        className="inline-block h-12 w-12 rounded border border-gray-400 overflow-hidden "
                        style={{ background: values.options.color }}
                      ></span>
                      <label
                        htmlFor="color"
                        className="cursor-pointer w-fit ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      >
                        {EDIT_PROFILE}
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.options.color}
                        name={`options.color`}
                        id="color"
                        type="color"
                        className="invisible absolute top-1/2"
                      />
                    </div>
                  </div>
                  {/* Portada */}
                  <div className="pr-10">
                    <label className="block text-sm font-medium text-gray-700">{USER_BG}</label>
                    <div className="mt-1 flex items-center">
                      <span className="flex justify-center items-center h-12 w-12 rounded overflow-hidden bg-gray-100">
                        {background ? (
                          <img className="h-fit w-fit" src={background} alt="" />
                        ) : data.background ? (
                          <img className="h-fit w-fit" src={data?.background} alt="" />
                        ) : (
                          <img className="h-fit w-fit" src={SAMPLE_BG} alt="" />
                        )}
                      </span>
                      <label className="cursor-pointer ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                        {EDIT_PROFILE}
                        <input
                          onChange={(event) => {
                            if (event.currentTarget.files[0].size < 4000000) {
                              toBase64(event.currentTarget.files[0]).then((data) => setBackground(data));
                              setErrorFile(false);
                            } else {
                              setErrorFile(true);
                            }
                          }}
                          value={values.background}
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          name="background"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorFile && <div className="text-red-400"> El archivo debe pesar menos de 4MB </div>}

                {/* Nombre */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {USER_NAME}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                        className="text-gray-600 focus:ring-vink-800 focus:border-vink-800 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 p-1"
                        name="name"
                        id="name"
                        placeholder={data.name}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    {USER_DESC}
                  </label>
                  <div className="mt-1 flex flex-row gap-2 items-start flex-wrap">
                    <textarea
                      onChange={handleChange}
                      value={values.description}
                      className="p-1 text-gray-600 shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      name="description"
                      autoComplete="off"
                      rows={5}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{TEXT_COLOR}</label>
                      <div className="mt-1 flex items-center">
                        <span
                          className="inline-block h-12 w-12 rounded border border-gray-400 overflow-hidden "
                          style={{ background: values.options.textColor }}
                        ></span>
                        <label
                          htmlFor="textColor"
                          className="cursor-pointer w-fit ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                        >
                          {EDIT_PROFILE}
                        </label>
                        <input
                          onChange={handleChange}
                          value={values.options.textColor}
                          name={`options.textColor`}
                          id="textColor"
                          type="color"
                          className="invisible absolute top-0 left-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enlaces */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label htmlFor="links" className="block text-sm font-medium text-gray-700">
                      {USER_LINK}
                    </label>
                    <div className="mt-1">
                      <FieldArray
                        name="links"
                        render={(arrayHelpers) => (
                          <div>
                            {values.links && values.links.length > 0 ? (
                              values.links.map((link, index) => (
                                <div key={index}>
                                  <div className="flex flex-row m-1 justify-between">
                                    <Field
                                      autoComplete="off"
                                      placeholder="Title"
                                      className="text-gray-600 shadow-sm focus:ring-vink-800 focus:border-vink-800 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 p-1"
                                      name={`links.${index}.title`}
                                    />
                                    <Field
                                      autoComplete="off"
                                      placeholder="http://example.com"
                                      className="text-gray-600 shadow-sm focus:ring-vink-800 focus:border-vink-800 flex-1 block w-full rounded-md sm:text-sm border border-gray-300 p-1"
                                      name={`links.${index}.link`}
                                    />
                                    <button
                                      className={`text-black ml-1 ${index === 0 && 'invisible'}`}
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      &#10006;
                                    </button>
                                  </div>
                                  {index === values.links.length - 1 && (
                                    <button
                                      className="p-1 m-2 w-full"
                                      type="button"
                                      onClick={() => arrayHelpers.insert(index + 1, '')}
                                    >
                                      <span className="bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold p-1 border border-gray-400 rounded-none">
                                        &#10011;
                                      </span>
                                    </button>
                                  )}
                                </div>
                              ))
                            ) : (
                              <button
                                className="bg-gray-600 hover:bg-gray-500 hover:text-gray-300 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                type="button"
                                onClick={() => arrayHelpers.push('')}
                              >
                                {ADD_LINK}
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Boton */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">{BUTTON}</label>
                  <div className="mt-1 flex items-center flex-wrap justify-start sm:justify-around">
                    <span
                      className={`bg-gray-200 text-black drop-shadow-md rounded py-3 px-16 m-4 whitespace-nowrap w-100 ${values.options.buttonRadius}`}
                      style={{ background: values.options.buttonColor, color: values.options.buttonText }}
                    >
                      {MY_LINK}
                    </span>
                    <label
                      htmlFor="buttonColor"
                      className="my-2 cursor-pointer w-fit ml-5 bg-white py-2 px-3 whitespace-nowrap border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    >
                      {BG_COLOR}
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.options.buttonColor}
                      name={`options.buttonColor`}
                      id="buttonColor"
                      type="color"
                      className="invisible"
                    />
                    <label
                      htmlFor="buttonText"
                      className="my-2 cursor-pointer w-fit ml-5 bg-white py-2 px-3 whitespace-nowrap border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    >
                      {TEXT_COLOR}
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.options.buttonText}
                      name={`options.buttonText`}
                      id="buttonText"
                      type="color"
                      className="invisible"
                    />
                    <Field
                      as="select"
                      name={`options.buttonRadius`}
                      className="my-2 cursor-pointer w-fit ml-5 bg-white py-2 px-3 whitespace-nowrap border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      id="buttonRadius"
                      placeholder="Radio de botón"
                      value={values.options.buttonRadius}
                    >
                      <option value="" disabled>
                        Radio de botón
                      </option>
                      <option value="rounded-none">1</option>
                      <option value="rounded">2</option>
                      <option value="rounded-full">3</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Boton Guardar */}
              <div className="px-4 py-3 bg-gray-300 text-right sm:px-6">
                {loading ? (
                  <>
                    <button
                      type="submit"
                      className="button-form inline-flex items-center justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    >
                      <p className="hidden">{SAVE_PROFILE}</p>
                      <Loader className="h-6 w-6 text-white" />
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="button-form inline-flex justify-center items-center px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    {SAVE_PROFILE}
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormEdit;
