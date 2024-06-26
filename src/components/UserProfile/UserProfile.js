import React, { useState } from "react";
import Search from "../../images/Search.svg";
import "./UserProfile.css";
import UserRepository from "../UserRepository/UserRepository";
import { useApiServices } from "../../services/useApiServices";

function UserProfile() {
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [newUserInfo, setUserInfo] = useState([]);
  const [newRepoUser, setRepoUser] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setVisible(true);
    setClicked(true);
  };
  console.log(clicked);
  const handleClick = () => {
    setVisible(false);
    setUserInfo(userInfo);
    setRepoUser(repoUser);
  };

  let username = inputValue ? inputValue : "github";
  const { userInfo, repoUser } = useApiServices({ username });

  const userInfoToDisplay = clicked ? newUserInfo : userInfo;
  const repoUserToDisplay = clicked ? newRepoUser : repoUser;

  if (!userInfo && !repoUser) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <div className="container-search">
        <header className="container-input">
          <img src={Search} alt="Search" />
          <input
            type="search"
            placeholder="username"
            value={inputValue}
            onChange={handleInputChange}
          />
        </header>
        {visible && userInfo ? (
          <div
            className={`container-option ${!inputValue ? "active" : ""} `}
            onClick={handleClick}
          >
            <img src={userInfo.avatar_url} alt="Avatar" />
            <p>{userInfo.name}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>      
      <UserRepository info={userInfoToDisplay} repos={repoUserToDisplay} />
    </div>
  );
}

export default UserProfile;
