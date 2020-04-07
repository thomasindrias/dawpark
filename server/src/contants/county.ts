/**
 * Contains all the information about the counites in Sweden and their respective id which is return by the trafikverket API.
 *
 * An example can be found below:
 * ```ts
 * counties[17] = "Värmlands län"
 * ```
 *
 * @beta
 */
const counties: { [regionID: number]: string } = {
  1: "Stockholms län",
  2: "DEPRECATED",
  3: "Uppsala län",
  4: "Södermanlands län",
  5: "Östergötlands län",
  6: "Jönköpings län",
  7: "Kronobergs län",
  8: "Kalmar län",
  9: "Gotlands län",
  10: "Blekinge län",
  12: "Skåne län",
  13: "Hallands län",
  14: "Västra Götalands län",
  17: "Värmlands län",
  18: "Örebro län",
  19: "Västmanlands län",
  20: "Dalarnas län",
  21: "Gävleborgs län",
  22: "Västernorrlands län",
  23: "Jämtlands län",
  24: "Västerbottens län",
  25: "Norrbottens län",
};
