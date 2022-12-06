import React, { useState, useEffect } from 'react';
import {
  Route, Routes, Link,
} from 'react-router-dom';
import {
  Navbar, Container, Nav, Col, Row, Button, Modal, ButtonGroup,
} from 'react-bootstrap';
import {
  Chart as ChartJS, ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';
import TaskPage from './pages/TaskPage';
import NoteiDB from '../data/dataNote';
import DataContext from '../contexts/dataFromDatabase';
import Summary from './pages/Summary';
import HelperData from '../utility/DataForDashboard';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  const [dataFromDatabase, setDataFromDatabase] = useState();

  useState(() => {
    async function getDataFromDatabase() {
      const object = {
        // eslint-disable-next-line max-len
        level_1: (await NoteiDB.getAllNote(1)).filter((item) => new Date(item.create_date).toDateString() === new Date().toDateString()),
        // eslint-disable-next-line max-len
        level_2: (await NoteiDB.getAllNote(2)).filter((item) => new Date(item.create_date).toDateString() === new Date().toDateString()),
        // eslint-disable-next-line max-len
        level_3: (await NoteiDB.getAllNote(3)).filter((item) => new Date(item.create_date).toDateString() === new Date().toDateString()),
        // eslint-disable-next-line max-len
        level_4: (await NoteiDB.getAllNote(4)).filter((item) => new Date(item.create_date).toDateString() === new Date().toDateString()),
      };
      setDataFromDatabase(object);
    }
    getDataFromDatabase();
  }, []);

  return (
    <div>
      <Container>
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weeks',
      },
    },
  };
  const pastWeek = [...Array(7).keys()].map((days) => new Date(Date.now() - 86400000 * days));
  const labels = pastWeek.map((item) => item.toDateString()).reverse();
  const [data, setData] = useState();
  useEffect(() => {
    async function getDataFromDatabase() {
      const objDataFoBarChart = await HelperData.init();
      setData({
        labels,
        datasets: [
          {
            label: 'Do it now',
            data: [...objDataFoBarChart.level1.map((item) => item.count)],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Schedule it',
            data: [...objDataFoBarChart.level2.map((item) => item.count)],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 132, 99, 0.5)',
          },
          {
            label: 'Delegate it',
            data: [...objDataFoBarChart.level3.map((item) => item.count)],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(99, 255, 132, 0.5)',
          },
          {
            label: 'Delete it',
            data: [...objDataFoBarChart.level4.map((item) => item.count)],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(132, 99, 255, 0.5)',
          },
        ],
      });
    }
    getDataFromDatabase();
  }, []);
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>BoosTask</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="/" role="button">Home </Link>
              </Nav>
            </Navbar.Collapse>
            <Nav>
              <Button variant="light" onClick={handleShow}>Report</Button>
            </Nav>
          </Container>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Activity Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  {data === undefined ? null
                    : <Bar options={options} data={data} role="img" aria-label="progress" />}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>
      <footer className="bg-light text-center text-lg-start">

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2022 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/"> BoostTask</a>
        </div>
      </footer>
    </>
  );
}
export { AppContainer, App };
