import Cookies from "js-cookie";

export default class CookieClient {
  static loadState() {
    try {
      const cookieData = Cookies.get("state");
      if (cookieData === null) {
        return undefined;
      }
      return JSON.parse(cookieData);
    } catch (err) {
      return undefined;
    }
  }

  static saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      Cookies.set("state", serializedState, { expires: 1 / 24 });
    } catch (err) {
      // pass
    }
  }
}
