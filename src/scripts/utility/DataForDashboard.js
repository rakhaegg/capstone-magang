import NoteiDB from '../data/dataNote';

const HelperData = {
  async init() {
    const pastWeek = [...Array(7).keys()].map((days) => new Date(Date.now() - 86400000 * days));
    const labels = pastWeek.map((item) => item.toDateString()).reverse();
    const data = {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
    };
    const temp = {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      temp.level1.push({
        day: labels[i],
        count: 0,
      });
      temp.level2.push({
        day: labels[i],
        count: 0,
      });
      temp.level3.push({
        day: labels[i],
        count: 0,
      });
      temp.level4.push({
        day: labels[i],
        count: 0,
      });
    }
    await this.getDataForLevelPastWeek(labels, data, 1);
    await this.getDataForLevelPastWeek(labels, data, 2);
    await this.getDataForLevelPastWeek(labels, data, 3);
    await this.getDataForLevelPastWeek(labels, data, 4);
    data.level1.forEach((item) => {
      const objIndex = temp.level1
        .findIndex((obj) => obj.day === new Date(item.create_date).toDateString());
      console.log(objIndex);
    });
    data.level2.forEach((item) => {
      const objIndex = temp.level2
        .findIndex((obj) => obj.day === new Date(item.create_date).toDateString());
      temp.level2[objIndex].count += 1;
    });
    data.level3.forEach((item) => {
      const objIndex = temp.level3
        .findIndex((obj) => obj.day === new Date(item.create_date).toDateString());
      temp.level3[objIndex].count += 1;
    });
    data.level4.forEach((item) => {
      const objIndex = temp.level4
        .findIndex((obj) => obj.day === new Date(item.create_date).toDateString());
      temp.level4[objIndex].count += 1;
    });
    return temp;
  },
  async getDataForLevelPastWeek(arrWeek, dataPassWeek, level) {
    (await NoteiDB.getAllNote(level)).forEach((item) => {
      if (arrWeek.includes(new Date(item.create_date).toDateString()) && item.done && level === 1) {
        dataPassWeek.level1.push(item);
      }
      if (arrWeek.includes(new Date(item.create_date).toDateString()) && level === 2) {
        dataPassWeek.level2.push(item);
      }
      if (arrWeek.includes(new Date(item.create_date).toDateString()) && level === 3) {
        dataPassWeek.level3.push(item);
      }
      if (arrWeek.includes(new Date(item.create_date).toDateString()) && level === 4) {
        dataPassWeek.level4.push(item);
      }
    });
  },
};

export default HelperData;
