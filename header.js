document.addEventListener("DOMContentLoaded", () => {
  const isPagesFolder = window.location.pathname.includes("/pages/");
  const basePath = isPagesFolder ? "../" : "./";
  const pagesPath = isPagesFolder ? "./" : "./pages/";

  const headerHTML = `
    <header>
      <h1><a href="${basePath}index.html">♟️ 바이브 체스</a></h1>
      <nav>
        <a href="${pagesPath}puzzle.html">체스 퍼즐</a>
        <a href="${pagesPath}ai-chess.html">AI와의 체스</a>
      </nav>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
});