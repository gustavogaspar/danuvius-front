export default class GetToken {
  constructor() {
    this.token = "";
    this._subscribers = [];
  }

  subscribe(func) {
    this._subscribers.push(func);
  }

  notify() {
    this._subscribers.forEach((func) => func(this.token));
  }

  unsubscribe(func) {
    this._subscribers = this._inscritos.filter((f) => f !== func);
  }

  setToken(newToken) {
    this.token = newToken;
    this.notify();
  }
}
