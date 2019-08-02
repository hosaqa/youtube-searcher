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

const Alert = styled(SnackbarContent)`
  background-color: ${({ status, theme }) => getBgColorVariant(status, theme)};
`;

const AlertContent = styled.span`
  display: flex;
  align-items: center;
`;

const Alert = ({ message, status }) => {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  return (
    <Alert
      aria-describedby="client-snackbar"
      message={
        <AlertContent>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </AlertContent>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

export { Alert };
