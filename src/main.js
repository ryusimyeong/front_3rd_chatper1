import Articles from './components/Articles';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Write from './components/Write';

function initFunctions() {
  const list = document.getElementById('nav-list');
  if (list) {
    list.addEventListener('click', (e) => {
      if (!list.contains(e.target)) return;

      console.log('click');

      const route = e.target.dataset.route;
      switch (route) {
        case 'home':
          history.pushState({ state: '홈' }, '', '/');
          history.pushState({ state: '홈' }, '', '/');
          history.back();
          break;

        case 'profile':
          history.pushState({ state: '프로필' }, '', '/profile');
          history.pushState({ state: '프로필' }, '', '/profile');
          history.back();
          break;

        case 'login':
          history.pushState({ state: '로그인' }, '', '/login');
          history.pushState({ state: '로그인' }, '', '/login');
          history.back();
          break;

        case 'logout':
          if (!confirm('로그아웃 하시겠습니까?')) return;

          localStorage.removeItem('login');

          history.pushState({ state: '홈' }, '', '/');
          history.pushState({ state: '홈' }, '', '/');
          history.back();
          break;

        default:
          history.pushState({ state: 404 }, '', '/404');
          history.pushState({ state: 404 }, '', '/404');
          history.back();
          break;
      }
      console.log(location.pathname);
      console.log(history);
    });
  }
}

function render() {
  console.log('render');
  const Home = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}

        <main class="p-4">
          ${Write()}
          ${Articles()}
        </main>

        ${Footer()}
      </div>
    </div>
  `;

  const Login = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form>
          <div class="mb-4">
            <input type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;

  const Profile = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form>
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" value="홍길동" class="w-full p-2 border rounded">
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" value="hong@example.com" class="w-full p-2 border rounded">
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
  `;

  const Error404 = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="./main.html" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `;

  const paintMain = () => {
    switch (location.pathname) {
      case '/':
        return Home;

      case '/login':
        return Login;

      case '/profile':
        return Profile;

      default:
        return Error404;
    }
  };

  document.querySelector('#root').innerHTML = paintMain();

  initFunctions();
}

localStorage.setItem('login', true);

render();

window.addEventListener('popstate', (e) => {
  console.log(e);
  render();
});
