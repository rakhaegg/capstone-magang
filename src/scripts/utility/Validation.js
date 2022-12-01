import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import NoteiDB from '../data/dataNote';

const ValdationConfiguration = {
  init(level, updateDataInMemory) {
    if (level === 1) {
      return this._configLevelBasic(updateDataInMemory, level);
    }
    if (level === 2) {
      return this._configLevelBasic(updateDataInMemory, level);
    }
    if (level === 3) {
      return this._configLevel3(updateDataInMemory);
    }
    if (level === 4) {
      return this._configLevelBasic(updateDataInMemory, level);
    }
    return null;
  },

  _configLevelBasic(updateDataInMemory, level) {
    const formik = useFormik({
      initialValues: {
        id: uuidv4(),
        title: '',
        note: '',
        create_date: new Date().getTime(),
        due_date: new Date().getTime(),
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        note: Yup.string().required('Required'),
      }),
      onSubmit: (values) => {
        updateDataInMemory((prevData) => [...prevData, values]);
        async function saveDataToDabase() {
          await NoteiDB.putNote(values, level);
        }
        saveDataToDabase();
        formik.resetForm();
      },
    });
    return formik;
  },
  _configLevel3(updateDataInMemory) {
    const formik = useFormik({
      initialValues: {
        id: uuidv4(),
        title: '',
        note: '',
        create_date: new Date().getTime(),
        due_date: new Date().getTime(),
        email: '',
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        note: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
      }),
      onSubmit: (values) => {
        updateDataInMemory((prevData) => [...prevData, values]);
        async function saveDataToDabase() {
          await NoteiDB.putNote(values, 3);
        }
        saveDataToDabase();
        formik.resetForm();
      },
    });
    return formik;
  },
};
export default ValdationConfiguration;
