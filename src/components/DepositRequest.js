import React from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

export default function DepositAddressDisplay(props) {

    return (
        <div>
            <div id="current-balance-container">
                <TextField autoFocus margin="dense"
                    id="receiver-address" label="Reciever Address (Matic Beta Mainnet)" type="text" fullWidth onChange={props.onUserReceiveAddressChange} />
                <TextField autoFocus margin="dense"
                    id="withdraw-amount" label="Amount(in Matic)" type="number" fullWidth  onChange={props.onWithdrawAmountChange}/>
            </div>
            <DialogActions>
                <Button onClick={props.handleDepositDialogAction} color="primary">Create Request</Button>
            </DialogActions>
        </div>
    );
}