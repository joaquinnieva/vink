import { Link } from 'react-router-dom';
import VinkIcon from '../VinkIcon/VinkIcon';

function Footer({ position = 'bottom' }) {
  return (
    <nav className={`bg-gray-800 w-screen ${position === 'bottom' ? 'hidden' : 'fixed top-0'}`}>
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center h-16 m-2 ${
            position === 'bottom' ? 'justify-center' : 'justify-start'
          }`}
        >
          <div className="flex justify-start">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="block w-auto h-10">
                <VinkIcon className="drop-shadow-2xl" height={40} width={120} text logo />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
