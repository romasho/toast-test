import React, { useState } from 'react';
import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ToastPosition, ToasterType, Toaster } from 'romasho-toast-lib';

const initialState = { margin: 16, position: ToastPosition.bottomLeft };

function ToasterCreator() {
  const [ToasterProps, setToasterProps] = useState<ToasterType>();
  const { register, handleSubmit } = useForm<ToasterType>({
    defaultValues: initialState,
  });

  const onSubmit = async ({ position, margin }: ToasterType) => {
    setToasterProps({
      margin,
      position,
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
        <Typography variant="h5" sx={{ fontWeight: 500 }} align="center">
          {'Set toaster settings'}
        </Typography>
        <TextField
          label={'margin'}
          sx={{ mb: 2, mt: 2, flexGrow: 1 }}
          fullWidth
          {...register('margin')}
        />
        <TextField select inputProps={register('position')} fullWidth label="Position">
          {Object.values(ToastPosition).map((el) => (
            <MenuItem value={el} key={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '75%', display: 'flex', flexShrink: 0, m: '16px auto' }}
        >
          {'Set'}
        </Button>
      </Box>
      <Toaster position={ToasterProps?.position} margin={ToasterProps?.margin} />
    </>
  );
}

export default ToasterCreator;
