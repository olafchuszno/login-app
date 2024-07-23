import React, { useContext } from "react";
// import { usePageError } from "../hooks/usePageError.js";
// import { userService } from "../services/userService.js";
import { AuthContext } from "../components/AuthContext.jsx";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   userService
  //     .getAll()
  //     .then(setUsers)
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, []);

  return (
    <div className="content">
      <h1 className="title">User profile</h1>

      <p>User's name: {user.name}</p>

      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul> */}

      {/* {error && <p className="notification is-danger is-light">{error}</p>} */}
    </div>
  );
};
