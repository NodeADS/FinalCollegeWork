import groupArray from 'group-array';
import moment from 'moment';

class Util {
  static splitByDay(array) {
    array.forEach(item => {
      item.data = Util.dateDay(item.dataChegada);
    });

    return groupArray(array, 'data');
  }

  static filerSortAndFormat(array, prop) {
    const temp = array.map(o => ({
      id: o.id,
      originalData: o[prop],
      data: Util.stringToDate(o[prop])
    }));

    return temp.sort((a, b) => a.data - b.data);
  }

  static listInterval(array) {
    let last;
    return array.reduce((p, c, i) => {
      if (i === 0) {
          p.push({
            id: c.id,
            data: c.data,
            interval: 0
          });
      } else {
        p.push({
          id: c.id,
          data: c.data,
          interval: Util.diferenceDates(last.data, c.data)
        });
      }

      last = c;
      return p;
    }, []);
  }

  static stringToDate(str) {
    return moment(str, 'DD-MM-YYYY hh:mm').toDate();
  }

  static dateDay(str) {
    const parts = str.split(' ');
    return parts[0];
  }

  static diferenceDates(min, max) {
    const diffMs = (max - min);
    return Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  }

  static getAverage(itens) {
    return itens.reduce((p, c) => p + c, 0) / itens.length;
  }

  static getMode(itens) {
    itens = itens.map((v) => Math.round(v));
    let dict = {}
      , greatestFreq = -1
      , mode;

    itens.map((item) => {
      if (dict[item]) {
        dict[item] = dict[item] + 1;
      } else {
        dict[item] = 1;
      }
    });

    for(let key in dict) {
      if(dict[key] > greatestFreq){
          greatestFreq = dict[key];
          mode = key;
      }
    }

    return parseInt(mode);
  }

  static getVariance(itens, average) {
    return itens.reduce((p, c) => {
      return p + Math.pow(c - average, 2);
    }, 0) / itens.length;
  }

  static getMedian(itens) {
    itens = itens.map((v) => Math.round(v));
    let middle = Math.floor(itens.length / 2);
    return itens[middle];
  }

  static getDeviation(variance) {
    let deviation = Math.sqrt(variance);
    if (deviation < 0) {
      deviation = deviation * -1;
    }
    return deviation;
  }
}

export default Util;
