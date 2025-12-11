// 게임 허브 메인 컨트롤러
const gameHub = {
    games: {
        platformer: {
            title: 'Platformer Jump',
            path: '../Platformer Jump/index.html'
        },
        baseball: {
            title: 'Number Baseball',
            path: '../number_baseball/index.html'
        },
        galaxy: {
            title: 'Galaxy Defender',
            path: '../Galaxy defender/index.html'
        },
        falling: {
            title: 'Falling Dot Hunter',
            path: '../Falling Dot Hunter/index.html'
        },
        bangdream: {
            title: 'Rhythm Game',
            path: 'https://hordal.github.io/Rhythm-Game/'
        }
    },

    init() {
        console.log('Game Hub initialized!');
    },

    loadGame(gameKey) {
        const game = this.games[gameKey];
        if (!game) {
            console.error('Game not found:', gameKey);
            return;
        }

        // 해당 게임의 index.html로 직접 이동
        console.log(`Loading game: ${game.title}`);
        console.log(`Game path: ${game.path}`);
        window.location.href = game.path;
    },

    // 키보드 단축키 지원
    handleKeyPress(event) {
        // 숫자 키로 게임 빠른 실행
        const gameKeys = Object.keys(this.games);
        const keyNum = parseInt(event.key);
        if (keyNum >= 1 && keyNum <= gameKeys.length) {
            this.loadGame(gameKeys[keyNum - 1]);
        }
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    gameHub.init();
    
    // 플레이 버튼 이벤트 리스너 추가
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const gameKey = button.getAttribute('data-game-key');
            console.log('Play button clicked:', gameKey);
            if (gameKey) {
                gameHub.loadGame(gameKey);
            }
        });
    });
    
    // 게임 카드 호버 효과
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// 키보드 이벤트 리스너
document.addEventListener('keydown', (event) => {
    gameHub.handleKeyPress(event);
});
