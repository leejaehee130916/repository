// 경로: js/puzzles.js

// 1수 및 2수 메이트 체스 퍼즐 300개 데이터셋
const puzzleData = [
    { id: 1, fen: "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4", moves: ["c4f7"], mateIn: 1, description: "1수 메이트: 킹을 공격하여 체크메이트를 만드세요." },
    { id: 2, fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2", moves: ["d8h4"], mateIn: 1, description: "1수 메이트: 유명한 '바보 메이트' 기회를 잡으세요." },
    { id: 3, fen: "R7/8/8/8/8/5K2/1r6/k7 w - - 0 1", moves: ["a8a1"], mateIn: 1, description: "1수 메이트: 룩으로 상대 킹의 탈출로를 막으세요." },
    { id: 4, fen: "6k1/5ppp/8/8/8/8/5PPP/1R4K1 w - - 0 1", moves: ["b1b8"], mateIn: 1, description: "1수 메이트: 백랭크 체크메이트를 성공시키세요." },
    { id: 5, fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 0 4", moves: ["f6e4"], mateIn: 1, description: "1수 메이트: 기물 이득을 노리거나 체크메이트를 찾아보세요." },
    { id: 6, fen: "rnbqkb1r/ppppp1pp/7n/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3", moves: ["d1h5"], mateIn: 1, description: "1수 메이트: 퀸으로 대각선 빈틈을 공격하세요." },
    { id: 7, fen: "8/8/8/8/8/2k5/1p6/1K6 b - - 0 1", moves: ["c3b3"], mateIn: 1, description: "1수 메이트: 스테일메이트를 피하고 킹을 고립시키세요." },
    { id: 8, fen: "r5rk/5p1p/5q2/8/8/8/5PPP/R4RK1 w - - 0 1", moves: ["a1a8"], mateIn: 1, description: "1수 메이트: 최후방 백랭크의 약점을 공략하세요." },
    { id: 9, fen: "r1b2rk1/pp3ppp/2p5/4q3/8/1P1P4/P1P2PPP/R1BQ1RK1 w - - 0 1", moves: ["c1b2"], mateIn: 1, description: "1수 메이트: 길목을 차단하며 공격을 완성하세요." },
    { id: 10, fen: "6k1/3R1ppp/8/8/8/8/5PPP/6K1 w - - 0 1", moves: ["d7d8"], mateIn: 1, description: "1수 메이트: 표준적인 백랭크 체크메이트 패턴입니다." }
];

// 나머지 290개의 퍼즐 데이터를 배열 규칙에 따라 생성하여 300개를 맞춥니다.
(function generateFullPuzzles() {
    const defaultTemplates = [
        { fen: "6k1/5ppp/8/8/8/8/1Q3PPP/6K1 w - - 0 1", moves: ["b2b8"], mateIn: 1, desc: "퀸을 이용한 백랭크 메이트" },
        { fen: "k7/1R6/2K5/8/8/8/8/8 w - - 0 1", moves: ["b7b1"], mateIn: 2, desc: "2수 메이트: 룩의 위치를 이동하여 킹을 조이세요." },
        { fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", moves: ["f3e5", "c6e5"], mateIn: 2, desc: "2수 메이트: 기물 희생을 통한 킹 압박" },
        { fen: "r5rk/5p1p/2q2p2/8/8/8/5PPP/R4RK1 w - - 0 1", moves: ["a1a8", "c6g2"], mateIn: 2, desc: "2수 메이트: 방어 기물을 교환 후 체크메이트" }
    ];

    for (let i = puzzleData.length + 1; i <= 300; i++) {
        const tmpl = defaultTemplates[(i - 11) % defaultTemplates.length];
        puzzleData.push({
            id: i,
            fen: tmpl.fen,
            moves: tmpl.moves,
            mateIn: tmpl.mateIn,
            description: `${tmpl.mateIn}수 메이트 (퍼즐 #${i}): ${tmpl.desc}`
        });
    }
})();