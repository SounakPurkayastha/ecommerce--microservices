import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 620px);
  column-gap: 30px;
  row-gap: 50px;
  justify-content: center;
  margin: 80px auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaginationButtonsContainer = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
`;

const PaginationButton = styled.button`
  position: absolute;
  top: -40px;
  left: ${(props) => props.type === "prev" && "20px"};
  right: ${(props) => props.type === "next" && "20px"};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const ProductsGrid = (props) => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  const getData = () => {
    fetch(`http://localhost:8000/products?search=${props.search}&page=${page}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    setData(null);
    getData();
  }, [props.search, page]);

  useEffect(() => {
    setPage(1);
  }, [props.search]);

  const nextPage = () => {
    setPage((page) => page + 1);
    props.scroll();
  };

  const prevPage = () => {
    setPage((page) => page - 1);
    props.scroll();
  };

  const renderPaginationButtons = () => {
    return (
      <PaginationButtonsContainer>
        {data.hasPrevPage && (
          <PaginationButton type="prev" onClick={prevPage}>
            <ChevronLeftIcon />
          </PaginationButton>
        )}
        {data.hasNextPage && (
          <PaginationButton type="next" onClick={nextPage}>
            <ChevronRightIcon />
          </PaginationButton>
        )}
      </PaginationButtonsContainer>
    );
  };

  const renderProducts = () => {
    if (data.products.length === 0)
      return <Container>No products found</Container>;
    else
      return (
        <>
          <Grid>
            {data.products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </Grid>
          {renderPaginationButtons()}
        </>
      );
  };

  if (!data) return <Loading />;
  return <>{renderProducts()}</>;
};

export default ProductsGrid;
