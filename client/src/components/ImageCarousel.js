import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const { animals, loading } = useAppContext();

  const prevHandler = () => {
    setIndex((index) => checkIndex(index - 1));
  };

  const nextHandler = () => {
    setIndex((index) => checkIndex(index + 1));
  };

  const randomIndexHandler = (index) => {
    let randomIndex = Math.floor(Math.random() * animals.length);
    randomIndex = randomIndex === index ? randomIndex + 1 : randomIndex;
    return randomIndex;
  };

  const checkIndex = (number) => {
    const randomIndex = randomIndexHandler(number);
    if (randomIndex > animals.length - 1) {
      return 0;
    }
    if (randomIndex < 0) {
      return animals.length - 1;
    }
    return randomIndex;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <article className="img-container">
        <img
          src={animals[index].photo_url}
          alt="animal"
          className="animal-img"
        />

        <div className="left-button-container">
          <button className="prev-btn" onClick={prevHandler}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="right-button-container">
          <button className="next-btn" onClick={nextHandler}>
            <FaChevronRight />
          </button>
        </div>
      </article>
    </>
  );
};

export default ImageCarousel;
