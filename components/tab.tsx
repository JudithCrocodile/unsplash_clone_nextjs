import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import {Tab, Tabs, TabProps} from '@mui/material';

const StyledTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "rgb(17, 17, 17)",
    },
  });


interface StyledTabsProps extends TabProps {
    label: string;
    // iconPosition: string;
    value: string | number;
    icon?: any,
  }

  const CustomerTab = styled((props: StyledTabsProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      color: 'rgb(118, 118, 118)',
      fontWeight: 500,
      fontSize: '14px',
      '&:hover': {
        color: 'rgb(17, 17, 17)',
      },
      '&.Mui-selected': {
        color: 'rgb(17, 17, 17)',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
      },
    }),
  );

  export  {StyledTabs, CustomerTab}