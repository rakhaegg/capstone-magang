import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container,Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NoteiDB from '../../data/dataNote';


function Alert({ item ,updateDataInMemory}) {
  const startTaskHours = new Date(item.due_date).getHours();
  const startTaskMinutes = new Date(item.due_date).getMinutes();

  const [dateRightNow, setDateRightNow] = useState(new Date());
  const countRef = useRef(null);
  countRef.current = dateRightNow;

  useEffect(() => {
    const interval = setInterval(() => {
      setDateRightNow(new Date());
      //sconsole.log(countRef.current.getHours());
      //console.log(countRef.current.getMinutes());
      if (startTaskHours === countRef.current.getHours()
        && startTaskMinutes === countRef.current.getMinutes()
      ) {
        window.alert('Mulai');
        console.log('done');
        clearInterval(interval);
      }
      if ((startTaskHours <= countRef.current.getHours())) {
        if (startTaskMinutes < countRef.current.getMinutes()) {
          clearInterval(interval);
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
    <Card key={item.id}>
      <Container>
        <Row>
          <Col>
          <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Subtitle>Mulai di {new Date(item.due_date).toLocaleTimeString()}</Card.Subtitle>
        <Card.Text>
          {item.note}
          {/* <Button variant="danger" onClick={deleteData}>Hapus</Button> */}
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
  );
}
Alert.propTypes = {
  item: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default Alert;
