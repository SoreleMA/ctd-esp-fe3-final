// Favs.jsx

import React, { useContext, useEffect } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from "../Components/utils/global.context";

const Favs = () => {
  const { state, dispatch } = useContext(ContextGlobal);

  useEffect(() => {
    // Recupera los favoritos desde localStorage y actualiza el estado del contexto
    const currentFavs = JSON.parse(localStorage.getItem("favs")) || [];
    currentFavs.forEach(fav => dispatch({ type: "TOGGLE_FAV", payload: fav }));
  }, [dispatch]);

  return (
    <main className={state.theme === "dark" ? "dark" : "light"}>
      <h1>Dentists Favs</h1>
      <div className="card-grid">
        {state.favorites.map((fav) => (
          <Card key={fav.id} {...fav} />
        ))}
      </div>
    </main>
  );
};

export default Favs;

