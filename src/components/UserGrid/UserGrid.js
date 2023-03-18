import "./UserGrid.css";

export const UserGrid = ({users}) => {

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
      <div className="row justify-content-center align-items-center g-4 user-grid">
        {randomUsers.map(user => (
          <div key={user.email} className="col-sm-12 col-md-6 col-lg-4">
            <div className={`card ${checkGender(user)}`}>
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
    </>
  );

}