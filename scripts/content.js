// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

console.log("ChatGPT content script loaded!");
document.addEventListener("DOMContentLoaded", function () {
  // Ensure document.body exists
  if (!document.body) {
      console.error("document.body is not available.");
      return;
  }

  // Function to extract all visible text
  function extractText() {
      console.log(document.body.innerText);
  }

  // MutationObserver to detect changes in the DOM
  const observer = new MutationObserver(() => {
      extractText();
  });

  // Observe the body for changes in child elements (dynamic content loading)
  observer.observe(document.body, {
      childList: true,  // Watch for added/removed elements
      subtree: true,    // Watch the entire document
      characterData: true // Watch text changes
  });

  // Initial call in case content is already available
  extractText();
});


function extractTextFromChatGPT() {
  // Select the main response container
  const responseDiv = document.querySelector(".text-base");

  if (!responseDiv) {
      console.log("No response found.");
      return;
  }

  // Extract all paragraph, list, and inline math content
  let textArray = [];

  responseDiv.querySelectorAll("p, li, span.katex-mathml annotation").forEach(el => {
      textArray.push(el.innerText.trim());
  });

  // Join with newlines for readability
  const extractedText = textArray.join("\n");
  console.log(extractedText);
}

extractTextFromChatGPT();
