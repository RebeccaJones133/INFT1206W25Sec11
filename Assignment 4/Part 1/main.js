// Get references to the input field, button, and output area in the HTML
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

/*
Helper function that selects a random value from an array.
Takes an array as input and returns one of its elements at random.
*/
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Template text for the story with placeholders that will be replaced later
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// Arrays that contain possible values for each placeholder in the story
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
];

// Add an event listener to the randomize button that runs the result() function when clicked
randomize.addEventListener("click", result);

/*
This function creates a new story by replacing the placeholders in the story template
with randomly selected items from the insertX, insertY, and insertZ arrays.
It also handles custom name input and unit conversion (to UK standards).
*/
function result() {
  // Start with the base story template
  let newStory = storyText;

  // Randomly select one item from each array
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Replace placeholders with the randomly selected values
  newStory = newStory
    .replaceAll(":insertx:", xItem)
    .replace(":inserty:", yItem)
    .replace(":insertz:", zItem);

  // If the user entered a custom name, replace "Bob" with that name
  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  // If the UK checkbox is selected, convert weight to stones and temperature to centigrade
  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`; // Convert pounds to stones
    const temperature = `${Math.round(((94 - 32) * 5) / 9)} centigrade`; // Convert Fahrenheit to Celsius
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 fahrenheit", temperature);
  }

  // Display the final story in the page and make it visible
  story.textContent = newStory;
  story.style.visibility = "visible";
}