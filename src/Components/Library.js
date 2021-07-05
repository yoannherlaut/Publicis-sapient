import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import BookIcon from '@material-ui/icons/LibraryBooks';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  basket: {
    border: '2px white solid',
    padding: theme.spacing(1),
    borderRadius: '5px'
  }
}));

const Library = (props) => {
  const classes = useStyles();
  const { storeBook } = props;

  const [Books, setBooks] = useState([]);
  const [BooksFiltered, setBooksFiltered] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const fetchResponse = await fetch(`https://henri-potier.techx.fr/books`);
      const data = await fetchResponse.json();
      if (data) {
        setBooks(data)
      }
    } catch (err) {
      console.log('ERROR fetchBooks --->', err);
    }
  };

  const booksFiltered = Books.filter((data) => {
    if (data.title === BooksFiltered) {
      return (
        data
      )
    }
  });

  return (

    <React.Fragment>
      <CssBaseline />
      {/* Header */}
      <AppBar position="relative">
        <Toolbar>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item xs={8} md={10}>
              <Grid container direction='row' justify='flex-start' alignItems='center'>
                <BookIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" >
                  Henri Potier collections
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4} md={2}>
              <Grid container direction='row' justify='flex-end' alignItems='center'>
                <Link to='/basket'>
                  <Button className={classes.basket} variant="outlined" color="default" >
                    <ShoppingBasketIcon className={classes.icon} />
                    <Typography variant="subtitle1" color="inherit" style={{ color: "white" }}>
                      Panier
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container className={classes.cardGrid} maxWidth="md">

        <Grid Grid container direction='row' justify='center' alignItems='center' style={{ marginBottom: 10 }}>
          <Grid item xs={12}>
            <Autocomplete
              id="combo-box-demo"
              onInputChange={(e, newInputValue) => setBooksFiltered(newInputValue)}
              options={Books}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} onChange={(e) => setBooksFiltered(e.target.value)} label="Search ..." variant="outlined" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {
            booksFiltered && booksFiltered.length > 0
              ? booksFiltered.map((book, key) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={book.cover}
                      title={book.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                      </Typography>
                      <Typography>
                        {
                          book.synopsis[0].length > 200
                            ? book.synopsis[0].substring(0, 200) + " ..."
                            : book.synopsis
                        }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => storeBook(book)}>
                        Buy
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))

              : Books.length > 0
                ? Books.map((book, key) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={book.cover}
                        title={book.title}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {book.title}
                        </Typography>
                        <Typography>
                          {
                            book.synopsis[0].length > 200
                              ? book.synopsis[0].substring(0, 200) + " ..."
                              : book.synopsis
                          }
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => storeBook(book)}>
                          Buy
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
                : <Grid container justify='center'>
                  <CircularProgress />
                </Grid>
          }
        </Grid>

      </Container>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          La bibliothèque d'Henri Potier
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment >
  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    storeBook: (book) => {
      dispatch({ type: 'addBook', book });
    },
  };
};

export default connect(null, mapDispatchToProps)(Library);