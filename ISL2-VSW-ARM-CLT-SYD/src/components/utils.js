import moment from "moment";

/**
 * Получение номера бригады, работающей в заданную дату (дата задатся либо кол-вом часов от 1970, либо объектом Date(), либо объектом moment)
 * @param {moment | Date} Дата/время
 * @returns Номер бригады (1-4)
 */
export function brigade(date = moment()) {
  switch (
    Math.floor(
      ((Math.floor(
        +moment(
          typeof date === "number"
            ? date < 99000
              ? date * 86400000
              : date < 999000
                ? date * 3600000
                : date < 1e10
                  ? date * 1000
                  : date
            : date,
        ).utcOffset(0, true) / 3600000,
      ) -
        24 -
        8) %
        (8 * 12)) /
        12,
    )
  ) {
    case 0:
      return 3;
    case 1:
      return 2;
    case 2:
      return 4;
    case 3:
      return 3;
    case 4:
      return 1;
    case 5:
      return 4;
    case 6:
      return 2;
    case 7:
      return 1;
    default:
      return -1;
  }
}

/**
 * Проверка: x - дата или нет (x может быть в виде строки или объекта Date)
 * @param {*} x Значение для проверки
 * @returns true - Если x - дата (в виде строки или объекта Date), false - x не дата
 */
export function isDate(x) {
  return !!((typeof x === "object" || typeof x === "string") && x && !isNaN(new Date(x).valueOf()));
  // return !!((typeof x === "object" || typeof x === "string" || typeof x === "number") && x && !isNaN(new Date(x).valueOf()));
}

export default {
  isDate: isDate,
  brigade: brigade,
};
