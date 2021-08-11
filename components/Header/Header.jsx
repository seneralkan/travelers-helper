import React from 'react';
import {Autocomplete} from "@react-google-maps/api";
import {Appbar, Toolbar, Box, Typography, InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles.js";


function Header() {
    const classes = useStyles();

    return (
        <Appbar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travelers Helper
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Places
                    </Typography>
                    {/*<Autocomplete>*/}
                        <div className ={classes.search}>
                            <div className={classessearchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholde="Search..." classes={{root: classes.inputRoot, input: classes.inputInput}} />
                        </div>
                    {/*</Autocomplete>*/}
                </Box>
            </Toolbar>
        </Appbar>
    )
}

export default Header
