import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FloatingLabel, Form, Modal, Button,
} from 'react-bootstrap';
import ValdationConfiguration from '../../utility/Validation';

function DialogContainer({ updateDataInMemory, level }) {
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const formik = ValdationConfiguration.init(level, updateDataInMemory);
  return (
    <>
      <button id="open_dialog" onClick={handleShow} type="button">Add Task</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sibuk apa kamu?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group className="mb-3">
              <FloatingLabel>

                <Form.Control
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.title && formik.errors.title ? 'error' : null
                  }
                  isInvalid={!!formik.errors.title}
                  isValid={
                    formik.errors.title === undefined
                    && formik.values.title !== ''
                  }
                />
                <label htmlFor="title">Title</label>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Floating>
                <Form.Control
                  id="note"
                  name="note"
                  as="textarea"
                  placeholder="Enter Title"
                  onChange={formik.handleChange}
                  value={formik.values.note}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.note && formik.errors.note ? 'error' : null
                  }
                  isInvalid={!!formik.errors.note}
                  isValid={
                    formik.errors.note === undefined
                    && formik.values.note !== ''
                  }
                  style={{ height: '100px' }}
                />
                <label htmlFor="note">Note</label>

              </Form.Floating>
              <Form.Control.Feedback type="invalid">
                {formik.errors.note}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid" />
            </Form.Group>
            {level === 2
              ? (
                <Form.Group className="mb-3">
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    includeDates={[new Date()]}
                    showTimeSelect
                    timeIntervals={15}
                    filterTime={filterPassedTime}
                    name="due_date"
                    id="due_date"
                    onChange={(date) => {
                      formik.setFieldValue('due_date', date.getTime());
                      setStartDate(date);
                    }}
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </Form.Group>
              )
              : null}
            {
              level === 3
                ? (
                  <Form.Group className="mb-3">
                    <Form.Floating>
                      <Form.Control
                        id="email"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.email}
                        isValid={
                    formik.errors.email === undefined
                    && formik.values.email !== ''
                  }
                      />
                      <label htmlFor="email">Email</label>
                    </Form.Floating>
                  </Form.Group>
                )
                : null
            }
            {
              level === 1 ? (
                <Form.Group className="mb-3">
                  <Form.Floating>
                    <Form.Control
                      id="number"
                      type="number"
                      name="number"
                      onChange={formik.handleChange}
                      value={formik.values.number}
                      onBlur={formik.handleBlur}
                      isInvalid={!!formik.errors.number}
                      isValid={
                        formik.errors.number === undefined
                        && formik.values.number !== ''
                      }
                    />
                    <label htmlFor="number">Minute</label>
                    <Form.Control.Feedback type="invalid">
                      Minimal 25 minute yaaa
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>
              ) : null
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DialogContainer.propTypes = {
  updateDataInMemory: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
};

export default DialogContainer;
