import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URI = process.env.REACT_APP_USER

function Register() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    const [dataRegister, setDataRegister] = useState({ username: null, fullName: null, email: null, password: null, userGroup: 'basic' })
    const handleInputData = (value, key) => {
        setDataRegister({ ...dataRegister, [key]: value })
    }

    const [bolehRegis, setBolehRegis] = useState(true)

    useEffect(() => {
        if ((dataRegister.username !== null && dataRegister.fullName !== null && dataRegister.email !== null && dataRegister.password !== null) && (dataRegister.username !== '' && dataRegister.fullName !== '' && dataRegister.email !== '' && dataRegister.password !== '')) {
            setBolehRegis(false)
        } else {
            setBolehRegis(true)
        }
    }, [dataRegister])

    const [pesan, setPesan] = useState("")
    const handleRegister = async () => {
        let uname = dataRegister.username
        let fname = dataRegister.fullName
        if (uname.length >= 4) {
            if (fname.length >= 4) {
                try {
                    let response = await axios.post(`${API_URI}/register`, dataRegister);
                    setPesan("")
                    console.log(response);

                } catch (error) {
                    let pesan = error?.response?.data
                    setPesan(pesan)
                    console.log(pesan);
                }
            } else {
                setPesan("Fullname terlalu pendek")
            }
        } else {
            setPesan("Username Terlalu Pendek")
        }
        navigate('/login')
    }
    return (
        <Grid item container direction="row">
            <Grid xs={9}>
                <Typography
                    variant="h2"
                    style={{
                        color: '#fff',
                        zIndex: '1001',
                        position: 'absolute',
                        width: '50%',
                        marginTop: '88px',
                        marginLeft: '55px',
                        fontWeight: 'bold',
                        fontSize: '100px'
                    }}>
                    Book is a window to the world
                </Typography>
                <Box
                    component="img"
                    sx={{
                        height: '100vh',
                        width: '130vh',
                        zIndex: '1'
                    }}
                    alt="The house from the offer."
                    src="https://s3-alpha-sig.figma.com/img/42af/e6f5/6406744294af0e36bd58a6bb9d5bade1?Expires=1670803200&Signature=Gdlj0ppiue-1lp2UVpoarBn-w1sp3-5Zdjt0yoQv8JYQlpA8Waazhni8i0DohRBqXTU-IFJg8facEQ0EupJssSFeq2WgHhWTmPJph-KlQ4RH0H0VEZFL28lwGh16Z6lBSDOl6Tsg4AxtICe7Hu5nv0eaesHz4jruBmXVwPuR6SB9M823~iqp1B3heXEvLe68bS-sFc9jeuevf5DA1i3OGEWogkLpYa0ln1Nf2AVbaTC-6Z3cI-~hrEEG39BYu3dzOf~YdIcJBO0Zc7S9LXihgnmEJ~j00PAI-yvstSb0iWQBe6u95-75VB0-Of2vBYDJJW0lBs-jKbaUHTuRVvzoqw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                />
                <Typography
                    variant="h6"
                    style={{
                        color: '#fff',
                        zIndex: '1001',
                        position: 'absolute',
                        width: '50%',
                        marginTop: '-3%',
                        marginLeft: '55px',
                        fontWeight: 'bold',
                        fontSize: '30px'
                    }}>
                    Photo by Mark Pan4ratte on Unsplash
                </Typography>
            </Grid>
            <Grid xs={3}>
                <Grid container style={{ marginTop: '10%' }}>
                    <Grid xs={12}>
                        <Box
                            component="img"
                            sx={{
                                width: '100px',
                                marginLeft: '70%'
                            }}
                            alt="The house from the offer."
                            src="https://s3-alpha-sig.figma.com/img/5ef4/f6ec/e84f39e17cc61b2c69a33b9ad6d7736e?Expires=1670803200&Signature=W7B2PdKPrZxLDUHJeEMKH0km-aPV9p0rnVYR8mFCJFT7QMhxGYJmLFm3Zs1MrQ0QMSHWU8RVK3Bd8v1rtl3HrgbzoblwxBIzdGu1hOQsJFHQScKEKwW5Q3Lyb7qzD5Bg5m8ZAaVMY~G38AL0U6y0TfwihGr5O9KFCTfJZx7j7wcCFZrjg7WqjBRqT8cdbkK~U52-qMNtCGQDz~UKYfTyFqvfSZXQFjVNW~NfaX0ts0HSh6PByYw9n4YUN91dMfZdwKPe4Z7s4AZcHyIPh1SeHqOdKyyXhE1XGpW9R93MWWdFfwCHJDrQAKl41wQlc-3OwYYCbcxCLMNb8KbTdnqlWg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            variant="h1"
                            color="initial"
                            sx={{
                                fontWeight: '900',
                                fontSize: '70px',
                                marginLeft: '-20%',
                                marginTop: '20%',
                                color: '#424242'
                            }}
                        >Register</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            variant="h6"
                            color="initial"
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '300px',
                                marginTop: '3%'
                            }}
                        >Welcome Back, Please Register to create account</Typography>
                    </Grid>
                    <Typography
                        sx={{
                            fontSize: '15px',
                            marginLeft: '-20%',
                            width: '500px',
                            marginTop: '3%',
                            color: 'red'
                        }}
                        variant="h6" color="initial">{pesan}</Typography>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            onChange={(e) => handleInputData(e.target.value, 'username')}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '500px',
                                marginTop: '3%'
                            }} />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            onChange={(e) => handleInputData(e.target.value, 'fullName')}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '500px',
                                marginTop: '3%'
                            }} />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            onChange={(e) => handleInputData(e.target.value, 'email')}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '500px',
                                marginTop: '3%'
                            }} />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => handleInputData(e.target.value, 'password')}
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '500px',
                                marginTop: '3%'
                            }} />
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="contained" sx={{ marginLeft: '-40%', marginTop: '20%', backgroundColor: '#000', width: '100px' }} onClick={handleRegister} disabled={bolehRegis}>Sign Up</Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="outlined" sx={{ marginLeft: '-90%', marginTop: '20%', width: '100px', color: '#cecece' }} onClick={handleLogin}>Login</Button>
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            variant="h6"
                            color="initial"
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '350px',
                                marginTop: '30%'
                            }}
                        >By login up, you agree to Book’s <span><b>Terms and Conditions</b></span> & <span><b>Privacy Policy</b></span></Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register
