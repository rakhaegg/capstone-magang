import React from 'react';
import PropTypes from 'prop-types';
import AlertContainer from './Alert';

function CardLevelTwo({ updateDataInMemory, data }) {
  return (
    <div>
      {data !== []
        ? data.map((item) => (
          <AlertContainer key={item.id} item={item} updateDataInMemory={updateDataInMemory} />
        )) : null}
    </div>
  );
}
CardLevelTwo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  updateDataInMemory: PropTypes.func.isRequired,
};
export default CardLevelTwo;
