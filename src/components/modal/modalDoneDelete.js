import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Button, Grid, TextField } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
const apiURLbooks = "http://localhost:3003/books"

function ModalDoneDelete({ open, handleClose, textNama }) {

    return (
        <div>
            <BaseFormDialog open={open} handleClose={handleClose} title='' border={false} maxWidth={true}>
                <CheckCircleOutlineRoundedIcon sx={{ marginLeft: '40%', marginRight: '40%', fontSize: '250px', color: '#3DB39E' }} />
                <Typography variant="h3" color="initial" textAlign={'center'}>Data {textNama} Sudah Di Hapus</Typography>
                <Button
                    variant="outlined"
                    sx={{ marginLeft: '42%', marginRight: '40%', marginTop: '40px', fontSize: '30px', color: '#3DB39E', }}
                    onClick={handleClose}
                >
                    HomePage
                </Button>
            </BaseFormDialog>

        </div >

    );
}

export default ModalDoneDelete
