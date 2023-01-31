 
const PALINDROME = 'RACECAR';

window.addEventListener('load', async () => {
  const lookup = initiliaze();
  display(lookup, PALINDROME.length - 1);
});

function initiliaze() {
  const palindromeLength = (PALINDROME.length - 1);
  if (palindromeLength % 2 !== 0) {
    throw Error("Palindrome word must have an odd length");
  }
  const mid = palindromeLength / 2;
  console.log(mid);
  const lookup = {  ...crossSection(mid, PALINDROME) };
  console.log(lookup);
  return lookup;
}

function crossSection(mid, palindromStr) {
  let lookup = {};
  let col = palindromStr.length - 1;
  for (let row = 0; row <= +(palindromStr.length - 1); row++) {
    lookup = Object.assign({ ...lookup }, new Object({ [`${row}_${row}`]: palindromStr[row] })); // diag r
 
    lookup = Object.assign({ ...lookup }, new Object({ [`${row}_${col}`]: palindromStr[row] })); // diag l
    col--;// diag l 

    lookup = Object.assign({ ...lookup }, new Object({ [`${row}_${mid}`]: palindromStr[row] })); // y-axis
    lookup = Object.assign({ ...lookup }, new Object({ [`${mid}_${row}`]: palindromStr[row] })); // x-axis
    
  } 
  return lookup;
}
  
function display(lookup, palindromeLength) {
  const gridBoard = document.createElement('div');
  gridBoard.className = 'grid-board';
  gridBoard.style.setProperty('--length', PALINDROME.length);

  for (let row = 0; row <= palindromeLength; row++) {
    for (let col = 0; col <= palindromeLength; col++) {
      const xy = `${row}_${col}`;
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';

      if (xy in lookup) {
        const text = document.createTextNode(lookup[xy]);
        gridItem.append(text);
        gridItem.className += ' active';
      }
      gridBoard.append(gridItem);
    }
  }

  document.body.append(gridBoard);
}