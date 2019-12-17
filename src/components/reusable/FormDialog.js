import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.contentText}
          </DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            {props.cancelText?props.cancelText:"Cancel"}
          </Button>
          <Button onClick={props.handleAction} color="primary">
            {props.actionText?props.actionText:"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
