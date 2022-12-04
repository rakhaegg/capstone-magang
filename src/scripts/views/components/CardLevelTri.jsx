import React from 'react';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import NoteiDB from '../../data/dataNote';

function CardLevelTri({ data, updateDataInMemory }) {
  const deleteData = (item) => {
    updateDataInMemory((dataInMemory) => dataInMemory
      .filter((itemData) => itemData.id !== item.id));
    async function deleteDataFromDatabase() {
      await NoteiDB.deleteNote(item.id, 3);
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
                    <Card.Subtitle>Informasi</Card.Subtitle>
                    <Card.Text>
                      Kirim task ke
                      <b>
                        {' '}
                        {item.email}
                      </b>
                      {' '}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        )) : null }
    </div>
  );
}
CardLevelTri.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  updateDataInMemory: PropTypes.func.isRequired,
};
export default CardLevelTri;
