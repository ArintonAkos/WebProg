import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Box, Button, Flex, FormLabel } from '@chakra-ui/react';
import Input from '../../form/elements/Input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

type TableFieldsProps = {
  methods: UseFormReturn<any>;
  name: string;
  label: string;
};

const TableFields: React.FC<TableFieldsProps> = ({ methods, name, label }) => {
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name });
  const tables = useSelector((state: RootState) => state.restaurant.editRestaurant?.tables ?? []);

  useEffect(() => {
    if (tables.length > 0) {
      for (const table of tables) {
        append({
          number: table.number,
          seats: table.seats,
        });
      }
    }
  }, [tables, append]);

  return (
    <Box>
      {label && <FormLabel>{label}</FormLabel>}
      {fields.map((item, index) => (
        <Flex key={item.id} justify="space-between" alignItems="flex-end" mb={4}>
          <Box width="45%" mr={4}>
            <Controller
              name={`${name}.${index}.number`}
              control={control}
              rules={{
                validate: (value: any) => {
                  const isTableNumberUnique = fields.every(
                    (field: any, fieldIndex) => fieldIndex === index || field.number !== value,
                  );

                  return isTableNumberUnique || 'This table number already exists in the current restaurant.';
                },
              }}
              render={({ field }) => (
                <Input field={field as any} label="Number" type="number" autoComplete="off" isRequired />
              )}
            />
          </Box>
          <Box width="45%" mr={4}>
            <Controller
              name={`${name}.${index}.seats`}
              control={control}
              render={({ field }) => (
                <Input field={field as any} label="Seats" type="number" autoComplete="off" isRequired />
              )}
            />
          </Box>
          <Button onClick={() => remove(index)}>Remove</Button>
        </Flex>
      ))}
      <Button mt={4} onClick={() => append({ number: '', seats: '' })}>
        Add
      </Button>
    </Box>
  );
};

export default TableFields;
