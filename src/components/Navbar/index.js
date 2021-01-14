import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SearchInput from 'components/SearchInput';
import { useCategories } from 'context/category';
import siteInfo from 'config/siteInfo.json';

/**
 * Site navbar
 */
export default function Navbar() {

  const { categories } = useCategories();

  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle mobile menu
   */
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-100 bg-red-500 text-white p-5">

      <Link className="hover:no-underline text-5xl font-extrabold mb-5 hidden xl:block" to="/">{siteInfo.name}</Link>

      <nav className="flex justify-between items-center">
        <Link className="hover:no-underline text-5xl font-extrabold xl:hidden" to="/">{siteInfo.name}</Link>
        <div className="xl:hidden flex w-full justify-end">
          <button onClick={toggle}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden xl:flex xl:justify-between xl:flex-grow items-center">
          <ul className="flex flex-row justify-between">
            <li className="mr-5 text-xl font-semibold"><Link to="/">All</Link></li>
            {categories.map(({ id, label }) => (
              <li key={id} className="mr-5 text-xl font-semibold"><Link to={`/categories/${id}`}>{label}</Link></li>
            ))}
            <li className="mr-5 text-xl font-semibold"><Link to="/archive">Archive</Link></li>
          </ul>
        </div>

        <div className="hidden xl:block">
          <SearchInput />
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen
        ? (
          <div className="xl:hidden">
            <ul className="flex flex-col">
              <li className="mr-5 mt-5 text-xl font-semibold">
                <Link to="/" onClick={() => setIsOpen(false)}>All</Link>
              </li>
              {categories.map(({ id, label }) => (
                <li key={id} className="mr-5 mt-5 text-xl font-semibold">
                  <Link to={`/categories/${id}`} onClick={() => setIsOpen(false)}>{label}</Link>
                </li>
              ))}
              <li className="mr-5 mt-5 text-xl font-semibold">
                <Link to="/archive" onClick={() => setIsOpen(false)}>Archive</Link>
              </li>
            </ul>
            <div className="mt-3">
              <SearchInput />
            </div>
          </div>
        )
        : <></>}
    </div>

  );
}