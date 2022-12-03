import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle>{new Date(item.due_date).toLocaleTimeString()}</Card.Subtitle>
              <Card.Text>
                {item.note}
              </Card.Text>
              <Timer
                dataMinute={item.number}
                hak={hak}
                beriHak={beriHak}
                id={item.id}
                hapusHak={hapusHak}
              />
            </Card.Body>
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
