// 게임 허브 메인 컨트롤러
const gameHub = {
    games: {
        platformer: {
            title: 'Platformer Jump',
            path: 'file:///c:/김연준/2D프로그래밍/Platformer%20Jump/index.html'
        },
        baseball: {
            title: 'Number Baseball',
            path: 'file:///c:/김연준/2D프로그래밍/number_baseball/index.html'
        },
        galaxy: {
            title: 'Galaxy Defender',
            path: 'file:///c:/김연준/2D프로그래밍/Galaxy%20defender/index.html'
        },
        falling: {
            title: 'Falling Dot Hunter',
            path: 'file:///c:/김연준/2D프로그래밍/Falling%20Dot%20Hunter/index.html'
        },
        bangdream: {
            title: 'Rhythm Game',
            path: 'file:///c:/김연준/2D프로그래밍/BangDream/index.html'
        }
    },

    currentGame: null,

    init() {
        console.log('Game Hub initialized!');
        this.showScreen('main-menu');
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },

    loadGame(gameKey) {
        const game = this.games[gameKey];
        if (!game) {
            console.error('Game not found:', gameKey);
            return;
        }

        this.currentGame = gameKey;
        
        // 게임 타이틀 업데이트
        document.getElementById('current-game-title').textContent = game.title;
        
        // 게임 화면으로 전환
        this.showScreen('game-screen');
        
        // iframe 생성 및 게임 로드 (접근성 및 보안 개선)
        const gameContainer = document.getElementById('game-container');
        
        // iframe 엘리먼트를 직접 생성 (로컬 파일 로드 개선)
        const iframe = document.createElement('iframe');
        iframe.src = game.path;
        iframe.title = `${game.title} - 게임 플레이 화면`;
        iframe.name = `game-frame-${gameKey}`;
        iframe.id = `game-frame-${gameKey}`;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; gamepad; microphone; camera');
        iframe.setAttribute('aria-label', `${game.title} 게임`);
        iframe.style.width = '100%';
        iframe.style.height = '80vh';
        iframe.style.border = 'none';
        
        // 기존 내용 지우고 iframe 추가
        gameContainer.innerHTML = '';
        gameContainer.appendChild(iframe);
        
        console.log(`Loading game: ${game.title}`);
        console.log(`Game path: ${game.path}`);
    },

    backToMenu() {
        // 현재 게임 정리
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        this.currentGame = null;
        
        // 메인 메뉴로 전환
        this.showScreen('main-menu');
        
        console.log('Back to main menu');
    },

    // 키보드 단축키 지원
    handleKeyPress(event) {
        // ESC 키로 메인 메뉴로 돌아가기
        if (event.key === 'Escape' && this.currentGame) {
            this.backToMenu();
        }
        
        // 숫자 키로 게임 빠른 실행
        const gameKeys = Object.keys(this.games);
        const keyNum = parseInt(event.key);
        if (keyNum >= 1 && keyNum <= gameKeys.length && !this.currentGame) {
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
    
    // 뒤로가기 버튼 이벤트 리스너
    const backBtn = document.getElementById('back-to-menu-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            gameHub.backToMenu();
        });
    }
    
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
