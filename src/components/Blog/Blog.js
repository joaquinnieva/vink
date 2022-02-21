import React from 'react';
import { IMG_JN } from '../../data/constants';

function Blog() {
  return (
    <div className="flex flex-wrap -m-12">
      <div className="p-12 border border-gray-700 flex flex-col items-start">
        <span className="inline-block py-1 px-2 rounded bg-gray-700 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">
          BLOG
        </span>
        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">Proyecto Vink en fase BETA</h2>
        <p className="leading-relaxed mb-8">
          Hola, gracias por leer mi publicación y el interés, el despliegue de la aplicacion esta en fase beta, esto
          significa que puede haber errores en funcionamiento o vistas, cualquier cosa se puede reportar en mis redes
          profesionales, que hay en mi perfil de Vink o en el footer de esta landing page.
          <br /> Próximo feature: iniciar sesión con Google
        </p>
        <a href="user/joaquinnieva" className="inline-flex items-center">
          <img alt="blog" src={IMG_JN} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-white">Joaquín Nieva</span>
            <span className="text-gray-500 text-xs tracking-widest mt-0.5">Desarrollador web</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Blog;
