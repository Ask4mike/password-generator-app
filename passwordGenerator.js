//Getting the elements to manipulate with the DOM
const passwordValue = document.getElementById("password-value");
const characterAmount = document.getElementById("characterAmount");
const passwordRangeLength = document.getElementById("password-range");
const includeUppercaseCheck = document.getElementById("includeUppercase");
const includeLowercaseCheck = document.getElementById("includeLowercase");
const includeNumbersCheck = document.getElementById("includeNumbers");
const includeSymbolsCheck = document.getElementById("includeSymbols");
const generatePasswordButton = document.getElementById(
  "generatePasswordButton"
);

const passwordStrength = document.getElementById("passwordStrength");
const passwordStrength1 = document.getElementById("password-strength1");
const passwordStrength2 = document.getElementById("password-strength2");
const passwordStrength3 = document.getElementById("password-strength3");
const passwordStrength4 = document.getElementById("password-strength4");
const passwordCopy = document.getElementById("password-copy");
const errorMessage = document.getElementById("errorMessages");
const errorChecks = document.getElementById("errorChecks");

//Adding the event listener to copy the password generated to the clipboard
passwordCopy.addEventListener("click", () => {
  const passwordValue = document.getElementById("password-value");
  const passwordGenerated = passwordValue.textContent;

  navigator.clipboard
    .writeText(passwordGenerated)
    .then(() => {
      //update the text to indicate that the password was copied
      document.getElementById("copy-feedback").innerText = "Password copied";
      //update with the styles added to element's id
      document.getElementById("copy-feedback").classList.add("copy-feedback");
      //Reset it to its former state after a delay
      setTimeout(() => {
        document.getElementById("copy-feedback").innerText = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy password", err);
    });
});

//definition of the generate password function
function generatePassword() {
  const length = parseInt(passwordRangeLength.value);
  const includeUppercase = includeUppercaseCheck.checked;
  const includeLowercase = includeLowercaseCheck.checked;
  const includeNumbers = includeNumbersCheck.checked;
  const includeSymbols = includeSymbolsCheck.checked;

  //creating the characters for the random letters, numbers and symbols to generate the password
  const uppercaseChars = String.fromCharCode(
    ...Array(26)
      .fill()
      .map((element, index) => 65 + index)
  );
  const lowercaseChars = String.fromCharCode(
    ...Array(26)
      .fill()
      .map((element, index) => 97 + index)
  );
  const numberChars = String.fromCharCode(
    ...Array(10)
      .fill()
      .map((element, index) => 48 + index)
  );
  const symbolsChars = String.fromCharCode(
    ...Array(15)
      .fill()
      .map((element, index) => 33 + index)
      .map((element, index) => 40 + index)
      .map((element, index) => 58 + index)
  );

  let charactersAllowed = "";
  let generatedPassword = "";
  if (includeUppercase) charactersAllowed += uppercaseChars;
  if (includeLowercase) charactersAllowed += lowercaseChars;
  if (includeNumbers) charactersAllowed += numberChars;
  if (includeSymbols) charactersAllowed += symbolsChars;

  //statements to calculate how strong or how weak a password combination is
  let strength = "";
  if (length >= 0 && length <= 4) {
    strength = "Weak";
  } else if (length > 4 && length <= 8) {
    strength = "Medium";
  } else {
    strength = "Strong";
  }

  passwordStrength.textContent = strength;
  //update password strength boxes based on the strength level
  switch (strength) {
    case "Weak":
      passwordStrength1.style.backgroundColor = "red";
      passwordStrength2.style.backgroundColor = "red";
      passwordStrength3.style.backgroundColor = "transparent";
      passwordStrength4.style.backgroundColor = "transparent";

      passwordStrength1.style.border = "2px solid transparent";
      passwordStrength2.style.border = "2px solid transparent";
      passwordStrength3.style.border = "2px solid var(--clr-border)";
      passwordStrength4.style.border = "2px solid var(--clr-border)";
      break;

    case "Medium":
      passwordStrength1.style.backgroundColor = "#F1C40F";
      passwordStrength2.style.backgroundColor = "#F1C40F";
      passwordStrength3.style.backgroundColor = "#F1C40F";
      passwordStrength4.style.backgroundColor = "transparent";

      passwordStrength1.style.border = "2px solid transparent";
      passwordStrength2.style.border = "2px solid transparent";
      passwordStrength3.style.border = "2px solid transparent";
      passwordStrength4.style.border = "2px solid var(--clr-border)";
      break;

    case "Strong":
      passwordStrength1.style.backgroundColor = "green";
      passwordStrength2.style.backgroundColor = "green";
      passwordStrength3.style.backgroundColor = "green";
      passwordStrength4.style.backgroundColor = "green";

      passwordStrength1.style.border = "2px solid green";
      passwordStrength2.style.border = "2px solid green";
      passwordStrength3.style.border = "2px solid green";
      passwordStrength4.style.border = "2px solid green";
      break;

    default:
      passwordStrength1.style.backgroundColor = "transparent";
      passwordStrength2.style.backgroundColor = "transparent";
      passwordStrength3.style.backgroundColor = "transparent";
      passwordStrength4.style.backgroundColor = "transparent";
      break;
  }

  // statements to show the error messages
  if (length <= 0) {
    errorMessage.textContent = "No Password can be generated";
  } else {
    errorMessage.textContent = "";
  }
  // Loop to generate the random password
  for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * charactersAllowed.length);
    generatedPassword += charactersAllowed[randomIndex];
  }

  passwordValue.textContent = generatedPassword;
}

//function to update the number of password characters for the user.
function updatePasswordCharacter() {
  characterAmount.textContent = passwordRangeLength.value;
}

//Event listeners to monitor a user's interaction with the app
generatePasswordButton.addEventListener("click", generatePassword);
passwordRangeLength.addEventListener("input", updatePasswordCharacter);
