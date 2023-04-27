import { Box, useToast } from '@chakra-ui/react';

type ToastType = 'error' | 'success' | 'warning';

export interface CustomToastOptions {
  type: ToastType | undefined;
  title: string;
  description?: string;
  isClosable?: boolean;
}

const toastColors = {
  error: {
    bgColor: 'red.500',
    color: 'white',
  },
  success: {
    bgColor: 'green.500',
    color: 'white',
  },
  warning: {
    bgColor: 'yellow.500',
    color: 'black',
  },
};

export const useCustomToast = () => {
  const toast = useToast();

  return ({ type, title, description, isClosable }: CustomToastOptions) => {
    if (!type) {
      return;
    }

    const id = title + description;

    if (!toast.isActive(id)) {
      toast({
        id: id,
        title,
        description,
        status: type,
        duration: 2500,
        isClosable: isClosable,
        position: 'top-right',
        render: () => (
          <Box color={toastColors[type].color} bg={toastColors[type].bgColor} p={4} borderRadius={4}>
            <strong>{title}</strong>
            {description && <p>{description}</p>}
          </Box>
        ),
      });
    }
  };
};
