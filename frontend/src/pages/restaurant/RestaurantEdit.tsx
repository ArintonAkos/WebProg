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

  const [images, setImages] = useState<Array<File>>([]);

  const [deletedImages, setDeletedImages] = useState<Array<string>>([]);

  const formFields = useMemo(() => {
    if (restaurant) {
      return editFieldsProps({ methods }).map((field) => {
        const fieldName = field.name as keyof Restaurant;

        return {
          ...field,
          placeHolder: restaurant[fieldName] as string | undefined,
          value: restaurant[fieldName] as string | undefined,
        };
      });
    } else {
      return editFieldsProps({ methods });
    }
  }, [restaurant, methods]);

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      dispatch(clearEditedRestaurantData());
      navigate('/');
    }

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
  }, [status, restaurant, showToast, navigate, dispatch, editedRestaurant]);

  const handleUploadedFiles = (files: File[]) => {
    setImages([...files]);
  };

  const handleDeletedFile = (file: File | string, type: 'new' | 'existing') => {
    if (type === 'existing') {
      setDeletedImages([...deletedImages, file as string]);
    } else {
      setImages(images.filter((imageFile) => imageFile !== file));
    }
  };

  const handleSubmit = async (submittedData: RestaurantCreateFormData) => {
    try {
      console.log(images, {
        ...submittedData,
        deletedImages: deletedImages ?? [],
        images: images,
      });

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
    } catch (error) {
      console.error('Error editing restaurant:', error);
    }
  };

  const existingImages = restaurant?.images?.filter((image) => deletedImages.includes(image)) || [];

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
                  key="imageUpload"
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
