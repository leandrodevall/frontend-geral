export const sample = (arr: any) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const range = (start: any, end: any, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const createBoard = (row: number, column: number, fill: any) => {
  return Array.from({length: row}, (() => Array(column).fill(fill)))
}

export const tap = (log: string) => {
  console.log("log", log)
}