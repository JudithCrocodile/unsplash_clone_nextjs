import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';






export default function OperationBtn({ onClick, children, className, line=false, activeLike=false, disabled=false, loading=false  }: {
    children?: ReactNode, className?: string, line?: boolean,  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, activeLike?: boolean, disabled?:boolean, loading?:boolean
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
        backgroundColor: !disabled ? 'white' : '#eee',
        borderColor: disabled ? 'transparent': 'inherit',
        '&:hover': {
            zIndex: 1,
            border: line ? '1px solid #111' : '',
            color: '#111',
            borderColor: disabled ? 'transparent': 'inherit',
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
        disabled={disabled ||loading}
    >
        {loading && <CircularProgress className="mr-2" size="20px" color="inherit" />}
        <main>{children}</main>
    </OperationBtn>
  );
}
