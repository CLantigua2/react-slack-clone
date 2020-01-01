import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import md5 from "md5";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      loading: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormValid = () => {
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Fill in all fields" };
      this.setState({ errors: [...this.state.errors, error] });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      error = { massage: "Password is invalid" };
      this.setState({ errors: [...this.state.errors, error] });
      return false;
    } else {
      // form valid
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation
    );
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password, errors, username } = this.state;
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await createUserProfileDocument(user, {
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
        });
        this.resetForm();
        // this.props.history.push('/')
      } catch (err) {
        this.setState({ errors: [...errors, err.message], loading: false });
        console.log(err);
      }
    }
  };

  resetForm = () => {
    this.setState({
      loading: false,
      username: "",
      password: "",
      email: "",
      passwordConfirmation: ""
    });
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Passowrd"
                onChange={this.handleChange}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Passowrd Confirmation"
                onChange={this.handleChange}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
