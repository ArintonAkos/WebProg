import { useToast } from '@chakra-ui/react';

type ToastType = 'error' | 'success' | 'warning';

export interface CustomToastOptions {
  type: ToastType;
  title: string;
  description?: string;
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

  return ({ type, title, description }: CustomToastOptions) => {
    toast({
      title,
      description,
      status: type,
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      render: () => (
        <div
          style={{
            padding: '1rem',
            color: toastColors[type].color,
            backgroundColor: toastColors[type].bgColor,
            borderRadius: '4px',
            textAlign: 'left',
          }}
        >
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
      ),
    });
  };
};
