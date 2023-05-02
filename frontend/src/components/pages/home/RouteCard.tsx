import React, { useState } from 'react';
import { Box, Heading, Text, Image, Skeleton, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type RouteCardProps = {
  name: string;
  path: string;
  image: string;
  description: string;
};

const RouteCard: React.FC<RouteCardProps> = ({ name, path, image, description }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const maxImageHeight = 500;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'lg', textDecoration: 'none' }}
    >
      <Link to={path}>
        <AspectRatio maxH={maxImageHeight} height={maxImageHeight}>
          <Skeleton isLoaded={imageLoaded}>
            <Image
              src={image}
              alt={name}
              objectFit="cover"
              height={maxImageHeight}
              width="100%"
              onLoad={() => setImageLoaded(true)}
            />
          </Skeleton>
        </AspectRatio>
        <Box p={6}>
          <Heading size="md" mb={2}>
            {name}
          </Heading>
          <Text>{description}</Text>
        </Box>
      </Link>
    </Box>
  );
};

export default RouteCard;
