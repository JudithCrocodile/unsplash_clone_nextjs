import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';







export default function OperationBtn({ onClick, children, className, line=false, activeLike=false  }: {
    children?: ReactNode, className?: string, line?: boolean,  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, activeLike?: boolean
}) {

    const OperationBtn = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        border: line ? '1px solid rgb(209, 209, 209)' : '',
        boxShadow: line ? 'rgba(0, 0, 0, 0.08) 0px 1px 1px 0px' : '',
        color: '#767676',
        borderRadius: '4px',
        padding: '0 11px',
        height: '32px',
        transition: 'all 0.2s',
        fontSize: '14px',
        backgroundColor: 'white',
        '&:hover': {
            zIndex: 1,
            border: line ? '1px solid #111' : '',
            color: '#111',
        },
        '& .MuiSvgIcon-root': {
            width: '20px',
            height: '20px',
        },
        ...(activeLike ? 
            {
                backgroundColor: '#f15151',
                color: 'white',
                border: 'unset', 
                '&:hover': {
                    color: 'white',
                    backgroundColor: '#e04c4c',
                },
            }
            : {}
        )
    }));

  return (
    <OperationBtn
        focusRipple
        className={`${className}`}
        onClick={onClick}
    >
        <main>{children}</main>
    </OperationBtn>
  );
}
