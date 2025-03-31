
function showSection(sectionId) {
    document.getElementById("first").style.display = (sectionId === "first") ? "block" : "none";
    document.getElementById("second").style.display = (sectionId === "second") ? "block" : "none";
}

function removeBookmark(button) {
    button.parentElement.remove();
}