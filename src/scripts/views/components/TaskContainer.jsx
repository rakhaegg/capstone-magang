import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import DialogContainer from './DialogContainer';
import NoteiDB from '../../data/dataNote';
import NoteiDBLevel2 from '../../data/dataNoteLevel2';
import NoteiDBLevel3 from '../../data/dataNoteLevel3';
import NoteiDBLevel4 from '../../data/dataNoteLevel4';

let draggable;
function TaskContainer({
  title, arrData, idDialog, idForm, dataDate, containerLevel
}) {
  // Data From Database save to Memory
  // Variable data from database is arrData
  const [data, setData] = useState([]);
  const inputElement = useRef();
  useEffect(() => {
    const container = document.getElementById(containerLevel);
    container.addEventListener('mouseover', () => {
      container.addEventListener('dragstart', (e) => {
        draggable = e.target;
      });
    });
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    }, false);
    container.addEventListener('drop', (event) => {
      event.target.appendChild(draggable);
    });
  }, []);

  /**
   * Fungsi akan dirender pertama kali
   * dan jika data yang baru dari database maka akan disimpan ke variable memory
   * ! IMPORTANT
   */

  useEffect(() => {
    console.log('render');
    setData(arrData);
  }, [arrData]);

  /**
   * Fungsi akan dirender pertama kali
   * dan variable data mengalami perubahan
   * atau jika user baru menambahkan data ke variable data
   */
  useEffect(() => {
    inputElement.current = {
      id: uuidv4(),
      title: '',
      note: '',
      create_date: dataDate,
      due_date: new Date(),
      status: false,
    };
  }, [data]);
  /**
   * Fungsi ini menutup dialog
   */
  const closeDialog = () => {
    const containerDialog = document.getElementById(idDialog);
    const formSubmitData = document.getElementById(idForm);
    formSubmitData.reset();
    containerDialog.close();
  };
  /**
   * Fungsi ini untuk menginputkan data tanggal
   * dari user ke objek inputElement.current
   */
  const inputDate = (event) => {
    Object.assign(inputElement.current, {
      due_date: event,
    });
  };
  /*
  const updateDataDate = (date) => {
    inputElement.current.date = date;
  };
  */
  /**
   * Fungsi ini untuk input
   * data title dan note
   */
  const handleInput = (event) => {
    Object.assign(inputElement.current, {
      [event.target.name]: event.target.value,
    });
  };
  /**
   * Fungsi ini untuk menyimpan data yang baru
   * diinput oleh user ke database
   * dan render ulang component Task Container
   * render ulang variabel yang dimemory atau
   * langsung tampil
   */
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
    event.target.reset();
  };

  /**
   * Fungsi untuk merubah task yang berstatus false ke true
   */
  const updateDataTask = async (dataItem) => {
    // console.log('update task');
    // console.log(inputElement.current.id);
    const newData = data.map((item) => {
      if (item.id === dataItem.id) {
        const modifyItem = item;
        modifyItem.status = true;
        return modifyItem;
      }
      return item;
    });
    setData(newData);
  };
  console.log(`${idDialog}`, data);
  return (
    <div className="card" id={`parent-${containerLevel}`}>
      <div className="ctn-header">
        <h3>
          {title}
        </h3>
        <button
          type="button"
          onClick={() => {
            const favDialog = document.getElementById(idDialog);
            favDialog.showModal();
          }}
        >
          Add Item
        </button>
        <dialog id={idDialog}>
          <DialogContainer
            inputElement={inputElement}
            handleInput={handleInput}
            closeDialog={closeDialog}
            inputDate={inputDate}
            updateData={setData}
            saveData={saveData}
            idForm={idForm}
          />
        </dialog>
      </div>
      <div id={containerLevel} className="child-card">
        {data !== []
          ? data.map((dataNote) => (
            <div className="list-item" draggable="true">
              <h4>{dataNote.id}</h4>
              <h4>{dataNote.title}</h4>
              <h4>{dataNote.status.toString()}</h4>
              <h4>{dataNote.due_date.toLocaleDateString()}</h4>
              <button type="button" onClick={() => updateDataTask(dataNote)}>Selesai</button>
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
