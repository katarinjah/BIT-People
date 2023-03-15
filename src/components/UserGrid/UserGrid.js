import { useState, useEffect } from 'react';
import "./UserGrid.css";

export const UserGrid = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("https://randomuser.me/api/?results=15");
        const data = await response.json();
        setUsers(data.results);
      };
      fetchData();
    }, []);

  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 15);

  const formatEmail = (email) => {
    const [username, domain] = email.split("@");
    const firstThree = username.substring(0, 3);
    const lastThree = username.substring(username.length - 3);
    const formattedUsername = `${firstThree}...${lastThree}`;
    const formattedEmail = `${formattedUsername}@${domain}`;
    return formattedEmail;
  };

  const formatDate = (dob) => {
    const date = new Date(dob);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return formattedDate;
  };

  return (
    <>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-8">
          <div className="row g-3 user-list">
            {randomUsers.map(user => (
              <div key={user.email} className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                  <figure className="image">
                    <img src={user.picture.large} alt="user" className="img-top" />
                    <figcaption className="name">{user.name.first}</figcaption>
                  </figure>
                  <div className="card-contents">
                    <p>{formatEmail(user.email)}</p>
                    <p>Birthdate: {formatDate(user.dob.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

