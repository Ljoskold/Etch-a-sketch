const container = document.getElementById("container");
const gridSlider = document.getElementById("gridSlider");
const gridValue = document.getElementById("gridValue");
const eraserBtn = document.getElementById("eraser");
const resetBtn = document.getElementById("reset");
const toggleSwitch = document.getElementById("gridToggle");

let isMouseDown = false;

function coloring(event) {
    const color = document.getElementById("color").value;
    event.target.style.backgroundColor = color;
}
function erasing(event) {
    event.target.style.backgroundColor = "";
}

function clearGrid() {
    const elements = document.getElementsByClassName("cells");
    while (elements.length > 0){
        elements[0] = container.removeChild(elements[0]);
    }
}

function makeGrid() {
    const gridValue = document.getElementById("gridSlider").value;
    let cellSize = `calc(100% / ${gridValue})`;

    for (let i = 0; i < gridValue * gridValue; i++) {
        let cell = document.createElement("div");
        cell.className = "cells";
        cell.style.flexBasis = cellSize;
        cell.style.backgroundColor = "white";
        cell.style.border = "0.1px solid rgb(206, 206, 206)";
        container.appendChild(cell);
        toggleSwitch.checked = true;
    }
    createGrid();
}

function createGrid() {
    let cells = document.getElementsByClassName("cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("mousedown", function (event) {
            isMouseDown = true;
            coloring(event);
        });

        cells[i].addEventListener("mouseup", function () {
            isMouseDown = false;
        });

        cells[i].addEventListener("mousemove", function (event) {
            if (isMouseDown) {
                coloring(event);
            }
        });
    }
}

function eraser(){
    let cells = document.getElementsByClassName("cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("mousedown", function (event) {
            isMouseDown = true;
            erasing(event);
        });

        cells[i].addEventListener("mouseup", function () {
            isMouseDown = false;
        });

        cells[i].addEventListener("mousemove", function (event) {
            if (isMouseDown) {
                erasing(event);
            }
        });
    }
}

function toggleEraser(){
    if(eraserBtn.id === "eraser"){
        eraserBtn.id = "eraser-active"
        eraser();
    }
    else {
        eraserBtn.id = "eraser";
        return createGrid();
    }
}

toggleSwitch.addEventListener("change", function() {
    const cells = document.getElementsByClassName("cells");
    const borderStyle = toggleSwitch.checked ? "0.1px solid rgb(206, 206, 206)" : "none";

    for (let i = 0; i < cells.length; i++) {
        cells[i].style.border = borderStyle;
    }
});
eraserBtn.addEventListener("click", toggleEraser);
resetBtn.addEventListener("click", function(){
    clearGrid();
    makeGrid();
});

gridSlider.addEventListener("input", function () {
    gridValue.textContent = `${this.value} x ${this.value}`;
    clearGrid();
    makeGrid();
});

makeGrid();
