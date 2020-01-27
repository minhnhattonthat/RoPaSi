export const ELEMENT = {
  SCISSOR: 'scissor',
  PAPER: 'paper',
  ROCK: 'rock',
  LIZARD: 'lizard',
  SPOCK: 'spock',
};

export const ELEMENT_SET = [
  ELEMENT.SCISSOR,
  ELEMENT.PAPER,
  ELEMENT.ROCK,
  ELEMENT.LIZARD,
  ELEMENT.SPOCK,
];

export const compareElement = (element1, element2) => {
  if (element1 === element2) {
    return 0;
  }
  const index1 = ELEMENT_SET.findIndex(e => e === element1);
  const index2 = ELEMENT_SET.findIndex(e => e === element2);
  const distance = index2 - index1;
  const absDistance = distance < 0 ? distance + ELEMENT_SET.length : distance;
  if (absDistance % 2 === 0) {
    return -1;
  } else {
    return 1;
  }
};
