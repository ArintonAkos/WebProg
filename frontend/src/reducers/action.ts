export interface ActionWithCommonProps {
  type: string;
  description?: string;
  showToast?: boolean;
  title?: string;
  error?: string;
}
