import { useState, useEffect } from 'react';
import { FaBirthdayCake, FaEnvelope } from "react-icons/fa";
import "./UserList.css";

export const UserList = () => {
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
            {randomUsers.map(user => (
                <div className="row mb-3 justify-content-center align-items-center">
                    <div className="col-sm-12 col-md-4 col-lg-2">
                        <img src={user.picture.large} alt="user" className="rounded-circle" />
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-10">
                        <p className="name-list">{user.name.first} {user.name.last}</p>
                        <p className="email"><FaEnvelope /> {formatEmail(user.email)}</p>
                        <p className="dob"><FaBirthdayCake /> {formatDate(user.dob.date)}</p>
                    </div>
                    <hr />
                </div>
                ))}
         
        </>
    );    
}