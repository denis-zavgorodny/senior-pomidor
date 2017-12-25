import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return <div>
            Error 404.
            <br />
            Not found.
            <hr />
            You can back to <Link to="/">home page</Link>
        </div>
    }
}

export default NotFound;
