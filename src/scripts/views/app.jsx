import React, { useState } from 'react';
import {
  Route, Routes, Link,
} from 'react-router-dom';
import {
  Navbar, Container, Nav, Col, Row,
} from 'react-bootstrap';
import TaskPage from './pages/TaskPage';
import NoteiDB from '../data/dataNote';
import DataContext from '../contexts/dataFromDatabase';

function App() {
  const [dataFromDatabase, setDataFromDatabase] = useState();

  useState(() => {
    async function getDataFromDatabase() {
      const object = {
        level_1: await NoteiDB.getAllNote(1),
        level_2: await NoteiDB.getAllNote(2),
        level_3: await NoteiDB.getAllNote(3),
        level_4: await NoteiDB.getAllNote(4),
      };
      setDataFromDatabase(object);
    }
    getDataFromDatabase();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <button type="button">Yesterday</button>

          </Col>
          <Col>
            <button type="button">Tomorrow</button>
          </Col>
        </Row>
        <Row>
          {dataFromDatabase === undefined ? null : (
            <DataContext.Provider value={dataFromDatabase}>
              <TaskPage />
            </DataContext.Provider>
          )}
        </Row>
      </Container>

    </div>
  );
}
function AppContainer() {
  return (
    <main>
      <header>
        {/* <nav>
          <ul>
            <li id="home-click"><Link to="/">Home</Link></li>
            <li><Link to="/archive">Archive</Link></li>
          </ul>
        </nav> */}
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>BoosTask</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/archive">Archive</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </main>
  );
}
export { AppContainer, App };
