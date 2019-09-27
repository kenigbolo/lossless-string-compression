/**
 * Function to get a shared prefix between two strings
 * @param {Array<String>} array {Required} An array containing two strings
 * @return {String} The shared prefix between the strings
 */
function getSharedPrefix(array) {
  let A = array.concat().sort();
  let a1 = A[0];
  let a2 = A[A.length - 1];
  let L = a1.length;
  let i = 0;
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
  return a1.substring(0, i);
}

/**
 * Function for lossless string compression
 * @param {Array<String>} wordsArray {Required} - An array of words
 * @return {Array<String>} The compressed array of strings
 */
function compression(wordsArray) {
  if (wordsArray.length === 0) return ['']
  const myArray = [];
  wordsArray.forEach((currentWord, index) => {
    if (myArray.length === 0) {
      return myArray.push(`0 ${currentWord}`);
    } else {
      const previousWord = wordsArray[index - 1];
      const sharedPrefix = getSharedPrefix([previousWord, currentWord]);
      if (sharedPrefix === '') {
        myArray.push(`0 ${currentWord}`);
      } else {
        const length = sharedPrefix.length;
        const suffix = currentWord.slice(length);
        myArray.push(`${length} ${suffix}`);
      }
    }
  });
  return myArray;
}

/**
 * Function to decompress an array of words
 * @param {Array<String>} compressedWordsArray {Required} Comma seperated array of words
 * @return {Array<String>} The decompressed array of strings
 */
function decompression(compressedWordsArray) {
  if (wordsArray.length === 0) return ['']
  const myArray = [];
  compressedWordsArray.forEach((currentWord, index) => {
    if (index === 0) {
      return myArray.push(currentWord.split(' ')[1]);
    } else {
      const [charCount, suffix] = currentWord.split(' ');
      const previousWord = myArray[index - 1];
      const decodedWord = previousWord.slice(0, Number(charCount)) + suffix;
      myArray.push(decodedWord);
    }
  });
  return myArray;
}

module.exports = { compression, decompression };
