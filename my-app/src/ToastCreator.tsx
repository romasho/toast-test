import React from 'react';
import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toastStore, ToastType, IToastProps, AnimationType } from 'romasho-toast-lib';

const initialState = {
  message: '',
  description: '',
  type: ToastType.success,
  Animation: AnimationType.startX,
  fontSize: 32,
  delay: 3000,
  width: 660,
  height: 180,
  margin: 16,
};

function ToastCreator() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IToastProps>({
    defaultValues: initialState,
  });

  const onSubmit = async ({
    message,
    description,
    type,
    fontSize,
    animation,
    delay,
    width,
    height,
    margin,
  }: IToastProps) => {
    toastStore.addToast(
      {
        message,
        description,
        type,
        fontSize,
        animation,
        width,
        height,
        margin,
      },
      delay
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={500}>
      <Typography variant="h5" sx={{ fontWeight: 500 }} align="center">
        {'Chose option'}
      </Typography>
      <TextField
        label={'Message'}
        sx={{ mb: 2, mt: 2, flexGrow: 1 }}
        fullWidth
        {...register('message', { required: 'no message' })}
        error={!!errors.message}
        helperText={errors.message?.message}
      />
      <TextField multiline label={'fontSize'} fullWidth sx={{ mb: 2 }} {...register('fontSize')} />
      <TextField multiline label={'delay'} fullWidth sx={{ mb: 2 }} {...register('delay')} />
      <TextField
        multiline
        rows={2}
        label={'description'}
        fullWidth
        sx={{ mb: 2 }}
        {...register('description')}
      />
      <TextField select inputProps={register('type')} fullWidth label="Toast type">
        {Object.keys(ToastType).map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        inputProps={register('animation')}
        fullWidth
        label="Animation type"
        sx={{ m: '16px auto' }}
      >
        {Object.keys(AnimationType).map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        multiline
        label={'width'}
        sx={{ width: '48%', paddingRight: '4%' }}
        {...register('width')}
      />
      <TextField multiline label={'height'} sx={{ width: '48%' }} {...register('height')} />
      <Button
        type="submit"
        variant="contained"
        sx={{ width: '75%', display: 'flex', flexShrink: 0, m: '16px auto' }}
      >
        {'create'}
      </Button>
    </Box>
  );
}

export default ToastCreator;
