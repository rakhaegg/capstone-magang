import React from 'react';
import PropTypes from 'prop-types';

function DialogContainer({
  saveData, handleInput,
  inputElement, closeDialog,
  idForm,
}) {
  return (
    <form onSubmit={saveData} id={idForm}>
      <h4>Title</h4>
      <input ref={inputElement} type="text" name="title" onChange={handleInput} />
      <h4>Notes</h4>
      <textarea ref={inputElement} name="note" onChange={handleInput} />
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
};
export default DialogContainer;
