import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Cards from '../../components/cards/cards'
import ModalAddBook from '../modal/modalAddBook';
import { useNavigate } from 'react-router-dom';
import Slider from '../slider/slider';

const drawerWidth = 300;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Navbar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);
    const theme = useTheme();
    const [dataBuku, setDataBuku] = React.useState({ urlImage: null, nama: null, deskripsi: null })
    const navigate = useNavigate();

    let nama = localStorage.getItem("uname")
    let userGroup = localStorage.getItem("userGroup")
    
    const handleInputData = (value, key) => {
        setDataBuku({ ...dataBuku, [key]: value })
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("uname");
        localStorage.removeItem("userGroup");
        navigate('/login');
    };

    const dropdownCategory = [
        {
            "id": 0,
            "nama": "Fantasy"
        },
        {
            "id": 1,
            "nama": "Horror"
        },
        {
            "id": 2,
            "nama": "Action"
        },
        {
            "id": 3,
            "nama": "Technology"
        }
    ]

    const dropdownAlltime = [
        {
            "id": 0,
            "nama": "Horror"
        },
        {
            "id": 1,
            "nama": "Fantasy"
        },
        {
            "id": 2,
            "nama": "Education"
        },
        {
            "id": 3,
            "nama": "Technology"
        }
    ]
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={openDrawer} style={{ background: '#fff' }}>
                <Toolbar>
                    <IconButton
                        color="#000"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 0, ...(openDrawer && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container spacing={2} paddingTop={1} >
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: '10px', color: '#000' }}>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                color='inherit'
                                style={{ fontWeight: '900' }}
                            >
                                All Categories <ArrowDropDownIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {dropdownCategory.map((item, index) => <MenuItem value={item.id} key={item.id + '-' + index} >{item.nama}</MenuItem>)}
                            </Menu>
                        </Grid>
                        <Grid item xs={1} style={{ marginTop: '10px', color: '#000' }}>
                            <Button
                                id="basic-button"
                                aria-controls={open2 ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open2 ? 'true' : undefined}
                                onClick={handleClick2}
                                color='inherit'
                                style={{ fontWeight: '900' }}
                            >
                                All Time <ArrowDropDownIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dropdownAlltime.map((item, index) => <MenuItem value={item.id} key={item.id + '-' + index} >{item.nama}</MenuItem>)}
                            </Menu>
                        </Grid>
                        <Grid item xs={4}>
                            <Search style={{ background: 'gray', borderRadius: '30px', marginTop: '10px' }} >
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search Book"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2} >
                            <Grid container >
                                <Box
                                    component="img"
                                    style={{ marginTop: '6px' }}
                                    sx={{
                                        height: 40,
                                        width: 40,
                                        maxHeight: { xs: 50, md: 50 },
                                        maxWidth: { xs: 50, md: 50 },
                                    }}
                                    alt="Image Cant Be Displayed"
                                    src="https://github.com/filbertamadea/libraryapp/blob/master/images/book.png?raw=true"
                                />
                                <Typography variant="h6" noWrap component="div" color="#000" fontSize={30} fontWeight={900} paddingLeft={2} paddingBottom={2}>
                                    Library
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider style={{ marginTop: '10px' }} />
                <Box
                    component="img"
                    style={{ marginTop: '6px', borderRadius: '80px', marginLeft: '20%', marginRight: '50%' }}
                    sx={{
                        height: 150,
                        width: 150,
                        maxHeight: { xs: 450, md: 450 },
                        maxWidth: { xs: 450, md: 450 },
                    }}
                    alt="Image Cant Be Displayed"
                    src="https://media.suara.com/pictures/653x366/2019/08/18/23065-niki-zefanya.jpg"
                />
                <Typography variant="h6" noWrap component="div" color="#000" style={{}} textAlign="center" fontWeight="900" fontSize="30px">
                    {nama}
                </Typography>
                <Button variant="outlined" color='inherit' style={{ width: '100px', marginLeft: '25%', color: '#000' }} startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Logout
                </Button>
                <List style={{ marginLeft: '10px', marginTop: '10%' }}>
                    <Grid container >
                        <Grid item xs={12} style={{ marginBottom: '10%' }}>
                            <Button style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>Explore</Button>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '10%' }}>
                            <Button style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>History</Button>
                        </Grid>
                        {userGroup === 'admin' ? (<Grid item xs={12} style={{ marginBottom: '10%' }}>
                            <Button style={{ fontSize: '20px', color: '#000', fontWeight: '600' }} onClick={handleOpenModal}>Add Book*</Button> 
                        </Grid>) : (<></>)}
                    </Grid>
                </List>
                <Divider />
            </Drawer>

            <Main open={openDrawer}>
                <DrawerHeader style={{ marginBottom: '6%' }} />
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '-5%' }}>
                    <Slider />
                    <Grid xs={12} sx={{ marginTop: '-10%' }} >
                        <Cards />
                    </Grid>
                </Grid>
            </Main>
            <ModalAddBook open={openModal} handleClose={handleCloseModal} />
        </Box >
    );
}

export default Navbar
