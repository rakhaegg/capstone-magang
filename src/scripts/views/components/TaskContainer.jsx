import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from './DialogContainer';
import CardLevelOne from './CardLevel1';

function TaskContainer({ dataFromDatabase, level }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataFromDatabase);
  }, [dataFromDatabase]);
  return (
    <div>
      <DialogContainer updateDataInMemory={setData} level={level} />
      {
        level === 1
          ? <CardLevelOne data={data} /> : null
      }

    </div>
  );
}

TaskContainer.propTypes = {
  dataFromDatabase: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  level: PropTypes.number.isRequired,
};

export default TaskContainer;
