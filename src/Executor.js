import rn from 'random-number';

class Executor {
  constructor(numbers, timeProcess, variance, deviation) {
    this.numbers = numbers;
    this.timeProcess = timeProcess;
    this.variance = variance;
    this.deviation = deviation;
    this.processes = Array.apply(null, Array(numbers));
    this.processesInfo = Array.apply(null, Array(numbers)).map(() => ({
      create: new Date(),
      logs: []
    }));
  }

  isBusy() {
    return this.processes.every(o => o != null);
  }

  process(client, callback) {
    const index = this.getIndexAvailable();
    this.processes[index] = client;
    this.processesInfo[index].logs.push(client);

    setTimeout(() => {
      this.processes[index] = null;
      callback();
    }, this.getTimeDelay(client));
  }

  getTimeDelay(client) {
    const time = client.delay * this.timeProcess;
    const devPostive = this.timeProcess + this.deviation;
    const devNegative = ((this.timeProcess - this.deviation) < 0) ? 0 : (this.timeProcess - this.deviation);

    const gen = rn.generator({
      min:  devNegative,
      max:  devPostive
    });

    return gen();
    return time;
  }

  getIndexAvailable() {
    for (let index in this.processes) {
      if (this.processes[index] == null) return parseInt(index);
    }
  }

  getBusyPercent(endDate) {
    return this.processesInfo.map((item, i) => {
      const create = item.create;
      const total = endDate - create;
      const work = item.logs.reduce((p, c) => {
        return p + (c.completedDate - c.beginDate);
      }, 0);

      return {
        atend: i,
        busy: work / total
      };
    });
  }
}

export default Executor;
