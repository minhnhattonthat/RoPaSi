import { ELEMENT, compareElement } from '../../app/util/GameLogic';

describe('compareElement', () => {
  it('win', () => {
    expect(compareElement(ELEMENT.ROCK, ELEMENT.SCISSOR)).toEqual(1);
    expect(compareElement(ELEMENT.ROCK, ELEMENT.LIZARD)).toEqual(1);
    expect(compareElement(ELEMENT.SCISSOR, ELEMENT.PAPER)).toEqual(1);
    expect(compareElement(ELEMENT.SCISSOR, ELEMENT.LIZARD)).toEqual(1);
    expect(compareElement(ELEMENT.PAPER, ELEMENT.ROCK)).toEqual(1);
    expect(compareElement(ELEMENT.PAPER, ELEMENT.SPOCK)).toEqual(1);
    expect(compareElement(ELEMENT.LIZARD, ELEMENT.PAPER)).toEqual(1);
    expect(compareElement(ELEMENT.LIZARD, ELEMENT.SPOCK)).toEqual(1);
    expect(compareElement(ELEMENT.SPOCK, ELEMENT.SCISSOR)).toEqual(1);
    expect(compareElement(ELEMENT.SPOCK, ELEMENT.ROCK)).toEqual(1);
  });
  it('lose', () => {
    expect(compareElement(ELEMENT.SCISSOR, ELEMENT.ROCK)).toEqual(-1);
    expect(compareElement(ELEMENT.SCISSOR, ELEMENT.SPOCK)).toEqual(-1);
    expect(compareElement(ELEMENT.ROCK, ELEMENT.PAPER)).toEqual(-1);
    expect(compareElement(ELEMENT.ROCK, ELEMENT.SPOCK)).toEqual(-1);
    expect(compareElement(ELEMENT.PAPER, ELEMENT.SCISSOR)).toEqual(-1);
    expect(compareElement(ELEMENT.PAPER, ELEMENT.LIZARD)).toEqual(-1);
    expect(compareElement(ELEMENT.LIZARD, ELEMENT.SCISSOR)).toEqual(-1);
    expect(compareElement(ELEMENT.LIZARD, ELEMENT.ROCK)).toEqual(-1);
    expect(compareElement(ELEMENT.SPOCK, ELEMENT.PAPER)).toEqual(-1);
    expect(compareElement(ELEMENT.SPOCK, ELEMENT.LIZARD)).toEqual(-1);
  });
  it('draw', () => {
    expect(compareElement(ELEMENT.ROCK, ELEMENT.ROCK)).toEqual(0);
    expect(compareElement(ELEMENT.SCISSOR, ELEMENT.SCISSOR)).toEqual(0);
    expect(compareElement(ELEMENT.PAPER, ELEMENT.PAPER)).toEqual(0);
    expect(compareElement(ELEMENT.LIZARD, ELEMENT.LIZARD)).toEqual(0);
    expect(compareElement(ELEMENT.SPOCK, ELEMENT.SPOCK)).toEqual(0);
  });
});
