import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DialogContainer from './DialogContainer';

let draggable;
let dataDragabble;
function TaskContainer({ dataFromDatabase, level }) {
  // Data From Database save to Memory
  // Variable data from database is arrData
  const [data, setData] = useState([]);

  /**
   * Fungsi ini di render awal dan mempunyai tujuan untuk
   * memberikan event drag and drop sekaligus mengubah task level
   */
  /*
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
      const levelSource = draggable.parentNode.getAttribute('id');
      event.target.appendChild(draggable);
    });
  }, []);
  */
  /**
   * Fungsi akan dirender pertama kali
   * dan jika data yang baru dari database maka akan disimpan ke variable memory
   * ! IMPORTANT
   */

  useEffect(() => {
    setData(dataFromDatabase);
  }, [dataFromDatabase]);

  /**
   * Fungsi untuk merubah task yang berstatus false ke true
   */
  /*
  const updateDataTask = async (event, dataItem) => {
    event.preventDefault();
    const modifyItem = dataItem;
    modifyItem.status = true;
    if (idDialog === 'dialog-1') {
      await NoteiDB.putNote(modifyItem);
    } else if (idDialog === 'dialog-2') {
      await NoteiDBLevel2.putNote(modifyItem);
    } else if (idDialog === 'dialog-3') {
      await NoteiDBLevel3.putNote(modifyItem);
    } else if (idDialog === 'dialog-4') {
      await NoteiDBLevel4.putNote(modifyItem);
    }
    const newData = data.map((item) => {
      if (item.id === dataItem.id) {
        return modifyItem;
      }
      return item;
    });

    setData(newData);
  };
  */
  return (
    <div>
      <DialogContainer updateDataInMemory={setData} level={level} />
      {data === [] ? null
        : data.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle>{new Date(item.due_date).toLocaleTimeString()}</Card.Subtitle>
              <Card.Text>
                {item.note}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
/*
TaskContainer.propTypes = {
  title: PropTypes.string.isRequired,
  arrData: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  idDialog: PropTypes.string.isRequired,
  idForm: PropTypes.string.isRequired,
};
*/
export default TaskContainer;
