export function debounce(func: Function, delay: number): Function {
  let timerId: ReturnType<typeof setTimeout>;

  return function action(...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(action, args);
    }, delay);
  };
}

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
