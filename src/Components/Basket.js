import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    img: {
        width: 100,
        height: 100
    },
    book: {
        padding: 5
    },
    divider: {
        color: 'gray',
        height: 2,
        margin: 40
    }
});

const Basket = (props) => {
    const classes = useStyles();
    const { Books } = props;

    const [Total, setTotal] = useState(0);
    const [totalReduction, setTotalReduction] = useState(0);

    useEffect(() => {

        const calculBestOffer = (price, offers) => {
            const listOffers = []
            offers.forEach((offer) => {
                if (offer.type === 'percentage') {
                    listOffers.push(price - (price * offer.value / 100))
                } else if (offer.type === 'minus') {
                    listOffers.push(price - offer.value)
                }
                else if (offer.type === 'slice') {
                    const slices = Math.floor(price / offer.sliceValue)
                    listOffers.push(price - slices * offer.value)
                }
            })
            return Math.min(...listOffers)
        }

        var totalPrice = 0
        Books.forEach((book) => {
            totalPrice += (book.price)
        })
        setTotal(totalPrice)

        if (Books && Books.length > 0) {
            fetch(`https://henri-potier.techx.fr/books/${Books.map((b) => { return (b.isbn) }).join()}/commercialOffers`)
                .then((fetchResponse) => {
                    return fetchResponse.json()
                })
                .then((data) => {
                    const bestOffer = calculBestOffer(totalPrice, data.offers)
                    setTotalReduction(bestOffer)
                })
        }
    }, [Books])

    return (
        <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item xs={8}>
                <Paper elevation={3} >
                    {
                        Books && Books.length > 0
                            ? <React.Fragment>
                                {Books.map((book, key) => (
                                    <Grid container direction='row' justify='center' alignItems='center' key={key} className={classes.book}>
                                        <Grid item xs={2}>
                                            <img alt='cover book' src={book.cover} className={classes.img} ></img>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography gutterBottom variant='h6' align='center'>{book.title}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography gutterBottom variant='body1' align='center'>{book.price} €</Typography>
                                        </Grid>
                                    </Grid>
                                ))
                                }

                                < Divider variant="middle" className={classes.divider} />

                                <Grid container direction='row' justify='center' alignItems='center'>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' align='center'>Total : <strike>{Total}</strike> €</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction='row' justify='center' alignItems='center'>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' align='center'>Avec réduction : {totalReduction} €</Typography>
                                    </Grid>
                                </Grid>

                            </React.Fragment>
                            : <Typography variant='h6' align='center'>Panier Vide</Typography>
                    }
                </Paper>
            </Grid>
        </Grid >
    );
}


const mapStateToProps = (state) => {
    return {
        Books: state.BooksBasket,
    };
};

export default connect(mapStateToProps, null)(Basket);