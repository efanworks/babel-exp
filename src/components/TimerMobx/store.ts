import { makeAutoObservable } from "mobx";

export class Timer {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.secondsPassed += 1;
  }
  reset() {
    this.secondsPassed = 0;
  }
}
