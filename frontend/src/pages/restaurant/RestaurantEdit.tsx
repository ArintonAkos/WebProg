import React, { useEffect, useState } from 'react';
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
import Form, { FormFieldProps } from '../../components/form';
import { AddRestaurantFormData } from './AddRestaurantForm';
import Restaurant from '../../models/restaurant';
import { clearEditedRestaurantData } from '../../reducers/restaurantReducer';
import { useForm } from 'react-hook-form';

const fields: Array<FormFieldProps> = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeHolder: 'Arinton Akos',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    required: true,
    placeHolder: 'Kolozsvar',
  },
  {
    name: 'street',
    label: 'Street',
    type: 'text',
    required: true,
    placeHolder: 'Farkas utca',
  },
  {
    name: 'number',
    label: 'Number',
    type: 'text',
    required: true,
    placeHolder: '5',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: true,
    placeHolder: '(+40) 712 345 678',
  },
  {
    name: 'openingHours',
    label: 'Opening Hours',
    type: 'text',
    required: true,
    placeHolder: '8:00 - 16:00',
  },
];

const RestaurantEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, error } = useStateHandling('restaurant');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const restaurant = useSelector((state: RootState) => state.restaurant.restaurant.details, shallowEqual);
  const editedRestaurant = useSelector((state: RootState) => state.restaurant.editRestaurant);
  const showToast = useCustomToast();
  const [images, setImages] = useState<Array<File>>([]);
  const [formFields, setFormFields] = useState(fields);
  const methods = useForm();

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (restaurant) {
      const updatedFields = fields.map((field) => {
        const fieldName = field.name as keyof Restaurant;

        return {
          ...field,
          placeHolder: restaurant[fieldName] as string | undefined,
          value: restaurant[fieldName] as string | undefined,
        };
      });

      setFormFields(updatedFields);
    }
  }, [restaurant]);

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

  const handleSubmit = async (submittedData: AddRestaurantFormData) => {
    submittedData.images = [...images];

    try {
      await dispatch(
        editRestaurant({
          id: id!,
          restaurant: submittedData,
        }),
      );
    } catch (error) {
      console.error('Error editing restaurant:', error);
    }
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
              element: <ImageUpload onUploadedFiles={handleUploadedFiles} key="imageUpload" files={images} />,
            },
          ]}
        />
      </Container>
    </StatusHandler>
  );
};

export default RestaurantEditPage;
