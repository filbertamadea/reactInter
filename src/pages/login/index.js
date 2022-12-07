import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URI = process.env.REACT_APP_USER

function Login() {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register');
    }
    const handleLogin = () => {
        navigate('/');
    }

    const [dataLogin, setDataLogin] = useState({ email: null, password: null })
    const handleInputData = (value, key) => {
        setDataLogin({ ...dataLogin, [key]: value })
    }

    const [bolehLogin, setBolehLogin] = useState(true)

    useEffect(() => {
        if ((dataLogin.email !== null && dataLogin.password !== null) && (dataLogin.email !==
            '' && dataLogin.password !== '')) {
            setBolehLogin(false)
        } else {
            setBolehLogin(true)
        }
    }, [dataLogin])

    const [pesan, setPesan] = useState("")
    const handleSubmit = async () => {
        try {
            let response = await axios.post(`${API_URI}/login`, dataLogin);
            setPesan("")
            const token = response.data.accessToken
            const uname = response.data.user.fullName
            const userGroup = response.data.user.userGroup
            localStorage.setItem("token", token);
            localStorage.setItem("uname", uname);
            localStorage.setItem("userGroup", userGroup);
            if((token !== undefined && uname !== undefined && userGroup !== undefined) && (token !== null && uname !== null && userGroup !== null) && ((token !== '' && uname !== '' && userGroup !== ''))){
                navigate('/');
                window.location.reload();
            }  else {
                navigate('/login');
            }

        } catch (error) {
            console.log(error);
            let pesan = error?.response?.data
            setPesan(pesan)
        }
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
                        >Login</Typography>
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
                        >Welcome Back, Please Login to your account</Typography>
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
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Remember me" sx={{ marginLeft: '-45%', marginTop: '10px' }} />
                        </FormGroup>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="h6" color="initial" sx={{ marginTop: '7%', fontSize: '17px', marginLeft: '-1%' }} >Forgot Password</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="contained" sx={{ marginLeft: '-40%', marginTop: '20%', backgroundColor: '#000', width: '100px' }} onClick={handleSubmit} disabled={bolehLogin}>Login</Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="outlined" sx={{ marginLeft: '-90%', marginTop: '20%', width: '100px', color: '#cecece' }} onClick={handleRegister}>Sign Up</Button>
                    </Grid>
                    <Grid xs={12}>
                        <Typography
                            variant="h6"
                            color="initial"
                            sx={{
                                fontSize: '20px',
                                marginLeft: '-20%',
                                width: '350px',
                                marginTop: '35%'
                            }}
                        >By login up, you agree to Book’s <span><b>Terms and Conditions</b></span> & <span><b>Privacy Policy</b></span></Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login
