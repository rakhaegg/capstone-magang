import React, { useEffect, useState } from 'react';
import {
  Route, Routes, Link,
} from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import NoteiDB from '../data/dataNote';
import NoteiDBLevel2 from '../data/dataNoteLevel2';
import NoteiDBLevel3 from '../data/dataNoteLevel3';
import NoteiDBLevel4 from '../data/dataNoteLevel4';

function App() {
  const [dataAllLevel, setDataAllLevel] = useState();
  const [dataForDate, setDataForDate] = useState(new Date());

  // GET DATA FROM DATABASE
  useEffect(() => {
    async function getDataFromDatabase() {
      const d = new Date();
      const dataLevel1 = (await NoteiDB.getAllNote())
        .filter((item) => item.create_date.toLocaleDateString() === d.toLocaleDateString());
      const dataLevel2 = (await NoteiDBLevel2.getAllNote())
        .filter((item) => item.create_date.toLocaleDateString() === d.toLocaleDateString());
      const dataLevel3 = (await NoteiDBLevel3.getAllNote())
        .filter((item) => item.create_date.toLocaleDateString() === d.toLocaleDateString());
      const dataLevel4 = (await NoteiDBLevel4.getAllNote())
        .filter((item) => item.create_date.toLocaleDateString() === d.toLocaleDateString());

      setDataAllLevel({
        level1: dataLevel1,
        level2: dataLevel2,
        level3: dataLevel3,
        level4: dataLevel4,
      });
    }

    getDataFromDatabase();
  }, []);
  
  const getDataYesterday = async () => {
    console.log('Yesterday');
    dataForDate.setDate(dataForDate.getDate() - 1);
    const dataLevel1 = (await NoteiDB.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel2 = (await NoteiDBLevel2.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel3 = (await NoteiDBLevel3.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel4 = (await NoteiDBLevel4.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());

    setDataAllLevel({
      level1: dataLevel1,
      level2: dataLevel2,
      level3: dataLevel3,
      level4: dataLevel4,
    });
    console.log('Hre');
    setDataForDate(dataForDate);
  };
  const getDataForTomorrow = async () => {
    dataForDate.setDate(dataForDate.getDate() + 1);
    const dataLevel1 = (await NoteiDB.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel2 = (await NoteiDBLevel2.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel3 = (await NoteiDBLevel3.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());
    const dataLevel4 = (await NoteiDBLevel4.getAllNote())
      .filter((item) => item.create_date.toLocaleDateString() === dataForDate.toLocaleDateString());

    setDataAllLevel({
      level1: dataLevel1,
      level2: dataLevel2,
      level3: dataLevel3,
      level4: dataLevel4,
    });
    setDataForDate(dataForDate);
  };
  return (
    <div>
      {dataAllLevel === undefined ? null : (
        <div aria-label="container-task">

          <button aria-label="Button Date Yesterday" type="button" onClick={getDataYesterday}>Yesterday</button>
          <h2 aria-label="Text Date">{dataForDate.toDateString()}</h2>
          <button aria-label="Button Date Tomorrow" type="button" onClick={getDataForTomorrow}>Tomorrow</button>
          <TaskPage data={dataAllLevel} dataDate={dataForDate} />
        </div>
      )}
    </div>
  );
}
function AppContainer() {
  return (
    <main>
      <header>
        <nav>
          <ul>
            <li id="home-click"><Link to="/">Home</Link></li>
            <li><Link to="/archive">Archive</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </main>
  );
}
export { AppContainer, App };
