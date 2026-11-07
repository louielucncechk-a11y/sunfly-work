const cover = document.querySelector('#cover');
const workspace = document.querySelector('#workspace');
const titles = {overview:'工作台', materials:'材料资料', stock:'库存管理', procurement:'采购管理', projects:'项目用料', documents:'文件中心', assistant:'AI 文件助手'};
function render() {
  const key = location.hash.slice(1);
  const isWorkspace = Object.hasOwn(titles, key);
  cover.hidden = isWorkspace;
  workspace.hidden = !isWorkspace;
  if (!isWorkspace) return;
  document.querySelector('#overview').hidden = key !== 'overview';
  document.querySelector('#module').hidden = key === 'overview' || key === 'assistant';
  document.querySelector('#assistant').hidden = key !== 'assistant';
  document.querySelector('#module-title').textContent = titles[key];
  document.querySelector('#breadcrumb').textContent = titles[key];
  document.title = `${titles[key]} · 沈飞材料`;
  document.querySelectorAll('[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === key);
    if (link.dataset.page === key) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
}
document.querySelector('#enter').addEventListener('click', () => location.hash = 'overview');
document.querySelector('#back-cover').addEventListener('click', () => {location.hash = ''; document.title = '沈飞材料 · 工作平台';});
document.querySelector('#menu-toggle').addEventListener('click', event => {
  const open = document.querySelector('#sidebar').classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', render);
render();

document.querySelector('#file-search').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#file-query').value.trim();
  document.querySelector('#search-feedback').textContent = query ? `你要查找：${query}。当前尚未连接文件库及 AI 服务，无法执行检索；接入后将在这里显示文件名称、位置与打开入口。` : '请输入要查找的文件描述。';
});
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#file-query').value = button.dataset.query;
  document.querySelector('#file-query').focus();
}));
