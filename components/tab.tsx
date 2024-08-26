import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import {Tab, Tabs} from '@mui/material';

const StyledTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "rgb(17, 17, 17)",
    },
  });


interface StyledTabsProps {
    label: string;
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

// export function StyledTabs( props: StyledTabsProps ) {

//     return (
//         <Tabs label={props.label + 'aaa'} value={props.label} ></Tabs>
//         // <CustomerTab label={props.label + 'aaa'} value={props.label} ></CustomerTab>
//     )
// }
// export function StyledTab( props: StyledTabsProps ) {

//     return (
//         <Tab label={props.label + 'aaa'} value={props.label} ></Tab>
//         // <CustomerTab label={props.label + 'aaa'} value={props.label} ></CustomerTab>
//     )
// }