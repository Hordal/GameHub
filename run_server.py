"""
게임 허브 서버 실행 스크립트
이 파일을 F5로 실행하면 브라우저가 자동으로 열립니다.
"""
import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

# 포트 설정
PORT = 8000

# 현재 스크립트가 있는 디렉토리로 이동
os.chdir(Path(__file__).parent)

# 핸들러 설정
Handler = http.server.SimpleHTTPRequestHandler

print("=" * 50)
print("🎮 게임 허브 서버 시작!")
print(f"📡 서버 주소: http://localhost:{PORT}")
print("=" * 50)
print("\n브라우저가 자동으로 열립니다...")
print("서버를 종료하려면 Ctrl+C를 누르세요.\n")

# 브라우저 자동 실행
webbrowser.open(f'http://localhost:{PORT}')

# 서버 시작
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n서버를 종료합니다. 안녕히 가세요! 👋")
