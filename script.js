// Selecting all necessary DOM elements
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let imageButton = document.getElementById("insertImage");

// A more comprehensive list of fonts
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Trebuchet MS",
  "Tahoma",
  "Impact",
  "Comic Sans MS",
  "Palatino Linotype",
  "Bookman Old Style",
  "Century Gothic",
  "Lucida Sans Unicode",
  "Arial Black",
  "Franklin Gothic Medium",
  "Gill Sans MT",
  "Helvetica",
  "Segoe UI",
  "Roboto",
  "Open Sans",
  "Lora",
  "Poppins",
  "Montserrat",
  "Raleway",
  "Ubuntu",
  "Lato",
  "Oswald",
  "Source Sans Pro",
  "Noto Sans",
  "Fira Sans",
  "Inter",
  "Playfair Display",
  "Merriweather",
  "Alegreya Sans",
  "Work Sans",
  "Libre Franklin",
  "Nunito Sans",
  "Roboto Slab",
  "Playfair Display",
  "Merriweather Sans",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Arial",
  "Helvetica",
  "Verdana",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "cursive",
];

// Function to initialize the text editor
const initializeEditor = () => {
  // Highlighter for various button groups
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Populate font names dropdown
  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Populate font sizes dropdown (1 to 7)
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Set default font size
  fontSizeRef.value = 3;
};

// Function to modify text based on command and value
const modifyText = (command, defaultValue, value) => {
  document.execCommand(command, defaultValue, value);
};

// Event listeners for basic operation buttons
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Event listeners for advanced options requiring values
advancedOptionButtons.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Event listener for creating a link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (userLink && userLink !== "") {
    if (!/^(http|https):\/\//i.test(userLink)) {
      userLink = "http://" + userLink;
    }
    modifyText(linkButton.id, false, userLink);
  }
});

// Function to highlight clicked buttons
const highlighter = (buttons, singleHighlight) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (singleHighlight) {
        // Clear all highlights
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });
      }
      button.classList.toggle("active");
    });
  });
};

// for saving file
const filename = document.getElementById("filename");

function fileHandle(value) {
  if (value === "new") {
    writingArea.innerHTML = ""; // Clear the text area
    filename.value = "Untitled"; // Reset filename input
  } else if (value === "txt") {
    const blob = new Blob([writingArea.textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename.value}.txt`;
    link.click();
  } else if (value === "pdf") {
    html2pdf().from(writingArea).save(`${filename.value}.pdf`);
  }
}

// Initialize the text editor on page load
window.onload = initializeEditor;
