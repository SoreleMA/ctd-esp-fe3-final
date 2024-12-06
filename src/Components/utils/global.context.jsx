import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';

// Estado inicial del contexto
export const initialState = {
  theme: 'light', // Tema inicial (puede ser 'light' o 'dark')
  dentists: [], // Lista de dentistas
  favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Favoritos almacenados en localStorage
};

// Función reductora para manejar las acciones sobre el estado
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME': // Cambiar el tema (claro/oscuro)
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_DENTISTS': // Establecer la lista de dentistas desde la API
      return {
        ...state,
        dentists: action.payload,
      };
    case 'ADD_FAV': // Agregar un dentista a favoritos
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };
    case 'REMOVE_FAV': // Eliminar un dentista de favoritos
      const filteredFavorites = state.favorites.filter(dentist => dentist.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      return {
        ...state,
        favorites: filteredFavorites,
      };
    default:
      return state;
  }
};

// Creación del contexto global
export const ContextGlobal = createContext(undefined);

// Proveedor del contexto global
export const ContextProvider = ({ children }) => {
  // Inicialización del hook useReducer para manejar el estado global
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect para cargar los dentistas desde la API cuando la app se inicie
  useEffect(() => {
    axios.get('https://api.example.com/dentists') // Reemplaza con tu API
      .then(response => {
        dispatch({ type: 'SET_DENTISTS', payload: response.data });
      })
      .catch(error => console.log(error));
  }, []);

  // Memoización del valor del contexto para optimizar las actualizaciones
  const contextValue = useMemo(() => ({
    state,
    dispatch,
  }), [state]);

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};
