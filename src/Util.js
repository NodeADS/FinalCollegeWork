import groupArray from 'group-array';

class Util {
  static splitByDay(array) {
    array.forEach(item => {
      item.dataChegada = Util.dateDay(item.dataChegada);
    });

    return groupArray(array, 'dataChegada');
  }

  static filerSortAndFormat(array, prop) {
    const temp = array.map(o => {
      const obj = { id: o.id };
      obj[prop] = Util.stringToDate(o[prop]);

      return obj;
    });

    return temp.sort((a, b) => b - a);
  }

  static stringToDate(str) {
    const parts = str.split(' ');
    const date = parts[0].split('/');
    const dateStr = `${date[1]}/${date[0]}/${date[2]} ${parts[1]}`;
    return new Date(dateStr);
  }

  static dateDay(str) {
    const parts = str.split(' ');
    return parts[0];
  }
}

export default Util;
