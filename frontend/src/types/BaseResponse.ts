type BaseResponse = {
  type?: 'success' | 'error' | 'warning' | 'info';
  description?: string;
  showToast?: boolean;
  title?: string;
};

export default BaseResponse;
