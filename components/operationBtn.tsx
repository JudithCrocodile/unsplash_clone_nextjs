import * as React from 'react';
import { styled } from '@mui/material/styles';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';



const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  border: '1px solid rgb(209, 209, 209)',
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 1px 0px',
  color: '#767676',
  borderRadius: '4px',
  padding: '0 11px',
  height: '32px',
  transition: 'all 0.2s',
  fontSize: '14px',
  backgroundColor: 'white',
  '&:hover': {
    zIndex: 1,
    border: '1px solid #111',
    color: '#111',
  },
  '& .MuiSvgIcon-root': {
    width: '20px',
    height: '20px',
  }
}));




export default function ButtonBaseDemo({ children, className }) {
  return (
    <ImageButton
        focusRipple
        className={`${className}`}
    >
        <main>{children}</main>
    </ImageButton>
  );
}
