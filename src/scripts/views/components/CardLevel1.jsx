import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Timer from './Timer';

function CardLevelOne({ data }) {
  const [hak, setHak] = useState('');
  const beriHak = (id) => {
    setHak(id);
  };
  const hapusHak = () => {
    setHak('');
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
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title>Timer Task</Card.Title>
                    <Card.Text>
                      <Timer
                      hak={hak}
                      beriHak={beriHak}
                      hapusHak={hapusHak}
                      data={item}
                      />
                    </Card.Text>
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
};

export default CardLevelOne;
