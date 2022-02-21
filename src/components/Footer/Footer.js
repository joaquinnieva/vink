import { Link } from 'react-router-dom';
import VinkIcon from '../VinkIcon/VinkIcon';

function Footer({ position = 'bottom' }) {
  return (
    <nav className={`bg-gray-800 w-screen ${position === 'bottom' ? 'hidden' : 'fixed top-0'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center h-16 m-2 ${
            position === 'bottom' ? 'justify-center' : 'justify-start'
          }`}
        >
          <div className="flex justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="block h-10 w-auto">
                <VinkIcon className="drop-shadow-2xl" height={40} width={120} complete />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
