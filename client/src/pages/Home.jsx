import { useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProductsGrid from "../components/ProductsGrid";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

const Searchbox = styled.div`
  height: 24px;
  width: 30%;
  background-color: aqua;
  margin: 30px auto;
`;

const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  font-size: 16px;
  outline: none;
`;

const Home = () => {
  const [search, setSearch] = useState("");
  const searchRef = useRef("");

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const scrollToSlider = () => {
    searchRef.current.scrollIntoView();
  };

  return (
    <>
      <Navbar />
      <Slider />
      <Searchbox>
        <SearchInput
          placeholder="Search"
          onChange={inputChangeHandler}
          ref={searchRef}
        />
      </Searchbox>
      <ProductsGrid search={search} scroll={scrollToSlider} />
    </>
  );
};

export default Home;
