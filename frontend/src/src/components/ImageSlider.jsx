// filepath: /c:/Users/dell/OneDrive/Desktop/PDS/src/src/components/ImageSlider.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const images = [
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1164298.jpg&f=1&nofb=1&ipt=0920099b8153798b8b503427b9fe39c2132b971bb3fba27fba0ab4d6b846b7d3&ipo=images',
'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp7526066.jpg&f=1&nofb=1&ipt=0476cd08ef065301725031016ea4ea80a23e222b2bac7bffeb95b9c1eeb09a94&ipo=images',
 
'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thestatesman.com%2Fwp-content%2Fuploads%2F2021%2F12%2FiStock-806276128.jpg&f=1&nofb=1&ipt=594c080eed2f703ac966fd40818c9de6a74e9be479b43a7434ceca30a3cd6f58&ipo=images',
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 450px;
  overflow: hidden;
  border-radius: 50px;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderWrapper>
      {images.map((image, index) => (
        <Slide
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
    </SliderWrapper>
  );
};

export default ImageSlider;