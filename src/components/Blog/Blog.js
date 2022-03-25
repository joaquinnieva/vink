import React from 'react';
import { IMG_JN } from '../../data/constants';

function Blog() {
  return (
    <div className="flex flex-wrap -m-12">
      <div className="flex flex-col items-start p-12 border border-gray-700">
        <span className="inline-block px-2 py-1 text-xs font-medium tracking-widest text-gray-400 text-opacity-75 bg-gray-700 rounded">
          BLOG
        </span>
        <h2 className="mt-4 mb-4 text-2xl font-medium text-white sm:text-3xl title-font">Proyecto Vink en fase BETA</h2>
        <p className="mb-8 leading-relaxed">
          Hola, gracias por leer mi publicación y el interés, el despliegue de la aplicacion esta en fase beta, esto
          significa que puede haber errores en funcionamiento o vistas, cualquier cosa se puede reportar en mis redes
          profesionales, que hay en mi perfil de Vink o en el footer de esta landing page.
          <br /> Próximo feature: iniciar sesión con Google
          <br /> P.D. Para ver mi perfil dale click a mi nombre aca abajo...
        </p>
        <a href="user/joaquinnieva" className="inline-flex items-center">
          <img alt="blog" src={IMG_JN} className="flex-shrink-0 object-cover object-center w-12 h-12 rounded-full" />
          <span className="flex flex-col flex-grow pl-4">
            <span className="font-medium text-white title-font">Joaquín Nieva</span>
            <span className="text-gray-500 text-xs tracking-widest mt-0.5">Desarrollador web</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Blog;
