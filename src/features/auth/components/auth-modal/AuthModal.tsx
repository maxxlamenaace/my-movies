import React, { useState, ChangeEvent } from 'react';

import { Modal, Box, Stack, TextField, Button, Typography } from '@mui/material';

import { Logo } from '@/features/common';

type Props = {
  isOpen?: boolean;
  onSubmit: (username: string) => void;
};

const AuthModal: React.FC<Props> = ({ isOpen = false, onSubmit }) => {
  const [username, setUsername] = useState('');

  const onChange = (value: string) => {
    setUsername(value);
  };

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}
      >
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Stack spacing={2}>
              <Logo />

              <Stack spacing={2}>
                <Typography variant='body1' fontWeight='700'>
                  Please enter your username 👇
                </Typography>
                <TextField
                  id='auth-modal-text-field'
                  placeholder='Username'
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    onChange(e.target.value);
                  }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  id='auth-modal-submit-button'
                  disabled={username.trim().length === 0}
                  onClick={() => onSubmit(username)}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
