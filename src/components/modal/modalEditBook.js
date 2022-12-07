import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios'

const apiURLbooks = "http://localhost:3003/books"

function ModalEditBook({ open, handleClose, urlImage, textNama, textDeskripsi, idBuku}) {
    const [dataBuku, setDataBuku] = useState({ urlImage: null, nama: null, deskripsi: null })
    const handleInputData = (value, key) => {
        setDataBuku({ ...dataBuku, [key]: value })
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const handleSubmit = () => {
        const body = {
            id: idBuku,
            urlImage: urlImage,
            nama: dataBuku.nama ? dataBuku.nama : textNama,
            deskripsi: dataBuku.deskripsi ? dataBuku.deskripsi : textDeskripsi 
        }
        axios.put(`http://localhost:3003/books/${idBuku}`, body).then((res) => {
            if (res.data.data) {
                window.location.reload(true);
            }
        })
        handleClose();
        refreshPage()
    }
    useEffect(() => {
        setDataBuku({ urlImage: null, nama: null, deskripsi: null })
    }, [handleClose])

    const [disabledButton, setDisabledButton] = useState(true)
    useEffect(() => {
        if(dataBuku.urlImage !== null || dataBuku.nama !== null || dataBuku.deskripsi !== null){
            console.log("masuk atas");
            setDisabledButton(false)
        } else {
            console.log("masuk bawah");
            setDisabledButton(true)
        }
    })
    return (
        <div>
            <BaseFormDialog open={open} handleClose={handleClose} title='Add Data' border={false} maxWidth={true}>
                <Grid container style={{ marginTop: '2%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Url Image
                        </Typography>
                    </Grid>
                    <Grid xs={9}>
                        <TextField style={{ width: '100%' }} value={dataBuku.urlImage} onChange={(e) => handleInputData(e.target.value, 'urlImage')} id="outlined-basic" label={urlImage} variant="outlined" disabled/>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Title
                        </Typography>
                    </Grid>
                    <Grid xs={9}>
                        <TextField style={{ width: '100%' }} value={dataBuku.nama ? dataBuku.nama : textNama} onChange={(e) => handleInputData(e.target.value, 'nama')} id="outlined-basic" label={textNama} variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Description
                        </Typography>
                    </Grid>
                    <Grid xs={9}>
                        <TextField
                            style={{ width: '100%' }}
                            id="outlined-multiline-flexible"
                            label={textDeskripsi}
                            multiline
                            maxRows={6}
                            value={dataBuku.deskripsi ? dataBuku.deskripsi : textDeskripsi}
                            onChange={(e) => handleInputData(e.target.value, 'deskripsi')}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '10%' }}>
                    <Grid xs={9}>
                    </Grid>
                    <Grid xs={3}>
                        <Button style={{ backgroundColor : disabledButton ? '#cecece' : '#F4CF5D' , width: '80%', height: '100%' }} variant="contained" size="large" onClick={handleSubmit} disabled={disabledButton}>
                            <Typography variant="h6" color="#fff">
                                Save
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </BaseFormDialog>
        </div >

    );
}

export default ModalEditBook
