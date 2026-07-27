// 파일 경로: js/header.js

(() => {
    "use strict";

    // ==========================
    // 현재 페이지 위치 확인
    // ==========================
    const path = window.location.pathname.toLowerCase();

    // pages 폴더 안인지 확인
    const inPages = path.includes("/pages/");

    // 상대경로 자동 계산
    const root = inPages ? "../" : "";

    // ==========================
    // 메뉴 데이터 (배열 관리)
    // ==========================
    const menus = [
        {
            title: "처음으로",
            link: root + "index.html"
        },
        {
            title: "게임하자",
            children: [
                {
                    title: "✊ 가위바위보 게임",
                    link: root + "pages/rock-paper-scissors.html"
                },
                {
                    title: "🚀 갤로그 게임",
                    link: root + "pages/galaga.html"
                }
            ]
        },
        {
            title: "공부하자",
            children: [
                {
                    title: "🧮 암산 연습",
                    link: root + "pages/mental-math.html"
                },
                {
                    title: "⚛ 원소 주기율표",
                    link: root + "pages/periodic-table.html"
                }
            ]
        }
    ];

    // ==========================
    // 메뉴 HTML 생성
    // ==========================
    let html = `
<header>
    <div class="nav-container">

        <div class="logo">
            🌊 여름 놀이터
        </div>

        <nav>
            <ul>
`;

    menus.forEach(menu => {

        if (!menu.children) {

            html += `
<li>
    <a href="${menu.link}">
        ${menu.title}
    </a>
</li>
`;
            return;
        }

        html += `
<li>

    <a href="#">
        ${menu.title}
    </a>

    <div class="dropdown">
`;

        menu.children.forEach(child => {

            html += `
<a href="${child.link}">
    ${child.title}
</a>
`;

        });

        html += `
    </div>

</li>
`;

    });

    html += `
            </ul>
        </nav>

    </div>
</header>
`;

    // ==========================
    // Header 삽입
    // ==========================
    const header = document.getElementById("header");

    if (header) {
        header.innerHTML = html;
    }

})();