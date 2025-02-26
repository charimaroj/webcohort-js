const nameInputEle = document.getElementById("nameInput");
const jobInputEle = document.getElementById("jobInput");
const ageInputEle = document.getElementById("ageInput");
const bioInputEle = document.getElementById("bioInput");

const nameDisplayEle = document.getElementById("nameDisplay");
const jobDisplayEle = document.getElementById("jobDisplay");
const ageDisplayEle = document.getElementById("ageDisplay");
const bioDisplayEle = document.getElementById("bioDisplay");

document.getElementById("nameInput").addEventListener("keyup", function () {
    document.getElementById("nameDisplay").textContent = this.value;
});

document.getElementById("jobInput").addEventListener("keyup", function () {
    document.getElementById("jobDisplay").textContent = this.value;
});

document.getElementById("ageInput").addEventListener("keyup", function () {
    document.getElementById("ageDisplay").textContent = this.value;
});

document.getElementById("bioInput").addEventListener("touchstart", function () {
    document.getElementById("bioDisplay").textContent = this.value;
}, { passive: true });


