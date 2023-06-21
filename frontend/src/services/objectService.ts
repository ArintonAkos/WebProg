type PlainObject = {
  [k: string]: any;
};

const appendFormData = <T extends PlainObject>(formData: FormData, data: T, parentKey?: string) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    if (Array.isArray(data)) {
      if (data.length) {
        data.forEach((item, index) => {
          const newKey = parentKey ? `${parentKey}[${index}]` : `${index}`;
          appendFormData(formData, item, newKey);
        });
      } else {
        formData.append(`${parentKey || 'array'}[]`, '');
      }
    } else {
      if (Object.keys(data).length) {
        Object.entries(data).forEach(([key, value]) => {
          const newKey = parentKey ? `${parentKey}[${key}]` : key;
          appendFormData(formData, value, newKey);
        });
      } else {
        formData.append(parentKey!, '');
      }
    }
  } else if (data instanceof File) {
    formData.append(parentKey!, data, data.name);
  } else {
    const value = data || '';
    formData.append(parentKey!, value.toString());
  }
};

export const objectToFormData = <T extends PlainObject>(object: T) => {
  const formData = new FormData();
  appendFormData(formData, object);
  return formData;
};
