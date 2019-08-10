import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const getBgColorVariant = (status, theme) => {
  switch (status) {
    case 'info':
      return theme.palette.primary.main;
    case 'success':
      return green[600];
    case 'warning':
      return amber[700];
    case 'error':
      return theme.palette.error.dark;
    default:
      return null;
  }
};

const getIconVariant = status => {
  switch (status) {
    case 'info':
      return <InfoIcon />;
    case 'success':
      return <CheckCircleIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    default:
      return null;
  }
};

const IconWrap = styled.span`
  margin: ${({ theme }) => theme.spacing(1)}px;
`;

const Wrapper = styled(SnackbarContent)`
  background-color: ${({ status, theme }) => getBgColorVariant(status, theme)};
`;

const Content = styled.span`
  display: flex;
  align-items: center;
`;

const Alert = ({ message, status }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      open={open}
    >
      <Wrapper
        status={status}
        aria-describedby="client-snackbar"
        message={
          <Content>
            <IconWrap>{getIconVariant(status)}</IconWrap>
            {message}
          </Content>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
};

export { Alert };
