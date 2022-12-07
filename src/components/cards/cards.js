import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom'
import { axiosGet } from '../../utilities/Fetch';
import { useDispatch } from 'react-redux';


const API_URI = process.env.REACT_APP_BASEURL

function Cards(props) {
    const dispatch = useDispatch();
    const [book, setBook] = useState([])
    const getData = () => {
        return async (dispatch) => {
            try {
                const data = await axiosGet(`books`)
                setBook(data)
            }
            catch (e) { throw e }
        }
    }
    useEffect(() => {
        dispatch(getData())
    }, [])

    return (
        <Box sx={{ display: 'flex', marginTop: '20%', justifyContent: 'center' }}>
            <Grid container spacing={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginLeft: '2%' }}>
                {book.map((props) => {
                    return (
                        <Grid xs={3} style={{ marginBottom: '1%' }} >
                            <Link to={`/pages/${props.id}`} style={{ color: '#000', textDecoration: 'none' }}>
                                <Card sx={{ maxWidth: 345, maxHeight: 400, minHeight: 399, marginLeft: '20px' }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="200"
                                        image={props.urlImage}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {props.nama}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {props.deskripsi}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Box >
    );
}

export default Cards
