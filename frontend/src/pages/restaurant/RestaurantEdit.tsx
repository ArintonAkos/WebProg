import React, { useEffect, useMemo, useState } from 'react';
import { Container, Text } from '@chakra-ui/react';
import ImageUpload from '../../components/pages/restaurant/ImageUpload';
import { useNavigate, useParams } from 'react-router-dom';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import useAppDispatch from '../../hooks/useAppDispatch';
import { editRestaurant, fetchRestaurant } from '../../actions/restaurantActions';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useCustomToast } from '../../hooks/useCustomToast';
import Form from '../../components/form';
import Restaurant from '../../models/restaurant';
import { clearEditedRestaurantData } from '../../reducers/restaurantReducer';
import { useForm } from 'react-hook-form';
import { RestaurantCreateFormData } from '../../form-data/restaurant/RestaurantCreateFormData';
import { editFieldsProps } from '../../form-data/restaurant/RestaurantEditFormData';

const RestaurantEditPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showToast = useCustomToast();

  const { status, error } = useStateHandling('restaurant');
  const { id } = useParams<{ id: string }>();
  const methods = useForm();
  const restaurant = useSelector((state: RootState) => state.restaurant.restaurant.details, shallowEqual);
  const editedRestaurant = useSelector((state: RootState) => state.restaurant.editRestaurant);
  const restaurantImages = useSelector((state: RootState) => state.restaurant.restaurant.details?.images || []);

  const [images, setImages] = useState<Array<File>>([]);
  const [deletedImages, setDeletedImages] = useState<Array<string>>([]);

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, [id, dispatch]);

  const formFields = useMemo(
    () =>
      editFieldsProps({ methods }).map((field) => {
        const fieldName = field.name as keyof Restaurant;

        return {
          ...field,
          placeHolder: restaurant?.[fieldName] as string | undefined,
          value: restaurant?.[fieldName] as string | undefined,
        };
      }),
    [restaurant, methods],
  );

  useEffect(() => {
    if (status === 'succeeded' && editedRestaurant && !editedRestaurant._id) {
      showToast({
        title: 'Warning',
        type: 'warning',
        description: 'Restaurant not found',
        isClosable: true,
      });
    }

    if (status === 'succeeded' && editedRestaurant) {
      dispatch(clearEditedRestaurantData());
      navigate(`/restaurants/${editedRestaurant._id}`);
    }
  }, [status, showToast, navigate, editedRestaurant, dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      dispatch(clearEditedRestaurantData());
      navigate('/');
    }
  }, [status, dispatch, navigate]);

  const handleUploadedFiles = (newFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const existingImages = restaurantImages.filter((image) => !deletedImages.includes(image));

  const handleDeletedFile = (file: File | string, type: 'new' | 'existing') => {
    if (type === 'existing') {
      setDeletedImages((prevDeletedImages) => [...prevDeletedImages, file as string]);
    } else {
      setImages(images.filter((imageFile) => imageFile !== file));
    }
  };

  const handleSubmit = (submittedData: RestaurantCreateFormData) => {
    dispatch(
      editRestaurant({
        id: id!,
        restaurant: {
          ...submittedData,
          deletedImages: deletedImages ?? [],
          images: images,
        },
      }),
    );
  };

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Edit Restaurant
        </Text>
        <Form
          methods={methods}
          fields={formFields}
          onSubmit={handleSubmit}
          portals={[
            {
              index: formFields.length,
              element: (
                <ImageUpload
                  onUploadedFiles={handleUploadedFiles}
                  files={images}
                  onDeleteFile={handleDeletedFile}
                  existingImages={existingImages}
                />
              ),
            },
          ]}
        />
      </Container>
    </StatusHandler>
  );
};

export default RestaurantEditPage;
