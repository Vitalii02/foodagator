exports.generateRandomLetters = () => {
  const alphabet = "qwertyuioplkjhgfdsazxcvbnm";
  let word = "";
  for (let i = 0; i < 5; i++) {
    word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
  }
  return word;
};
