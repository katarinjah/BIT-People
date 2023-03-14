import "./Container.css";
import { useState, useEffect } from 'react';

export const Container = () => {
    const [users, setUsers] = useState([]);
      
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://randomuser.me/api/?results=15");
            const data = await response.json();
        setUsers(data.results);
        };
        fetchData();
    }, []);
      
    const randomUsers = users.slice(0, 15);

    const formatEmail = (email) => {
        const [username, domain] = email.split("@");
        const firstThree = username.substring(0, 3);
        const lastThree = username.substring(username.length - 3);
        const formattedUsername = `${firstThree}...${lastThree}`;
        const formattedEmail = `${formattedUsername}@${domain}`;
        return formattedEmail;
    };

    return (
        <div className="container-fluid">
            {randomUsers.map(user => 
           <p>Email: {formatEmail(user.email)}</p>
            )}
        </div>
    );
}