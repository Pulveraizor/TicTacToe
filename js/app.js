function hasMatchingCombination(threeDigitCombinations, singleDigitNumbers) {
    // Convert the three-digit combinations to strings for easier comparison
    const combinationsAsStrings = threeDigitCombinations.map(combination => combination.toString());
  
    // Generate all possible three-digit combinations from the single-digit numbers
    let permutations = generateAllThreeDigitCombinations(singleDigitNumbers);

    for (let perm of permutations) {
        perm.sort((a,b) => a - b);
    }
  
    // Convert permutations to strings and check if any match the combinations
    const permutationsAsStrings = permutations.map(permutation => permutation.join(''));
  
    for (const combination of combinationsAsStrings) {
      if (permutationsAsStrings.includes(combination)) {
        winnerCombination = combination;
        return true; // Match found
      }
    }
    return false; // No match found
  }
  
  // Function to generate all possible three-digit combinations from an array
  function generateAllThreeDigitCombinations(arr) {
    if (arr.length < 3) {
      return [];
    }
  
    const combinations = [];
  
    for (let i = 0; i < arr.length - 2; i++) {
      for (let j = i + 1; j < arr.length - 1; j++) {
        for (let k = j + 1; k < arr.length; k++) {
          combinations.push([arr[i], arr[j], arr[k]]);
        }
      }
    }
  
    return combinations;
  }

const squareIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
];
const winningCombinations = [
    123,
    456,
    789,
    147,
    258,
    369,
    159,
    357
];

let winnerCombination = [];
let previousClick = '';
let takenByX = [];
let takenByO = [];
const result = document.getElementById('result');

function handleClick() {
  if (this.textContent == '') {
      if (previousClick == '' || previousClick == '◯') {
          // this.classList.add('x');
          this.textContent = '✖';
          previousClick = '✖';
          takenByX.push(this.id);

          if (takenByO.length + takenByX.length == 9) {
            result.textContent = 'Nobody wins...';
          }

          if (hasMatchingCombination(winningCombinations, takenByX)) {
              result.textContent = '✖ Wins!';
              
              for (let squareId of squareIds) {
                let square = document.getElementById(squareId);
                square.removeEventListener('click', handleClick);
              }

              for (let td of winnerCombination) {
                  let winningSquares = document.getElementById(td);
                  winningSquares.classList.add('crossed');
              }
          }
      } else if (previousClick == '✖') {
          // this.classList.remove('x');
          // this.classList.add('o');
          this.textContent = '◯';
          previousClick = '◯';
          takenByO.push(this.id);
          if (takenByO.length + takenByX.length == 9) {
            result.textContent = 'Nobody wins...';
          }
          if (hasMatchingCombination(winningCombinations, takenByO)) {
              result.textContent = '◯ Wins!';

              for (let squareId of squareIds) {
                let square = document.getElementById(squareId);
                square.removeEventListener('click', handleClick);
              }
              

              for (let td of winnerCombination) {
                  let winningSquares = document.getElementById(td);
                  winningSquares.classList.add('crossed');
              }
          };
      }
      return;
  }

  // console.log('This square already has a value');
}

for (let squareId of squareIds) {
  let square = document.getElementById(squareId);
  square.addEventListener('click', handleClick);
}
  
  