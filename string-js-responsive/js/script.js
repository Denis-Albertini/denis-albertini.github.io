function wordCounter(text) {
  let wordCount = text
    .split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\s\d]+/)
    .filter((word) => word.length > 0).length;
  document.getElementById("wordCount").textContent = wordCount;
}

function charCounter(text) {
  let charCount = text.replace(/\s+/g, "").length;
  document.getElementById("charCount").textContent = charCount;
}

function occurrenceCounter(text) {
  let wordToHighlight = document.getElementById("wordToHighlight").value;
  let occurrenceCount = text
    .split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\s]+/)
    .filter(
      (word) =>
        word.toUpperCase() === wordToHighlight.toUpperCase() && word !== ""
    ).length;
  document.getElementById("occurrenceCount").textContent = occurrenceCount;
}

function textMarker(text) {
  if (document.getElementById("occurrenceCount").innerHTML !== "0") {
    let wordToHighlight = document.getElementById("wordToHighlight").value;
    let regex = new RegExp(wordToHighlight, "gi");
    let markedText = text.replace(regex, '<span class="bg-warning">$&</span>');
    document.getElementById("markedText").innerHTML = markedText;
  } else document.getElementById("markedText").innerHTML = "";
}

function wordReplacer(text) {
  if (document.getElementById("occurrenceCount").innerHTML !== "0") {
    let wordToReplace = document.getElementById("wordToReplace").value;
    let wordToHighlight = document.getElementById("wordToHighlight").value;
    let regex = new RegExp(wordToHighlight, "gi");
    let replacedText = text.replace(
      regex,
      '<span class="bg-warning">' + wordToReplace + "</span>"
    );
    document.getElementById("markedText").innerHTML = replacedText;
  }
}

document.getElementById("text").addEventListener("input", function () {
  let text = document.getElementById("text").value;
  wordCounter(text);
  charCounter(text);
  occurrenceCounter(text);
  textMarker(text);
});

document
  .getElementById("wordToHighlight")
  .addEventListener("input", function () {
    let text = document.getElementById("text").value;
    occurrenceCounter(text);
    textMarker(text);
  });

document
  .getElementById("wordToHighlight")
  .addEventListener("keydown", function (input) {
    if (input.key === " ") input.preventDefault();
  });

document.getElementById("replace").addEventListener("click", function () {
  let text = document.getElementById("text").value;
  wordReplacer(text);
});
