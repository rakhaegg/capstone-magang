import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DialogContainer({
  saveData, handleInput,
  inputElement, closeDialog,
  idForm, inputDate,
}) {
  const [dataDate, setDataDate] = useState();
  useEffect(() => {
    setDataDate(new Date());
  }, []);
  const renderAgain = (e) => {
    setDataDate(e);
  };
  return (
    <form onSubmit={saveData} id={idForm}>

      <h4>Title</h4>
      <input ref={inputElement} type="text" name="title" onChange={handleInput} />
      <h4>Notes</h4>
      <textarea ref={inputElement} name="note" onChange={handleInput} />
      <DatePicker
        minDate={new Date()}
        selected={
        dataDate === undefined ? new Date()
          : dataDate
      }
        onChange={(e) => {
          inputDate(e);
          renderAgain(e);
        }}
      />
      <button type="submit"> Save </button>
      <button type="button" onClick={closeDialog}> Close </button>
    </form>
  );
}
DialogContainer.propTypes = {
  saveData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  inputElement: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  closeDialog: PropTypes.func.isRequired,
  idForm: PropTypes.string.isRequired,
  inputDate: PropTypes.func.isRequired,
};
export default DialogContainer;
