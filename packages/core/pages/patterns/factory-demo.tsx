import React from 'react';
import withPageProps from 'src/hoc/withPageProps';

enum Car {
  HONDA,
  MAZDA,
}

abstract class CarPart {
  static getFactory(key: Car) {
    const hondaFactory = new HondaFactory();
    const mazdaFactory = new MazdaFactory();

    switch (key) {
      case Car.HONDA:
        return hondaFactory;
        break;

      case Car.MAZDA:
        return mazdaFactory;
        break;

      default:
        return mazdaFactory;
        break;
    }
  }

  abstract getLeftDoor();
  abstract getRightDoor();
}

class HondaRightDoor {
  makePart() {
    return 'Im Honda Right Door ';
  }
}
class HondaLeftDoor {
  makePart() {
    return 'Im Honda Left Door';
  }
}
class MazdaRightDoor {
  makePart() {
    return 'Im Mazda Right Door ';
  }
}
class MazdaLeftDoor {
  makePart() {
    return 'Im Mazda Left Door';
  }
}

class HondaFactory extends CarPart {
  getLeftDoor() {
    return new HondaLeftDoor();
  }

  getRightDoor() {
    return new HondaRightDoor();
  }
}

class MazdaFactory extends CarPart {
  getLeftDoor() {
    return new MazdaLeftDoor();
  }

  getRightDoor() {
    return new MazdaRightDoor();
  }
}

let factory = CarPart.getFactory(Car.HONDA);
let rightdoor = factory.getRightDoor();

console.log(rightdoor.makePart());

factory = CarPart.getFactory(Car.MAZDA);
rightdoor = factory.getRightDoor();
const leftdoor = factory.getLeftDoor();

console.log(rightdoor.makePart());
console.log(leftdoor.makePart());

const FactoryPage = () => null;

export default withPageProps()(FactoryPage);
