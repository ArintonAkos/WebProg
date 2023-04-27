export const DefaultState: CustomRootState = {
  status: 'idle',
  error: undefined,
  requestStatus: undefined,
};

export interface CustomRootState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  requestStatus?: {
    type?: 'success' | 'error' | 'warning';
    description?: string;
    showToast?: boolean;
    title?: string;
  };
}
