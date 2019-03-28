import React from "react";

function HomePage() {
  return (
    <div className="row">
      <div className="jumbotron container">
        <h1 className="display-4">Howdy, DEV!</h1>
        <p className="lead">
          This is User Administrative Site. You can create/edit/delete user. <br/>
        </p>
        <hr className="my-4" />
        <p>
          Known flaws:<br />
          Passwords are not secure.<br/>
          Because of API request limit post code fetches after blur effect.
        </p>
        <a className="btn btn-primary btn-lg" href="/users" role="button">
          Go to App!
        </a>
      </div>
    </div>
  );
}

export default HomePage;
