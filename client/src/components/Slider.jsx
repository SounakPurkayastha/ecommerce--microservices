import { useState, useEffect } from "react";
import styled from "styled-components";

const SlideContainer = styled.div`
  display: flex;
  position: relative;
  height: 600px;
  overflow: hidden;
`;

const Slide = styled.img`
  position: absolute;
  top: 0;
  left: ${(props) => `${(props.index - props.current) * 100}%`};
  width: 100vw;
  max-height: 100%;
  transition: 300ms all ease;
  object-fit: cover;
`;

const Slider = () => {
  const [current, setCurrent] = useState(0);
  let timer;

  const slideImages = [
    "https://www.ibanez.com/images/index/mainSlide/top_NAMM2022.jpg",
    "https://www.ibanez.com/images/index/mainSlide/top_SR35th.jpg",
    "https://www.ibanez.com/images/index/mainSlide/top_EHB1265MS.jpg",
  ];

  const nextSlide = () => {
    setCurrent((current) => (current + 1) % slideImages.length);
  };

  useEffect(() => {
    timer = setInterval(nextSlide, 5000);
  }, []);

  return (
    <SlideContainer>
      {slideImages.map((src, i) => (
        <Slide key={i} src={src} index={i} current={current} />
      ))}
    </SlideContainer>
  );
};

export default Slider;
