import rn from 'random-number';

class Executor {
  constructor(numbers, timeProcess, variance) {
    this.numbers = numbers;
    this.timeProcess = timeProcess;
    this.variance = variance;
    this.processes = Array.apply(null, Array(numbers));
  }

  isBusy() {
    return this.processes.every(o => o != null);
  }

  process(client, callback) {
    const index = this.getIndexAvailable();
    this.processes[index] = client;

    setTimeout(() => {
      this.processes[index] = null;
      callback();
    }, this.getTimeDelay(client));
  }

  getTimeDelay(client) {
    const time = client.delay * this.timeProcess;
    // const variancePostive = this.timeProcess + this.variance;
    // const varianceNegative = ((this.timeProcess - this.variance) < 0) ? 0 : (this.timeProcess - this.variance);
    // const gen = rn.generator({
    //   min:  varianceNegative,
    //   max:  variancePostive
    // });
    //
    // return gen();
    return time;
  }

  getIndexAvailable() {
    for (let index in this.processes) {
      if (this.processes[index] == null) return parseInt(index);
    }
  }
}

export default Executor;
