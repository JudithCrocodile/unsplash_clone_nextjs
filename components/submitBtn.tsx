import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import React, { ReactNode } from 'react'

export default function SubmitBtn({ children, onClick }: {children: ReactNode, onClick?: () => void}) {
    const Btn = styled(ButtonBase)(({ theme }) => ({
        background: 'linear-gradient(to top, #0000 50%, #ffffff1a 100%), #111',
        color: '#fff',
        width: '100%',
        fontSize: '15px',
        height: '44px',
        lineHeight: '42px',
        paddingInline: '16px',
        borderRadius: '6px',
        '&:hover': {
            background: 'linear-gradient(to top, #0000 50%, #ffffff1a 100%), #222',
            boxShadow: '0 1px 2px #0000001a',
        },
        '&.MuiButtonBase-root': {
            margin: '0',
        }
    }));    

    return <Btn onClick={onClick}>{children}</Btn>
}

