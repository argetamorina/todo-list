export default class {
  static get() {
    return JSON.parse(localStorage.getItem('user'));
  }
}