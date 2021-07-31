const gridContainer = document.querySelector("#grid-container");

// Finds the nearest multiple of the given factor below the given starting number.
// Num must be greater than 0, and factor must be within the range [1, num]
function findFlooredMultiple(num, factor) {
    if (num <= 0 || factor <= 0) {
        throw "Num and factor must be greater than 0";
    }

    if (factor > num) {
        throw "Factor must be in the range [1, num]";
    }

    for(let i = Math.floor(num); i > 0; i -= 1) {
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

    let gridWidth = findFlooredMultiple(window.innerWidth * (2/3), numColumns);
    let gridHeight = findFlooredMultiple(window.innerHeight * (2/3), numRows);

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

            tile.addEventListener("mouseenter", handleTileHover);

            gridContainer.appendChild(tile);
        }
    }
}

// Sets the tile's color to white when the user hovers over it with their cursor
function handleTileHover(e) {
    e.target.style.backgroundColor = "white";
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