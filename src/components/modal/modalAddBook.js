import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField } from '@mui/material';
import FileUpload from "react-mui-fileuploader"
import Radio from '@mui/material/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { getDataBooks } from '../../books/books';
import { axiosGet, axiosPost, axiosPut } from '../../utilities/Fetch'
const userG = localStorage.getItem("userGroup")

function ModalAddBook({ open, handleClose }) {
    const dispatch = useDispatch();
    const [dataBuku, setDataBuku] = useState({ urlImage: null, nama: null, deskripsi: null })
    const [book, setBook] = useState([])
    const [id, setId] = useState([])

    const handleInputData = (value, key) => {
        setDataBuku({ ...dataBuku, [key]: value })
    }

    const getDataLastBooks = () => {
        return async (dispatch) => {
            if(userG === 'admin'){
                try {
                    const data = await axiosGet(`books?_sort=id&_order=desc&_limit=1`)
                    setBook(data)
                }
                catch (e) { throw e }
            }
        }
    }

    useEffect(() => {
        dispatch(getDataBooks())
        dispatch(getDataLastBooks())
    }, [])
    
    const refreshPage = () => {
        window.location.reload();
    }
    
    //radio button
    const [value, setValue] = useState('');
    const handleChangeRadio = (event) => {
        setValue(event.target.value);
    };
    
    useEffect(() => {
        setBase64Image(null)
    }, [value])

    const [flagFile, setFlagFile] = useState()

    useEffect(() => {
        if(value === 'File'){
            setFlagFile(1)
        } else if (value === 'Url'){
            setFlagFile(0)
        }
    }, [value])
    
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
    
    useEffect(() => {
        setId(book.map(y => parseInt(y.id)))
    }, [book])

    let panjangArray = parseInt(id);
    const handleSubmit = () => {
        const body = {
            id: panjangArray + 1,
            urlImage: dataBuku.urlImage ? dataBuku.urlImage : base64Image,
            nama: dataBuku.nama,
            deskripsi: dataBuku.deskripsi,
            flagFile : flagFile
        }
        axiosPost(`books`,body).then((res) => {
            if (res.data.data) {
                window.location.reload(true);
            }
        })
        handleClose();
        refreshPage()
    }
    
    const [handleDisabled, setHandleDisabled] = useState(true)

    useEffect(() => {
        if(flagFile === 1) {
            if ((base64Image !== null && dataBuku.nama !== null && dataBuku.deskripsi !== null && id !== null && flagFile !== null) && (base64Image !== '' && dataBuku.nama !== '' && dataBuku.deskripsi !== '' && id !== '' && flagFile !== '')) {
                setHandleDisabled(false)
            } else {
                setHandleDisabled(true)
            }
        } else if(flagFile === 0) {
            if ((dataBuku.urlImage !== null && dataBuku.nama !== null && dataBuku.deskripsi !== null && id !== null && flagFile !== null) && (dataBuku.urlImage !== '' && dataBuku.nama !== '' && dataBuku.deskripsi !== '' && id !== '' && flagFile !== '')) {
                setHandleDisabled(false)
            } else {
                setHandleDisabled(true)
            }
        }
    }, [flagFile, dataBuku, base64Image])

    useEffect(() => {
        setDataBuku({ urlImage: null, nama: null, deskripsi: null })
        setValue('')
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
                        <Grid container style={{ marginTop: '2%' }}>
                            <Grid xs={3}>
                                <Typography variant="h4" color="initial">
                                    Url Image
                                </Typography>
                            </Grid>
                            <Grid xs={1}>
                            </Grid>
                            <Grid xs={8}>
                                <TextField style={{ width: '100%' }} value={dataBuku.urlImage} onChange={(e) => handleInputData(e.target.value, 'urlImage')} id="outlined-basic" label="Masukan URL Image" variant="outlined" />
                            </Grid>
                        </Grid>
                    </>) : (<></>)}
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Title
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                    <Grid xs={8}>
                        <TextField style={{ width: '100%' }} value={dataBuku.nama} onChange={(e) => handleInputData(e.target.value, 'nama')} id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Description
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                    <Grid xs={8}>
                        <TextField
                            style={{ width: '100%' }}
                            id="outlined-multiline-flexible"
                            label="Deskrispi"
                            multiline
                            maxRows={6}
                            value={dataBuku.deskripsi}
                            onChange={(e) => handleInputData(e.target.value, 'deskripsi')}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '10%' }}>
                    <Grid xs={9}>
                    </Grid>
                    <Grid xs={3}>
                        <Button style={{ backgroundColor: '#FBCC38', width: '80%', height: '100%' }} variant="contained" size="large" onClick={handleSubmit} disabled={handleDisabled}>
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

export default ModalAddBook
