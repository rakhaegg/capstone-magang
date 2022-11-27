import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from './DialogContainer';

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
    inputElement.current = {
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
  const saveData = (event) => {
    event.preventDefault();
    setData((arr) => [...arr, inputElement.current]);
    arrData.push(inputElement.current);
    event.target.reset();
    console.log(arrData);
  };
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
