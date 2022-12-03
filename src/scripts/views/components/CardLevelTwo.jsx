import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

function CardLevelTwo({ updateDataInMemory, data }) {
  return (
    <div>
      {data !== []
        ? data.map((item) => (
          <Alert item={item} updateDataInMemory={updateDataInMemory} />
        )) : null}
    </div>
  );
}
CardLevelTwo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
export default CardLevelTwo;
