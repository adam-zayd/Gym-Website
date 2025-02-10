let count = 0;

document.addEventListener("DOMContentLoaded", () => {
    const clickButton = document.getElementById("clickButton");
    const resetButton = document.getElementById("resetButton");
    const clickCount = document.getElementById("clickCount");

    clickButton.addEventListener("click", function() {
        count++;
        clickCount.textContent = count;
    });

    resetButton.addEventListener("click", function() {
        count = 0;
        clickCount.textContent = count;
    });
});
