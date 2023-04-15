import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Container } from './components/Container/Container';
import { Loader } from './components/Loader/Loader';
import { SearchField } from './components/SearchField/SearchField';
import { NoResults } from './components/NoResults/NoResults';
import { GenderCounter } from './components/GenderCounter/GenderCounter';
import { UserList } from './components/UserList/UserList';
import { UserGrid } from './components/UserGrid/UserGrid';
import { About } from './components/About/About';

function App() {
  const [layout, setLayout] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [lastUpdate, setLastUpdate] = useState();
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const toggleLayout = () => {
    localStorage.setItem("layout", layout === "list" ? "grid" : "list");
    setLayout(layout === "list" ? "grid" : "list");
  };  

  const handleReload = () => {
    setLastUpdate(Date.now());
    localStorage.setItem("lastUpdate", Date.now());
    localStorage.setItem("layout", layout);
    window.location.reload();
  };

  const elapsedTime = () => {
    const diff = Math.floor((new Date() - lastUpdate) / 1000);

    if (diff < 60) {
      return `less than a minute ago`;
    } else if (diff < 60 * 60) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < 24 * 60 * 60) {
      const hours = Math.floor(diff / (60 * 60));
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diff < 7 * 24 * 60 * 60) {
      const days = Math.floor(diff / (24 * 60 * 60));
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diff < 30 * 24 * 60 * 60) {
      const weeks = Math.floor(diff / (7 * 24 * 60 * 60));
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diff < 365 * 24 * 60 * 60) {
      const months = Math.floor(diff / (30 * 24 * 60 * 60));
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      return "Over a year ago";
    }
  };

  const timeElapsed = lastUpdate && elapsedTime(lastUpdate);

  useEffect(() => {
    const storedLastUpdate = localStorage.getItem("lastUpdate");
    if (storedLastUpdate) {
      setLastUpdate(parseInt(storedLastUpdate));
    };

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("https://randomuser.me/api/?results=15");
      const data = await response.json();
      setUsers(data.results);
      setIsLoading(false);
      localStorage.setItem("users", JSON.stringify(data.results));
    };
      fetchData();
  }, []);

  useEffect(() => {
    setIsSearching(true);
    const newFilteredUsers = users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const query = searchQuery.toLowerCase();
      return fullName.toLowerCase().includes(query);
    });    
    let maleCount = 0;
    let femaleCount = 0;
    users.forEach((user) => {
      if (user.gender === "male") {
        maleCount++;
      } else {
        femaleCount++;
      }
    });
    setMale(maleCount);
    setFemale(femaleCount);
    setFilteredUsers(newFilteredUsers);
    setIsSearching(false);
  }, [searchQuery, users]);
  
  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    if (storedLayout) {
      setLayout(storedLayout);
    };
  }, []);

  useEffect(() => {
    const storedLastUpdate = localStorage.getItem("lastUpdate");
    if (storedLastUpdate) {
      setLastUpdate(parseInt(storedLastUpdate));
    };
  }, []);
  
  return (
    <>
      <Header toggleLayout={toggleLayout} layout={layout} setLayout={setLayout} handleReload={handleReload} />
      <Routes>
        <Route path={'/home'} element={
          <Container>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {isSearching ? null : <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
                <GenderCounter male={male} female={female} setMale={setMale} setFemale=
                {setFemale} />
                {!filteredUsers.length && <NoResults />}
                {layout === "list" ? (
                  <UserList users={filteredUsers} />
                ) : (
                  <UserGrid users={filteredUsers} />
                )}
              </>
            )}
          </Container>
        } />
        <Route path={'/about'} element={<About />} />
        <Route path={'/'} element={<Navigate replace to={'/home'} />} />
      </Routes>
      <Footer timeElapsed={timeElapsed} />
    </>
  );
};

export default App;