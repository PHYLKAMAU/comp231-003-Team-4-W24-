import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { create } from "./api-Restaurant";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#DDEBF7",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

// const create = async (user) => {
//   return { error: null }; // Simulated API call
// };

export default function RestaurantSignup() {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    location: "",
    photo: "",
    rating: "",
    cuisine: "",
    price: "",
    description: "",
    closing: "",
    opening: "",
    phone: "",
    email: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => {
    const restaurant = {
      email: values.email || undefined,
      name: values.name || undefined,
      location: values.location || undefined,
      photo: values.photo || undefined,
      rating: values.rating || undefined,
      cuisine: values.cuisine || undefined,
      price: values.price || undefined,
      description: values.description || undefined,
      closing: values.closing || undefined,
      opening: values.opening || undefined,
      phone: values.phone || undefined,
    };

    create(restaurant).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  RestaurantSignup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up Restaurant
          </Typography>

          <TextField
            id="email"
            label="Owner name"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />

          <TextField
            id="name"
            label="name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="location"
            label="location"
            className={classes.textField}
            value={values.location}
            onChange={handleChange("location")}
            margin="normal"
          />
          <TextField
            id="photo"
            label="photo"
            className={classes.textField}
            value={values.photo}
            onChange={handleChange("photo")}
            margin="normal"
          />
          <TextField
            id="cuisine"
            label="cuisine"
            className={classes.textField}
            value={values.cuisine}
            onChange={handleChange("cuisine")}
            margin="normal"
          />
          <TextField
            id="price"
            label="price"
            className={classes.textField}
            value={values.price}
            onChange={handleChange("price")}
            type="price"
            margin="normal"
          />
          <TextField
            id="description"
            label="description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            type="description"
            margin="normal"
          />
          <TextField
            id="closing"
            label="closing"
            className={classes.textField}
            value={values.closing}
            onChange={handleChange("closing")}
            type="closing"
            margin="normal"
          />
          <TextField
            id="opening"
            label="opening"
            className={classes.textField}
            value={values.opening}
            onChange={handleChange("opening")}
            type="opening"
            margin="normal"
          />
          <TextField
            id="phone"
            label="phone"
            className={classes.textField}
            value={values.phone}
            onChange={handleChange("phone")}
            type="phone"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New Restaurant successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/RestManagement">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Login In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
