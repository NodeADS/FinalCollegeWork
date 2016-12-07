class Manager {
  constructor(executors, onCompleted) {
    this.executors = executors;
    this.queue = [];
    this.onCompleted = onCompleted;
    this.itemMostDelayed = null;
    this.itemMostTimeInQueue = null;
    this.maxInQueue = 0;
    this.queueLogs = [];

    this.doIt = this.doIt.bind(this);
  }

  process(client) {
    client.processDate = new Date();
    const exec = this.getExecAvailable();

    if (exec) {
      this.doIt(client, exec);
    } else {
      this.addQueue(client);
    }
    this.addQuereLog();
  }

  doIt(client, exec) {
    client.beginDate = new Date();

    if (client.queueDate) {
      client.timeInQueue = client.beginDate - client.queueDate;
    } else {
      client.timeInQueue = 0;
    }
    this.mostTimeInQueue(client);
    exec.process(client, () => {
      client.completedDate = new Date();
      client.timeToComplete = client.completedDate - client.processDate;
      this.mostDelayed(client);
      this.onCompleted(client);
      const newClient = this.getNextItem();

      if (newClient) {
        this.doIt(newClient, exec);
      }
      this.addQuereLog();
    })
  }

  getNextItem() {
    return this.queue.shift();
  }

  addQueue(client) {
    client.queueDate = new Date();
    this.queue.push(client);
    this.calclMaxInQueue();
  }

  getExecAvailable() {
    for (let i in this.executors) {
      const exec = this.executors[i];
      if (!exec.isBusy()) {
        return exec;
      }
    }
  }

  addQuereLog() {
    this.queueLogs.push({
      date: new Date(),
      size: this.queue.length
    });
  }

  calclMaxInQueue() {
    const number = this.queue.length;
    if (this.maxInQueue < number) {
      this.maxInQueue = number;
    }
  }

  mostDelayed(client) {
    if (this.itemMostDelayed) {
      this.itemMostDelayed = client.timeToComplete > this.itemMostDelayed.timeToComplete ? client : this.itemMostDelayed;
    } else {
      this.itemMostDelayed = client;
    }
  }

  mostTimeInQueue(client) {
    if (this.itemMostTimeInQueue) {
      this.itemMostTimeInQueue = client.timeInQueue > this.itemMostTimeInQueue.timeInQueue ? client : this.itemMostTimeInQueue;
    } else {
      this.itemMostTimeInQueue = client;
    }
  }
}

export default Manager;
