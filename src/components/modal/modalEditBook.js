import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Button, FormControl, FormLabel, Grid, RadioGroup, TextField, Radio, FormControlLabel, Box } from '@mui/material';
import { axiosPut } from '../../utilities/Fetch';
import { useDispatch } from 'react-redux';
// import axios from 'axios'

const token = localStorage.getItem("token")
const userG = localStorage.getItem("userGroup")

function ModalEditBook({ open, handleClose, urlImage, textNama, textDeskripsi, idBuku, valueFlagFile }) {
    const dispatch = useDispatch();
    const [dataBuku, setDataBuku] = useState({ urlImage: urlImage, nama: null, deskripsi: null })
    const [flagJalan, setFlagJalan] = useState(true)
    const handleInputData = (value, key) => {
        setDataBuku({ ...dataBuku, [key]: value })
    }
    //radio button
    const [value, setValue] = useState('');
    const handleChangeRadio = (event) => {
        setValue(event.target.value);
    };

    const [flagFile, setFlagFile] = useState()


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const [base64Image, setBase64Image] = useState("")
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setBase64Image(base64)
    };

    const [displayImage, setDisplayImage] = useState('')
    useEffect(() => {
        if (valueFlagFile === 1 && flagJalan === true) {
            setValue('File')
            setBase64Image(urlImage)
            setDisplayImage(base64Image)
            setFlagJalan(false)
        } else if (valueFlagFile === 0 && flagJalan === true) {
            setValue('Url')
            setBase64Image('')
            setDisplayImage(urlImage)
            setFlagJalan(false)
        }
    })


    const refreshPage = () => {
        window.location.reload();
    }

    const [disabledButton, setDisabledButton] = useState(true)
    useEffect(() => {
        if (dataBuku.urlImage !== null || dataBuku.nama !== null || dataBuku.deskripsi !== null || base64Image !== null) {
            ;
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    })

    const [pesan, setPesan] = useState('')
    const [dataInputImage, setDataInputImage] = useState('')

    useEffect(() => {
        if (value === 'File') {
            setFlagFile(1)
            setDataInputImage('')
        } else if (value === 'Url') {
            setFlagFile(0)
            setDisplayImage('')
            setDataInputImage('')
        }
    }, [value])
    useEffect(() => {
        if (value === 'File') {
            setDataInputImage(base64Image ? base64Image : urlImage)
        } else if (value === 'Url') {
            setDataInputImage('')
            setDataInputImage(dataBuku?.urlImage ? dataBuku?.urlImage : urlImage)
        }
    }, [value, dataBuku, base64Image])



    const handleSubmit = () => {
        const body = {
            id: idBuku,
            urlImage: dataInputImage,
            nama: dataBuku?.nama ? dataBuku?.nama : textNama,
            deskripsi: dataBuku?.deskripsi ? dataBuku?.deskripsi : textDeskripsi,
            flagFile: flagFile
        }
        if (token !== null && userG == 'admin') {
            dispatch(handleUpload(body))
            handleClose()
            setTimeout(()=>{
                refreshPage()
            }, 1000)
        } else {
            setPesan("Anda Bukan Admin")
        }
    }


    const handleUpload = (body) => {
        return async (dispatch) => {
            try {
                const data = await axiosPut(`books/${idBuku}`, body)
                dispatch({
                    payload: {
                        data: data.data,
                    }
                })
            }
            catch (e) { throw e }
        }
    }

    useEffect(() => {
        setDataBuku({ urlImage: null, nama: null, deskripsi: null })
        if (valueFlagFile === 1) {
            setValue('File')
            setBase64Image(urlImage)
            setDisplayImage(base64Image)
            setFlagJalan(false)
        } else if (valueFlagFile === 0) {
            setValue('Url')
            setBase64Image('')
            setDisplayImage(urlImage)
            setFlagJalan(false)
        }
    }, [handleClose])
    return (
        <div>
            <BaseFormDialog open={open} handleClose={handleClose} title='Add Data' border={false} maxWidth={true}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Pilih gambar mau di upload seperti apa</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChangeRadio}
                    >
                        <FormControlLabel value="File" control={<Radio />} label="File Upload" />
                        <FormControlLabel value="Url" control={<Radio />} label="Url" />
                    </RadioGroup>
                </FormControl>
                {value === 'File' ?
                    (<>
                        <Grid container spacing={2} sx={{ marginTop: '5%' }}>
                            <form onSubmit={handleImage} >
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" multiple type="file" onChange={(e) => handleImage(e)} />
                                </Button>
                            </form>
                            <Box
                                component="img"
                                style={{ marginTop: '6px', marginLeft: '20%', marginRight: '50%' }}
                                sx={{
                                    height: 150,
                                    width: 150,
                                    maxHeight: { xs: 450, md: 450 },
                                    maxWidth: { xs: 450, md: 450 },
                                }}
                                src={base64Image}
                            />
                        </Grid>
                    </>) : (<></>)}
                {value === 'Url' ?
                    (<>
                        <Grid container style={{ marginTop: '5%' }}>
                            <Grid xs={3}>
                                <Typography variant="h4" color="initial">
                                    Url Image
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <TextField style={{ width: '100%' }} value={dataBuku.urlImage ? dataBuku.urlImage : displayImage} onChange={(e) => handleInputData(e.target.value, 'urlImage')} id="outlined-basic" label={displayImage} variant="outlined" />
                            </Grid>
                        </Grid>
                    </>) : (<></>)}
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
                        <Button style={{ backgroundColor: disabledButton ? '#cecece' : '#F4CF5D', width: '80%', height: '100%' }} variant="contained" size="large" onClick={handleSubmit} disabled={disabledButton}>
                            <Typography variant="h6" color="#fff">
                                Save
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ color: 'red', textAlign: 'center', marginTop: '40px' }} color="initial">{pesan}</Typography>
            </BaseFormDialog>
        </div >

    );
}

export default ModalEditBook
