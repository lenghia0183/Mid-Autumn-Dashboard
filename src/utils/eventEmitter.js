import { EventEmitter } from "events";

export const eventEmitter = new EventEmitter();

export const triggerLogout = () => {
  eventEmitter.emit("logout");
};

export const onLogout = (listener) => {
  eventEmitter.on("logout", listener);
};
