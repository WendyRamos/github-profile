import { useState, useEffect } from "react";

export function useApiServices({ username }) {
  const [userInfo, setUserInfo] = useState(null);
  const [repoUser, setRepoUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);

        const userData = await userResponse.json();
        setUserInfo(userData);

        const reposRenponse = await fetch(userData.repos_url);
        const reposData = await reposRenponse.json();
        setRepoUser(reposData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchData();
  }, [username]);

  return { userInfo, repoUser };
}
