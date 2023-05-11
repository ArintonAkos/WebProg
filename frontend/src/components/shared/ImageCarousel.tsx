import React, { useState } from 'react';
import { Box, Image, Skeleton } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { API_BASE_URL } from '../../services/httpRequest';

const CarouselImage: React.FC<{ image: string; index: number }> = ({ image, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Skeleton isLoaded={imageLoaded}>
      <Image
        src={image}
        alt={`Image ${index + 1}`}
        objectFit="cover"
        h="400px"
        w="full"
        onLoad={() => setImageLoaded(true)}
      />
    </Skeleton>
  );
};

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => (
  <Box w="full" boxShadow="lg" borderRadius="lg" overflow="hidden">
    <Carousel showStatus={false} showThumbs={false} infiniteLoop>
      {images.map((image_path, index) => (
        <div key={index}>
          <CarouselImage image={`${API_BASE_URL}${image_path}`} index={index} />
        </div>
      ))}
    </Carousel>
  </Box>
);

export default ImageCarousel;
