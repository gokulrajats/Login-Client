import { PlatformApi } from "../Utils/api";

export default class User {
  static SignupService(data, callback, error, next) {
    return PlatformApi.post("/signup", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }

  static SigninService(data, callback, error, next) {
    return PlatformApi.post("/signin", data)
      .then(callback)
      .catch(error)
      .finally(next);
  }
}