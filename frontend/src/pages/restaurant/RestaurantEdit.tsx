import React, { useEffect, useState } from 'react';
import { Text, Container } from '@chakra-ui/react';
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
  const restaurant = useSelector((state: RootState) => state.restaurant.data, shallowEqual);
  const showToast = useCustomToast();
  const [images, setImages] = useState<Array<File>>([]);
  const [formFields, setFormFields] = useState<Array<FormFieldProps>>(fields);

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, []);

  useEffect(() => {
    if (restaurant) {
      const updatedFields = fields.map((field) => {
        return {
          ...field,
          placeHolder: restaurant[field.name],
          value: restaurant[field.name],
        };
      });

      console.log(updatedFields);
      setFormFields(updatedFields);
    }
  }, [restaurant]);

  if (status === 'failed') {
    navigate('/');
  }

  if (status === 'succeeded' && !restaurant) {
    showToast({
      title: 'Warning',
      type: 'warning',
      description: 'Restaurant not found',
      isClosable: true,
    });
    navigate('/');
  }

  const handleUploadedFiles = (files: File[]) => {
    setImages([...files]);
  };

  const handleSubmit = async (data: AddRestaurantFormData) => {
    data.images = [...images];
    try {
      await dispatch(
        editRestaurant({
          id: id!,
          restaurant: data,
        }),
      );

      navigate(`/restaurants/${id}`);
    } catch (error) {
      console.error('Error editing restaurant:', error);
    }
  };

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Upload Images
        </Text>
        <Form
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
