import React, { useState } from 'react';
import {
  Card, Container, Row, Col, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Timer from './Timer';
import NoteiDB from '../../data/dataNote';

function CardLevelOne({ data, updateDataInMemory }) {
  const [hak, setHak] = useState('');
  const beriHak = (id) => {
    setHak(id);
  };
  const hapusHak = () => {
    setHak('');
  };
  const deleteData = (item) => {
    updateDataInMemory((dataInMemory) => dataInMemory
      .filter((itemData) => itemData.id !== item.id));
    async function deleteDataFromDatabase() {
      await NoteiDB.deleteNote(item.id, 1);
    }
    deleteDataFromDatabase();
  };
  return (
    <div>
      {data !== []
        ? data.map((item) => (
          <Card key={item.id}>
            <Container>
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle>{new Date(item.due_date).toLocaleTimeString()}</Card.Subtitle>
                    <Card.Text>
                      {item.note}
                    </Card.Text>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        deleteData(item);
                      }}
                    >
                      Hapus
                    </Button>
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>Timer Task</Card.Title>
                    <Timer
                      hak={hak}
                      beriHak={beriHak}
                      hapusHak={hapusHak}
                      data={item}
                    />
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        ))
        : null}
    </div>
  );
}
CardLevelOne.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  updateDataInMemory: PropTypes.func.isRequired,
};

export default CardLevelOne;
