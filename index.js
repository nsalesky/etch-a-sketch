const gridContainer = document.querySelector("#grid-container");

const ABSOLUTE_PAINT = 0;
const ADDITIVE_PAINT = 1;

// Finds the nearest multiple of the given factor below the given starting number.
// Num must be greater than 0, and factor must be within the range [1, num]
function findFlooredMultiple(num, factor) {
    if (num <= 0 || factor <= 0) {
        throw "Num and factor must be greater than 0";
    }

    if (factor > num) {
        throw "Factor must be in the range [1, num]";
    }

    for (let i = Math.floor(num); i > 0; i -= 1) {
        if (i % factor === 0) {
            return i;
        }
    }
}

// Clears all tiles from the grid
function clearGrid() {
    gridContainer.innerHTML = "";
}

// Creates a grid of tiles with the specified number of rows and columns
function resetGrid(numRows, numColumns) {
    if (numRows <= 0 || numColumns <= 0) {
        throw "numRows and numColumns must be greater than 0";
    }

    clearGrid();

    let gridWidth = findFlooredMultiple(window.innerWidth * (2 / 3), numColumns);
    let gridHeight = findFlooredMultiple(window.innerHeight * (2 / 3), numRows);

    gridContainer.style.width = `${gridWidth}px`;
    gridContainer.style.height = `${gridHeight}px`;

    let tileWidth = gridWidth / numColumns;
    let tileHeight = gridHeight / numRows;

    for (let row = 0; row < numRows; row += 1) {
        for (let column = 0; column < numColumns; column += 1) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.width = `${tileWidth}px`;
            tile.style.height = `${tileHeight}px`;
            tile.style.backgroundColor = "rgb(0, 0, 0)";

            tile.addEventListener("mouseenter", handleTileHover);

            gridContainer.appendChild(tile);
        }
    }
}

// Depending on what paint type the user has selected, either adds to the current
// tile's color value or sets it immediately to white
function handleTileHover(e) {
    let index = document.querySelector("#paint-type").selectedIndex;

    if (index === ABSOLUTE_PAINT) {
        absolutePaint(e);
    } else if (index === ADDITIVE_PAINT) {
        additivePaint(e);
    }
}

// Paints the selected tile absolutely with white
function absolutePaint(e) {
    e.target.style.backgroundColor = "rgb(255, 255, 255)";
}

// Adds 10% more white to the target tile, maxes out each channel at 255.
function additivePaint(e) {
    let initialColor = e.target.style.backgroundColor;

    let [r, g, b] = decodeRGB(initialColor);

    let newR = Math.min(255, r + 25.5);
    let newG = Math.min(255, g + 25.5);
    let newB = Math.min(255, b + 25.5);

    e.target.style.backgroundColor = encodeRGB(newR, newG, newB);
}

// Decodes the given rgb string into its respective red, green, and blue color values
// assumes that the string comes in the form "rgb(20, 30, 40)"
function decodeRGB(rgbString) {
    let inner = rgbString.substring(4, rgbString.length - 1);

    let values = inner.split(", ");

    let numValues = values.map(x => Number.parseInt(x));

    return numValues;
}

// Encodes the given rgb color values into a string of the form "rgb(255, 3, 42)"
function encodeRGB(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
}

// Prompts the user to enter a new grid size, and then resets the grid to a blank
// grid of that size
function resetGridHandler(e) {
    let size = promptSize();

    resetGrid(size, size);
}

// Continues to prompt the user for a grid size until they enter a valid size
function promptSize() {
    while (true) {
        let newSize = Number.parseInt(
            window.prompt("Please enter a new number of tiles per side for the grid"));

        if (Number.isNaN(newSize)) {
            continue;
        }

        if (newSize <= 0) {
            continue;
        }

        return newSize;
    }
}

// Sets up the default state of the grid, and also connects event handlers
function init() {
    resetGrid(16, 16);
    document.querySelector("#reset-grid-button").addEventListener("click", resetGridHandler);
}

init();