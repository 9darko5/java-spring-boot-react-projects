import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

export const LoginComponent = () => {

    const [state, setState] = useState({
        username: "",
        password: ""
      });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
      };

  const handleSubmit = (username, password) => {
    debugger
    const loginPayload = {
        username: state.username,
        password: state.password
      };

    axios.post("https://localhost/api/auth/login", loginPayload)
      .then(response => {
        debugger
        //get token from response
        const token = response.data.accessToken;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'

      })
      .catch(err => console.log(err));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const username = event.target[0].value;
        const password = event.target[1].value;
        debugger
        handleSubmit(username, password); 
      }}
    >
      <label htmlFor="username">Username</label><br />
      <input type="text" 
             id="username" 
             name="username" 
             value={state.username}
             onChange={handleChange}/><br />
      <label htmlFor="password">Password</label><br />
      <input type="password" 
             id="password" 
             name="password"
             value={state.password}
             onChange={handleChange}/><br></br>
      <input type="submit" value="Submit" />
    </form>
  );
}
export default LoginComponent

/* export const LoginComponent = () => {
    const [state, setState] = useState({
      username: "",
      password: ""
    });
  
    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        username: state.username,
        password: state.password
      };
      axios.post("https://localhost:443/api/auth/login", userData).then((response) => {
          debugger
        console.log(response.status, response.data);
      })
      .catch(err => {
          console.log(err)
    });
    };
  
    return (
      <div>
        <h1>Login</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Name
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Job
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  
  export default LoginComponent */