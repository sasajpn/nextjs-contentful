import dayjs from "dayjs";

export function DateDot({ date }) {
  return dayjs(date).format("YYYY.MM.DD");
}

export function DateHyphen({ date }) {
  return dayjs(date).format("YYYY-MM-DD");
}
