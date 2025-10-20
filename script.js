const board = ["", "", "", "", "", "", "", "", ""];
const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", (e) => {
        if (gridItem.textContent === "X") {
            gridItem.textContent = "";
        } else {
            gridItem.textContent = "X";
        }
    })
});