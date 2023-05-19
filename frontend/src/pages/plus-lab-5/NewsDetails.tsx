import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, List, ListItem, Link } from '@chakra-ui/react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store';
import StatusHandler from '../../components/shared/StatusHandler';
import useStateHandling from '../../hooks/useStateHandling';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getNews } from '../../actions/newsAction';
import { useCustomToast } from '../../hooks/useCustomToast';
import ImageCarousel from '../../components/shared/ImageCarousel';

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = useSelector((state: RootState) => state.news.details, shallowEqual);
  const { status, error } = useStateHandling('news');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showToast = useCustomToast();

  useEffect(() => {
    if (!id) {
      navigate('/home');
      showToast({
        type: 'error',
        title: 'Error',
        description: 'Invalid news id',
        isClosable: true,
      });
    }
  }, [id]);

  useEffect(() => {
    dispatch(getNews(id));
  }, [dispatch, getNews, id]);

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={4} alignItems="start">
        <Heading>{news.news?.title}</Heading>
        <Text>{news.news?.content}</Text>
        {news.news?.imagePaths?.length && (
          <Box w="full">
            <ImageCarousel images={news.news.imagePaths!} />
          </Box>
        )}
        <Box>
          <Text fontWeight="bold">Similar news:</Text>
          <List styleType="disc">
            {news.similarNews.slice(0, 5).map((similarNew) => (
              <ListItem key={similarNew._id}>
                <Link href={`/news/${similarNew._id}`}>{similarNew.title}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </StatusHandler>
  );
};

export default NewsDetails;
