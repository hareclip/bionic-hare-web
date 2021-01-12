import { createContext, useContext } from 'react';

export const CategoryContext = createContext();

export function useCategories() {
  return useContext(CategoryContext);
}