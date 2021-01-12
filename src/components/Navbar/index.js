import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useCategories } from 'context/category';
import siteInfo from 'config/siteInfo.json';

export default function Navbar() {

  const { categories } = useCategories();

  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle mobile menu
   */
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-100 bg-red-500 text-white p-5">

      <h1 className="text-5xl font-extrabold mb-5 hidden md:block">{siteInfo.name}</h1>

      <nav className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold md:hidden">{siteInfo.name}</h1>
        <div className="md:hidden flex w-full justify-end">
          <button onClick={toggle}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex md:justify-between md:flex-grow items-center">
          <ul className="flex flex-row justify-between">
            <li className="mr-5 text-lg font-semibold"><Link to="/">All</Link></li>
            {categories.map(({ id, label }) => (
              <li key={id} className="mr-5 text-lg font-semibold"><Link to={`/categories/${id}`}>{label}</Link></li>
            ))}
            <li className="mr-5 text-lg font-semibold"><Link to="/archive">Archive</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen
        ? (
          <div className="md:hidden">
            <ul className="flex flex-col">
              <li className="mr-5 mt-5 text-lg font-semibold">
                <Link to="/" onClick={() => setIsOpen(false)}>All</Link>
              </li>
              {categories.map(({ id, label }) => (
                <li key={id} className="mr-5 mt-5 text-lg font-semibold">
                  <Link to={`/categories/${id}`} onClick={() => setIsOpen(false)}>{label}</Link>
                </li>
              ))}
              <li className="mr-5 mt-5 text-lg font-semibold">
                <Link to="/archive" onClick={() => setIsOpen(false)}>Archive</Link>
              </li>
            </ul>
          </div>
        )
        : <></>}
    </div>

  );
}