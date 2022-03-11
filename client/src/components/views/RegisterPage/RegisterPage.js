import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Gender, setGender] = useState("");
  const [Organization, setOrganization] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };
  const onOrganizationHandler = (event) => {
    setOrganization(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log("Id", Id);
    // console.log("Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("Please enter your password");
    }

    let body = {
      email: Email,
      id: Id,
      name: Name,
      password: Password,
      gender: Gender,
      organization: Organization,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="text" value={Email} onChange={onEmailHandler} />
        <label>Id</label>
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Gender</label>
        <input type="text" value={Gender} onChange={onGenderHandler} />
        <label>Organization</label>
        <input
          type="text"
          value={Organization}
          onChange={onOrganizationHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
