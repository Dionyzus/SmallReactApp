import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';


export default function Home()
{
    return(
        <Container maxWidth='md'>
            <Grid item xs>
                <Typography variant='h5'>
                    Welcome page.. You can access protected routes.
                    Menu on the left of the header has access to products, producers and users.
                    Menu on the right enables log out.
                </Typography>
            </Grid>
        </Container>
    );
}