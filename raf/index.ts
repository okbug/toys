// const root = typeof window === "undefined" ? globalThis : window;
// const prefix = "AnimationFrame";
// let raf: (cb: () => void) => number | undefined = root["request" + prefix];
// let caf: (handle: number) => void = root["cancel" + prefix];

import now from "./performance-now";
type Queue = {
  handle: number;
  cancelled: boolean;
  callback: (last: number) => void;
};


let raf: ((cb: () => void) => number | undefined) | null = null
let caf: ((handle: number) => void) | null = null
if (!raf || !caf) {
  let last = 0,
    id = 0,
    queue: Queue[] = [],
    frameDuration = 1000 / 60;

  raf = (callback) => {
    if (!queue.length) {
      let _now = now(),
        next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(() => {
        let cp = queue.slice(0);
        queue.length = 0;
        for (let i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(() => {
                throw e;
              }, 0);
            }
          }
        }
      }, Math.round(next));
      queue.push({
        handle: ++id,
        callback,
        cancelled: false,
      });
      return id;
    }
  };

  caf = (handle) => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

export {raf, caf}