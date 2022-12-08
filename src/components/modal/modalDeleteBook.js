import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Alert, Button, Grid, TextField } from '@mui/material';
import ModalDoneDelete from './modalDoneDelete';
import { useNavigate } from 'react-router-dom';
import { axiosDelete } from '../../utilities/Fetch';

const token = localStorage.getItem("token")
const userG = localStorage.getItem("userGroup")

function ModalDeleteBook({ open, handleClose, urlImage, textNama, textDeskripsi, idBuku }) {
    const navigate = useNavigate();
    const [modalDone, setModalDone] = useState(false)
    const [pesan, setPesan] = useState('')
    const handleConfirmDelete = () => {
        if (token !== null && userG === 'admin') {
            axiosDelete(`books/${idBuku}`).then((res) => {
                if (res.data.data) {
                }
            })
            handleClose()
            setModalDone(true)
        } else {
            setPesan("Anda Bukan Admin")
        }
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
                <Typography variant="h6" sx={{color: 'red', textAlign: 'center', marginTop: '40px'}} color="initial">{pesan}</Typography>
            </BaseFormDialog>
            <ModalDoneDelete open={modalDone} handleClose={handleReturn} textNama={textNama} />
        </div >

    );
}

export default ModalDeleteBook
