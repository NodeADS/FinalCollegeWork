class Manager {
  constructor(executors, onCompleted) {
    this.executors = executors;
    this.queue = [];
    this.onCompleted = onCompleted;

    this.doIt = this.doIt.bind(this);
  }

  process(client) {
    const exec = this.getExecAvailable();

    if (exec) {
      this.doIt(client, exec);
    } else {
      this.addQueue(client);
    }
  }

  doIt(client, exec) {
    exec.process(client, () => {
      this.onCompleted(client);
      const newClient = this.getNextItem();

      if (newClient) {
        this.doIt(newClient, exec);
      }
    })
  }

  getNextItem() {
    return this.queue.shift();
  }

  addQueue(client) {
    this.queue.push(client);
  }

  getExecAvailable() {
    for (let i in this.executors) {
      const exec = this.executors[i];
      if (!exec.isBusy()) {
        return exec;
      }
    }
  }
}

export default Manager;
