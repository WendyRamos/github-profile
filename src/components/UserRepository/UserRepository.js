import React, { useState } from "react";
import "./UserRepository.css";
import Chield from "../../images/Chield_alt.svg";
import Nesting from "../../images/Nesting.svg";
import Star from "../../images/Star.svg";

function UserRepository({ info, repos }) {
  const [viewAll, setViewAll] = useState(false);

  if (!repos && !info) {
    return <div>Cargando datos...</div>;
  }

  const showRepos = viewAll ? repos : repos ? repos.slice(0, 4) : [];
  let currentDate = 0;

  return (
    <div className="container-repository">
      <div className="container-user">
        <div className="profile-data">
          <div className="avatar">
            <img
              src={info.avatar_url}
              alt="Avatar"
              className="img-avatar"
            ></img>
          </div>
          <div className="data-user">
            <div className="followers">
              <h4>Followers</h4>
              <p>{info.followers}</p>
            </div>
            <div className="following">
              <h4>Following</h4>
              <p>{info.following}</p>
            </div>
            <div className="location">
              <h4>Location</h4>
              <p>{info.location}</p>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="biography">
            <h2>{info.name}</h2>
            <p>{info.bio}</p>
          </div>
        </div>
      </div>
      <div className="container-repos">
        {showRepos?.map((repo) => (
          <div className="repo" key={repo.id}>
            <a href={repo.html_url} target="noopener">
              {/* _blank*/}
              <h3 className="name-repo">{repo.name}</h3>
              <p className="description-repo">{repo.description}</p>
              <div className="data-repo">
                {repo.license ? (
                  <div>
                    <img src={Chield} alt="Chield" />
                    <span> MIT</span>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <img src={Nesting} alt="Nesting" />
                  <span>{repo.forks_count}</span>
                </div>
                <div>
                  <img src={Star} alt="Star" />
                  {repo.stargazers_count}
                </div>
                <div>
                  <p>
                    updated{" "}
                    {
                      (currentDate = Math.floor(
                        (new Date() - new Date(repo.updated_at)) /
                          (1000 * 60 * 60 * 24)
                      ))
                    }{" "}
                    days ago
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
        <button className="view-repos" onClick={() => setViewAll(!viewAll)}>
          View all repositories
        </button>
      </div>
    </div>
  );
}

export default UserRepository;
