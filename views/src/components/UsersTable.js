import React from "react";

function UsersList({ usersData, onSelectEditUser, getAllUsers }) {
  const onDeleteUser = _id => {
    fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({
        _id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          console.log("res.ok");
          return getAllUsers();
        }
      })
      .catch(err => console.log(err));
  };

  console.log(usersData);
  let users = null;
  if (usersData.length) {
    users = usersData.map((user, index) => (
      <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.userName}</td>
        <td>
          {user.address.address +
            " " +
            user.address.postCode +
            " " +
            user.address.city}
        </td>
        <td>
          <i className="fas fa-edit" onClick={() => onSelectEditUser(user)} />
          <i
            className="fas fa-trash"
            onClick={() => onDeleteUser(user._id)}
          />
        </td>
      </tr>
    ));
  }

  return (
    <table className="table my-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Username</th>
          <th scope="col">Address</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
  );
}

export default UsersList;
