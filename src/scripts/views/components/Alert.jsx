import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Col, Container, Row, Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import NoteiDB from '../../data/dataNote';

function AlertContainer({ item, updateDataInMemory }) {
  const startTaskHours = new Date(item.due_date).getHours();
  const startTaskMinutes = new Date(item.due_date).getMinutes();

  const [dateRightNow, setDateRightNow] = useState(new Date());
  const countRef = useRef(null);
  const [modalShow, showModalShow] = useState(false);
  const handleClose = () => showModalShow(false);

  countRef.current = dateRightNow;

  useEffect(() => {
    const interval = setInterval(() => {
      setDateRightNow(new Date());
      if (startTaskHours === countRef.current.getHours()
        && startTaskMinutes === countRef.current.getMinutes()
      ) {
        showModalShow(true);
        clearInterval(interval);
      }
      if ((startTaskHours <= countRef.current.getHours())) {
        console.log('here');
        if (startTaskMinutes < countRef.current.getMinutes()) {
          console.log('here');
          showModalShow(true);
          clearInterval(interval);
        } else {
          clearInterval(interval);
          showModalShow(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const deleteData = () => {
    updateDataInMemory((data) => data.filter((itemData) => itemData.id !== item.id));
    async function deletDataFromDatabase() {
      await NoteiDB.deleteNote(item.id, 2);
    }
    deletDataFromDatabase();
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
      modalShow === false
        ? (
          <Card key={item.id}>
            <Container>
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle>
                      Mulai di
                      {new Date(item.due_date).toLocaleTimeString()}
                    </Card.Subtitle>
                    <Card.Text>
                      {item.note}
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>Apa yang akan kamu lakukan?</Card.Title>
                    <Card.Text>
                      <Button variant="danger" onClick={deleteData}>Hapus</Button>
                    </Card.Text>

                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        )
        : (
          <Alert variant="danger" onClose={() => handleClose()} dismissible>
            <Alert.Heading>
              Task kamu
              {' '}
              {item.title}
              {' '}
              sudah mulai!!
            </Alert.Heading>
            <p>
              Task kamu sudah mulai mohon dikerjakan. Jika tidak kamu dosa!
            </p>
          </Alert>
        )
  }
    </>
  );
}
AlertContainer.propTypes = {
  item: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  updateDataInMemory: PropTypes.func.isRequired,
};

export default AlertContainer;
