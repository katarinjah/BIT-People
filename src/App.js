import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Container } from './components/Container/Container';
import { Footer } from './components/Footer/Footer';
import { UserList } from './components/UserList/UserList';
import { UserGrid } from './components/UserGrid/UserGrid';

function App() {
  const [layout, setLayout] = useState("list");

  const toggleLayout = () => {
    setLayout(layout === "list" ? "grid" : "list");
  };

  return (
    <>
      <Header toggleLayout={toggleLayout} layout={layout} />
      <Container>
        {layout === "list" ? (
          <UserList />
        ) : (
          <UserGrid />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
