class Scheduler {
  lmt = 2;
  onWrk = 0;
  pendingWrks = [];
  constructor(lmt) {
    this.lmt = lmt;
  }
  add(task) {
    return new Promise((resolve, reject) => {
      const work = () => {
        this.onWrk++;
        task()
          .then(resolve, reject)
          .finally(() => {
            this.onWrk--;
            if (this.pendingWrks.length) {
              const willWork = this.pendingWrks.shift();
              willWork();
            }
          });
      };
      if (this.onWrk < this.lmt) {
        work();
      } else {
        this.pendingWrks.push(work);
      }
    });
  }
}

const task = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const scheduler = new Scheduler(2);
scheduler.add(() => task(1000)).then(() => console.log(1));
scheduler.add(() => task(500)).then(() => console.log(2));
scheduler.add(() => task(1200)).then(() => console.log(3));
scheduler.add(() => task(100)).then(() => console.log(4));
