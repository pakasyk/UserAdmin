import React, { Component } from "react";
import UsersTable from "./UsersTable";

class UsersPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    repassword: "",
    address: "",
    city: "",
    postCode: "",
    invalid: null,
    selectedID: "",
    users: [],
    mode: null,
    error: null
  };
  componentDidMount = () => {
    this.getAllUsers();
  };

  getAllUsers = () => {
    fetch("./api")
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users.users });
      })
      .catch(err => console.log(err));
  };

  onCreateUser = e => {  
    e.preventDefault();
    this.validatePassword();

    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city,
        postCode: this.state.postCode
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          this.getAllUsers();
        } else throw new Error();
      })
      .catch(err => console.log(err));
  };

  onEditUser = e => {  
    e.preventDefault();
    this.validatePassword();

    fetch("/api/edit", {
      method: "POST",
      body: JSON.stringify({
        _id: this.state.selectedID,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city,
        postCode: this.state.postCode
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          this.getAllUsers();
        } else throw new Error();
      })
      .catch(err => console.log(err));
  };  

  validatePassword = () => {
    if (this.state.password !== this.state.repassword)
      return this.setState({ error: "Passwords do not match." });
    if (this.state.password.length < 8)
      return this.setState({
        error: "Password's length minimum 8 characters."
      });
    this.setState({ error: null });
  };

  /* Fetch Post Code function */
  onAddressBlur = e => {
    // Words must be longer than 3/4 letters and address should contain a number
    if (
      this.state.address.length > 4 &&
      this.state.address.match(/\d+/g) !== null &&
      this.state.city.length > 3
    ) {
      fetch(
        `https://postit.lt/data/v2/?key=LTP9bQEPJnxgKbaSJPZd&city=${
          this.state.city
        }&address=${this.state.address}&limit=1`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ postCode: "LT-" + data.data[0].post_code });
        })
        .catch(err => console.log(err));
    }
  };

  onSelectEditUser = user => {
    this.setState({
      mode: "editUser",
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password,
      address: user.address.address,
      city: user.address.city,
      postCode: user.address.postCode,
      selectedID: user._id
    });
  };

  render() {
    let form;
    if (this.state.mode === "createUSer") {
      form = this.onCreateUser;
    } else {
      form = this.onEditUser;
    }
    return (
      <>
        <h1 className="text-center my-5">Users</h1>
        {this.state.mode === null ? (
          <></>
        ) : (    
          <form onSubmit={form}>
          
            {this.state.error !== null ? (
              <div className="row  my-1">
                <div
                  className="alert alert-danger col text-center"
                  role="alert"
                >
                  {this.state.error}
                </div>
              </div>
              
            ) : (
              <></>
            )}
            <div className="row  my-1">
              <div className="col">
                <input
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
              </div>
              <div className="col">
                <input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={e => this.setState({ lastName: e.target.value })}
                  value={this.state.lastName}
                />
              </div>
              <div className="col">
                <input
                  required
                  type="text"
                  name="userName"
                  id="userName"
                  className="form-control"
                  placeholder="User Name"
                  onChange={e =>
                    this.setState({ userName: e.target.value, invalid: null })
                  }
                  value={this.state.userName}
                />
              </div>
            </div>

            <div className="row  my-1">
              <div className="col">
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  placeholder="City"
                  onChange={e => this.setState({ city: e.target.value })}
                  value={this.state.city}
                  onBlur={this.onAddressBlur}
                />
              </div>
              <div className="col">
                <input
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={e => this.setState({ address: e.target.value })}
                  value={this.state.address}
                  onBlur={this.onAddressBlur}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="postCode"
                  id="postCode"
                  className="form-control"
                  placeholder="Post Code"
                  value={this.state.postCode}
                  readOnly
                />
              </div>
            </div>
            <div className="row  my-1">
              <div className="col-4">
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
              </div>
              <div className="col-4">
                <input
                  required
                  type="password"
                  name="repassword"
                  id="repassword"
                  className="form-control"
                  placeholder="Repeat Password"
                  onChange={e => this.setState({ repassword: e.target.value })}
                  value={this.state.repassword}
                />
              </div>
            </div>
            {this.state.mode === "createUser" ? (
              <button type="submit" className="btn btn-primary float-right">
                Add New
              </button>
            ) : (
              <button type="submit" className="btn btn-primary float-right">
                Edit User
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger float-right mr-2"
              onClick={() => this.setState({ mode: null, error: null })}
            >
              Cancel
            </button>
          </form>
        )}

        <UsersTable
          usersData={this.state.users}
          onSelectEditUser={this.onSelectEditUser}
          getAllUsers={this.getAllUsers}
        />
        {this.state.mode === null ? (
          <button
            className="btn btn-primary float-right"
            type="button"
            onClick={() => this.setState({ mode: "createUser" })}
          >
            Add New User
          </button>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default UsersPage;
