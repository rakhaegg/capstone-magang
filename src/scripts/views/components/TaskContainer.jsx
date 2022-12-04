import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from './DialogContainer';
import CardLevelOne from './CardLevel1';
import CardLevelTwo from './CardLevelTwo';
import CardLevelTri from './CardLevelTri';
import CardLevelFour from './CardLevelFour';

function TaskContainer({ dataFromDatabase, level }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataFromDatabase);
  }, [dataFromDatabase]);
  return (
    <div>
      <DialogContainer updateDataInMemory={setData} level={level} data={data} />
      {
        level === 1
          ? <CardLevelOne data={data} updateDataInMemory={setData} /> : null
      }
      {
        level === 2
          ? <CardLevelTwo data={data} updateDataInMemory={setData} /> : null
      }
      {
        level === 3
          ? <CardLevelTri data={data} updateDataInMemory={setData} /> : null
       }
      {
        level === 4
          ? <CardLevelFour data={data} updateDataInMemory={setData} /> : null
      }

    </div>
  );
}

TaskContainer.propTypes = {
  dataFromDatabase: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  level: PropTypes.number.isRequired,
};

export default TaskContainer;
