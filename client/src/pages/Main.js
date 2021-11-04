import React from "react";

import ImageCarousel from "../components/ImageCarousel";
import CategoriesMenu from "../components/CategoriesMenu";
import { AppContextProvider } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

export default function Main() {
  const { authToken, error } = useAuthContext();
  if (error) {
    return (
      <div>
        <h4>There was an error</h4>
      </div>
    );
  }
  return (
    <>
      {authToken && (
        <AppContextProvider>
          <main className="container">
            <section>
              <div className="title">
                <h2>Animal Photos</h2>
                <div className="underline"></div>
                <CategoriesMenu />
              </div>
              <ImageCarousel />
            </section>
          </main>
        </AppContextProvider>
      )}
    </>
  );
}
