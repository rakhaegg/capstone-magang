import React from 'react';
import {
  Button, Card, Col, Container, Row,

} from 'react-bootstrap';
import PropTypes from 'prop-types';
import NoteiDB from '../../data/dataNote';

function CardLevelFour({ data, updateDataInMemory }) {
  const deleteData = (item) => {
    updateDataInMemory((dataInMemory) => dataInMemory
      .filter((itemData) => itemData.id !== item.id));
    async function deleteDataFromDatabase() {
      await NoteiDB.deleteNote(item.id, 4);
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
              </Row>
            </Container>
          </Card>
        )) : null}
    </div>
  );
}
CardLevelFour.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  updateDataInMemory: PropTypes.func.isRequired,
};
export default CardLevelFour;
