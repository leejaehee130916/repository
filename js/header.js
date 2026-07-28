document.addEventListener("DOMContentLoaded", () => {
  // 현재 위치가 pages 폴더 안인지 확인해서 경로를 맞춰줍니다.
  const isPagesFolder = window.location.pathname.includes("/pages/");
  const basePath = isPagesFolder ? "../" : "./";
  const pagesPath = isPagesFolder ? "./" : "./pages/";

  // 모든 페이지 상단에 들어갈 메뉴 HTML
  const headerHTML = `
    <header>
      <h1><a href="${basePath}index.html">♟️ 바이브 체스</a></h1>
      <nav>
        <a href="${pagesPath}puzzle.html">체스 퍼즐</a>
        <a href="${pagesPath}ai-chess.html">AI와의 체스</a>
      </nav>
    </header>
  `;

  // 화면 맨 위에 추가
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
});