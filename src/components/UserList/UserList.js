import { FaBirthdayCake, FaEnvelope } from "react-icons/fa";
import "./UserList.css";

export const UserList = ({users}) => {

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

    const checkGender = (user) => {
        let className = "";
        if (user.gender === "female") {
            className = "female";
        };
        return className;
    };

    return (
        <>
            {randomUsers.map(user => (
                <div key={user.email} className={`row mb-3 justify-content-center align-items-center ${checkGender(user)}`}>
                    <div className="col-sm-12 col-md-4 col-lg-2">
                        <img src={user.picture.large} alt="user" className="rounded-circle" />
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-10">
                        <p className="name-list">{user.name.first} {user.name.last}</p>
                        <p className="email"><FaEnvelope /> {formatEmail(user.email)}</p>
                        <p className="dob"><FaBirthdayCake /> {formatDate(user.dob.date)}</p>
                    </div>
                </div>
            ))}
        </>
    );    
}