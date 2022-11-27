import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import DialogContainer from './DialogContainer';
import NoteiDB from '../../data/dataNote';
import NoteiDBLevel2 from '../../data/dataNoteLevel2';
import NoteiDBLevel3 from '../../data/dataNoteLevel3';
import NoteiDBLevel4 from '../../data/dataNoteLevel4';

function TaskContainer({
  title, arrData, idDialog, idForm,
}) {
  const [data, setData] = useState([]);
  const inputElement = useRef();
  const clickAddItem = () => {
    const favDialog = document.getElementById(idDialog);
    favDialog.showModal();
  };
  useEffect(() => {
    async function getDataFromDatabase() {
      let dataFromDatabase = null;
      if (idDialog === 'dialog-1') {
        dataFromDatabase = await NoteiDB.getAllNote();
      } else if (idDialog === 'dialog-2') {
        dataFromDatabase = await NoteiDBLevel2.getAllNote();
      } else if (idDialog === 'dialog-3') {
        dataFromDatabase = await NoteiDBLevel3.getAllNote();
      } else if (idDialog === 'dialog-4') {
        dataFromDatabase = await NoteiDBLevel4.getAllNote();
      }
      setData(dataFromDatabase);
    }
    getDataFromDatabase();
  }, []);
  useEffect(() => {
    inputElement.current = {
      id: uuidv4(),
      title: '',
      note: '',
      date: new Date(),
    };
  }, [data]);
  const closeDialog = () => {
    const containerDialog = document.getElementById(idDialog);
    const formSubmitData = document.getElementById(idForm);
    formSubmitData.reset();
    containerDialog.close();
  };

  const inputDate = (event) => {
    Object.assign(inputElement.current, {
      date: event,
    });
  };
  const updateDataDate = (date) => {
    inputElement.current.date = date;
  };
  const handleInput = (event) => {
    Object.assign(inputElement.current, {
      [event.target.name]: event.target.value,
    });
  };
  const saveData = async (event) => {
    event.preventDefault();
    if (idDialog === 'dialog-1') {
      await NoteiDB.putNote(inputElement.current);
    } else if (idDialog === 'dialog-2') {
      await NoteiDBLevel2.putNote(inputElement.current);
    } else if (idDialog === 'dialog-3') {
      await NoteiDBLevel3.putNote(inputElement.current);
    } else if (idDialog === 'dialog-4') {
      await NoteiDBLevel4.putNote(inputElement.current);
    }
    setData((arr) => [...arr, inputElement.current]);
    arrData.push(inputElement.current);
    event.target.reset();
    console.log(arrData);
  };
  console.log(data);
  return (
    <div id="ctn-level-1" className="card">
      <div className="ctn-header">
        <h3>
          {title}
        </h3>
        <button type="button" onClick={() => clickAddItem()}>Add Item</button>
        <dialog id={idDialog}>
          <DialogContainer
            inputElement={inputElement}
            handleInput={handleInput}
            closeDialog={closeDialog}
            inputDate={inputDate}
            updateData={setData}
            saveData={saveData}
            updateDateDate={updateDataDate}
            idForm={idForm}
          />
        </dialog>
      </div>
      <div>
        {data !== []
          ? data.map((dataNote) => (
            <div>
              <h4>{dataNote.title}</h4>
              <h4>{dataNote.date.toLocaleDateString()}</h4>
            </div>
          ))
          : null }
      </div>
    </div>
  );
}
TaskContainer.propTypes = {
  title: PropTypes.string.isRequired,
  arrData: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  idDialog: PropTypes.string.isRequired,
  idForm: PropTypes.string.isRequired,
};
export default TaskContainer;
