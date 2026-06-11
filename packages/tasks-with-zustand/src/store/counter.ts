type Listener = () => void;

/**
 * Counter store
 */
class Counter {
  count = 0;
  listeners: Listener[] = [];
  start() {
    let k = 0;
    const timer = setInterval(() => {
      if (k < 10) {
        this.increment();
        k++;
      } else {
        k = 0;
        clearInterval(timer);
      }
    }, 1500);
  }
  increment() {
    this.count += 1;
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  subscribe = (listener: Listener) => {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };
  getSnapShot = () => this.count;
}

export const counter = new Counter();
