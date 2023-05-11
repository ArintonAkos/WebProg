import React from 'react';
import StatusHandler from '../../components/shared/StatusHandler';
import useStateHandling from '../../hooks/useStateHandling';
import { Container, TextareaProps } from '@chakra-ui/react';
import { splitByCapital } from '../../utils/stringUtils';
import { FormFieldProps } from '../../components/form';
import { CheckboxOptions } from '../../components/form/elements/CheckboxGroup';
import Form from '../../components/form';
import * as formJson from './data/form.json';

const mapToCheckboxOptions = (data: Array<any>): Array<CheckboxOptions> => {
  const options: Array<CheckboxOptions> = [];

  for (let i = 1; i < data[0].length; i++) {
    options.push({
      label: data[0][i],
      value: data[1][i],
    });
  }

  return options;
};

const toFormElement = (type: String, name: string, data: Array<any>): FormFieldProps => {
  const formElement: FormFieldProps = {
    name: name,
    label: data[0],
  };

  switch (type) {
    case 's':
      formElement.element = 'input';
      formElement.type = 'string';
      formElement.value = data[1];
      break;
    case 'ta':
      const splitName = name.split('_');
      let rowNumber: undefined | number = undefined;
      let columnNumber: undefined | number = undefined;

      if (splitName.length >= 3) {
        const [, row, column] = splitName;

        rowNumber = parseInt(row, 10);
        columnNumber = parseInt(column, 10);
      }

      const textAreaSettings: TextareaProps = {
        rows: rowNumber,
        cols: columnNumber,
      };

      formElement.element = 'textarea';
      formElement.value = data[1];
      formElement.settings = textAreaSettings;

      break;
    case 'cb':
      formElement.element = 'checkbox';
      formElement.value = data[1];

      break;
    default:
      const options: Array<CheckboxOptions> = mapToCheckboxOptions(data);

      formElement.element = 'checkboxgroup';
      formElement.options = options;
      break;
  }

  return formElement;
};

const toFormData = (inputJson: object): Array<FormFieldProps> => {
  const formData: Array<FormFieldProps> = [];

  Object.entries(inputJson).forEach(([key, value]) => {
    const [type, ...name] = splitByCapital(key);

    if (!type || type === 'default') {
      return;
    }

    let inputName: string = name.join();

    const formElement = toFormElement(type, inputName, value);

    formData.push(formElement);
  });

  return formData;
};

const formData: FormFieldProps[] = toFormData(formJson);

const FormPage: React.FC = () => {
  const { status, error } = useStateHandling('restaurant');

  const handleSubmit = (data: Object) => {
    const existingData = JSON.parse(localStorage.getItem('form') || '[]');

    localStorage.setItem('form', JSON.stringify([...existingData, data]));
  };

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Form fields={formData} onSubmit={handleSubmit}></Form>
      </Container>
    </StatusHandler>
  );
};

export default FormPage;
