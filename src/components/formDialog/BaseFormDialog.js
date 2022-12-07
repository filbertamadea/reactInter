/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { makeStyles, } from '@mui/styles';
import { Dialog, DialogContent, Typography } from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles((theme) => ({

    title: {
        borderTop: '15px solid #156db8',
        minWidth: 460,
        padding: '32px 15%',
        '& .MuiDialogContent-root': {
            padding: 0
        },
        '& h2': {
            fontWeight: 900,
            color: '#156db8',
            fontSize: 20,
            fontFamily: 'Montserrat',
        }, '& .MuiTypography-h6': {
            fontWeight: 900,
            color: '#156db8',
            fontSize: 20,
            fontFamily: 'Montserrat',
        }
    },
    title2: {
        maxWidth: '100%',
        '& h2': {
            fontWeight: 700,
            color: '#000000',
            fontSize: 40,
            fontFamily: 'Segoe UI',

        }, '& .MuiTypography-h6': {
            fontWeight: 900,
            color: '#156db8',
            fontSize: 20,
            fontFamily: 'Montserrat',
        }
    },
    label: {
        fontWeight: 'bold',
        color: '#156db8',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        position: 'absolute',
        right: 200,
        top: 30
    },
    dialogTitle: {
        color: 'white',
        marginTop: -10,
        marginLeft: -24
    },
    btnContained: {
        textTransform: 'inherit',
        width: '80%',
        borderRadius: '8px',
        height: 44,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        backgroundColor: '#0D5CAB',
        color: "white",
        '&:hover': {
            backgroundColor: '#125fa1',
        },
        '&:active': {
            backgroundColor: '#156db8',
        }
    },
    btnOutlined: {
        textTransform: 'inherit',
        width: '80%',
        borderRadius: '8px',
        borderColor: '#156db8',
        height: 44,
        marginLeft: 38,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        fontSize: 16,
        backgroundColor: 'white',
        color: "#156db8",
        '&:hover': {
            backgroundColor: 'grey',
        },
        '&:active': {
            backgroundColor: 'white',
        }
    },
    closeButton: {
        position: 'absolute',
    },
    closeButton2: {
        right: '-95%',
    },
    addWidth: {
        position: 'fixed',
        zIndex: 1300,
        inset: 0,
        maxwidth: 1000,
        marginLeft: 300
    },
    content: {
        marginBottom: '5%',
        paddingLeft: '15%',
    }
}))

function BaseFormDialog({ handleClose, open, children, title, border, flagWidth }) {
    const classes = useStyles();

    const DialogTitle = (({ dialogTitle, onClose, ...other }) => {

        return (
            <MuiDialogTitle disableTypography className={classes.title} {...other}>
                <Typography variant="h2">{dialogTitle}
                </Typography>
                <IconButton aria-label="close" className={border === false ? classes.closeButton2 : classes.closeButton} onClick={onClose} style={{marginTop: '-8%'}}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
        );
    });

    return (
        // <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" fullScreen={flagWidth ? true : false} style={{maxWidth: flagWidth ? "60%" : "", maxHeight: flagWidth ? "90%" : "", marginTop: flagWidth ? '50px' : "", marginLeft: flagWidth ? "270px" : ""}} open={open} >
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={false} fullWidth={true} style={{ width: '70%', marginLeft: '15%' }}>
            <DialogTitle onClose={handleClose} className={border === false ? classes.title2 : classes.title} id="customized-dialog-title" dialogTitle={title} />
            <DialogContent className={classes.content}> {children}</DialogContent>
        </Dialog>
    )
}

export default BaseFormDialog