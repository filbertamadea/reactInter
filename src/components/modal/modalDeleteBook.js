import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Button, Grid, TextField } from '@mui/material';
import ModalDoneDelete from './modalDoneDelete';
import { useNavigate } from 'react-router-dom';

const apiURLbooks = "http://localhost:3003/books"

function ModalDeleteBook({ open, handleClose, urlImage, textNama, textDeskripsi, idBuku }) {
    const navigate = useNavigate();
    const [modalDone, setModalDone] = useState(false)
    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:3003/books/${idBuku}`).then((res) => {
            if (res.data.data) {
                console.log(res)
            }
        })
        handleClose()
        setModalDone(true)
    }
    const handleReturn = () => {
        setModalDone(false)
        navigate('/');
    }
    return (
        <div>
            <BaseFormDialog open={open} handleClose={handleClose} title='Delete Data' border={false} maxWidth={true}>
                <Typography variant="h3" color="initial" textAlign={'center'} style={{ paddingBottom: '100px' }}>Yakin Ingin Delete Data ?</Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid xs={1} >
                    </Grid>
                    <Grid xs={2} >
                        <Button variant="contained" style={{ width: '100px', height: '60px' }} onClick={handleConfirmDelete}>YA</Button>
                    </Grid>
                    <Grid xs={2} >
                        <Button variant="outlined" style={{ width: '100px', height: '60px' }} onClick={handleClose}>Tidak</Button>
                    </Grid>
                </Grid>
            </BaseFormDialog>
            <ModalDoneDelete open={modalDone} handleClose={handleReturn} textNama={textNama} />
        </div >

    );
}

export default ModalDeleteBook
