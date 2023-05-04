import coloursInventory from './data/coloursInventory';

const getRandomColour = () => {
  let randomColour =
    coloursInventory[Math.floor(Math.random() * coloursInventory.length)];
  return randomColour;
};

export { getRandomColour };
