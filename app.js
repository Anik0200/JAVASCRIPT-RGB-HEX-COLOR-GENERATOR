// GENERATE HEX COLOR

let root = document.querySelector("#root");
let btn = document.querySelector("#change-btn");
let output = document.querySelector("#output");
let output2 = document.querySelector("#output2");
let copyBtn = document.querySelector("#copyBtn");
let copyBtn2 = document.querySelector("#copyBtn2");

let generateColorDecimal = () => {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return {
    red,
    green,
    blue,
  };
};

let generateHexColor = ({ red, green, blue }) => {
  let getTwoCode = (value) => {
    let hex = value.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
};

let hexToDecimal = (hex) => {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
};

let generateRGBColor = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

btn.addEventListener("click", () => {
  let decimalColor = generateColorDecimal();

  let hex = generateHexColor(decimalColor);
  let rgb = generateRGBColor(decimalColor);

  root.style.backgroundColor = hex;

  output.value = hex.substring(1);
  output2.value = rgb;
});

let generateTost = (msg) => {
  let toast = document.createElement("div");
  toast.innerHTML = `#${msg} Copied`;
  toast.classList.add("toastr");

  if (toast.innerHTML.slice(0, 4) == "#rgb") {
    toast.innerHTML = `${msg} Copied`;
  } else {
    toast.innerHTML = `#${msg} Copied`;
  }

  root.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`#${output.value}`);

  if (isValidHex(output.value)) {
    generateTost(output.value);
  } else {
    alert("Invalid Hex");
  }
});

copyBtn2.addEventListener("click", () => {
  navigator.clipboard.writeText(`${output2.value}`);

  if (isValidHex(output.value)) {
    generateTost(output2.value);
  } else {
    alert("Invalid Hex");
  }
});

/**
 * @param {string} color : ;
 */

let isValidHex = (color) => {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
};

output.addEventListener("keyup", (e) => {
  root.style.backgroundColor = `#000000`;
  output2.value = hexToDecimal("000000");

  let color = e.target.value;
  output.value = color.toUpperCase();

  if (isValidHex(color)) {
    root.style.backgroundColor = `#${color}`;
    output2.value = hexToDecimal(color);
  }
});
