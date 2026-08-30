(() => {
  const projects = [
    { title: '표면의 말', items: [
      ['2007', '만물시장', 'everythingmarket.html'], ['2008', '인민로', 'renminro.html'],
      ['2009–10', '평화와 통일', 'pnr0910.html'], ['2018', '호안끼엠', 'hoankiem.html'],
      ['2021', '바이센지', 'weissensee.html'], ['2022', '사랑곳', 'sarangkot.html'],
      ['2023', '비늘', 'scale.html'], ['2024', '알고도날레스', 'algodonales.html'],
      ['2025', '담 Threshold', 'threshold.html']
    ]},
    { title: '환원되지 않는 것들', items: [
      ['2005', '대추와 꿀벌', 'haj.html'], ['2005–07', '문을 두드리다', 'kod.html'],
      ['2007', '캄보디아에서 온 37세의 분반나씨', 'cambo.html'], ['2009', '보이지 않는 당신', 'oosy.html'],
      ['2009–15', '돌탑', 'st.html'], ['2011–', '조화', 'af.html'],
      ['2023–26', '까만 사탕', 'carbon.html']
    ]},
    { title: '진행 중인 구조', items: [
      ['2009', '충무로', 'chungmuro.html'], ['2017–18', '반딧불이', 'firefly.html'],
      ['2018, 25', '시계탑', 'clocktower.html'], ['2026', '지번', 'lot.html']
    ]}
  ];

  const onHome = document.body.classList.contains('home-sidebar-page');
  const inContents = location.pathname.includes('/contents/');
  const contentPrefix = inContents ? '' : 'contents/';
  const rootPrefix = inContents ? '../' : '';
  const current = location.pathname.split('/').pop() || 'index.html';
  const sections = projects.map(({ title, items }) => `
    <section>
      <h2>${title}</h2>
      ${items.map(([year, name, href]) => `<a${href === current ? ' class="is-current" aria-current="page"' : ''} href="${contentPrefix}${href}?v=8"><span>${year}</span>${name}</a>`).join('')}
    </section>`).join('');

  const textSection = `
    <section class="sidebar-texts">
      <h2>글</h2>
      <a href="${rootPrefix}texts.html?v=8#intro1"><span>작가노트</span>엉킨 실타래, 달항아리</a>
      <a href="${rootPrefix}texts.html?v=8#intro2"><span>작업론</span>이 글은 작업을 설명하지 않습니다</a>
      <a href="${rootPrefix}texts.html?v=8#intro3"><span>에세이</span>가까운 것들은 가장 멀리 있다</a>
    </section>`;

  const existingList = document.querySelector('.legacy-portfolio-layout .legacy-work-list');
  if (existingList) {
    if (!existingList.querySelector('.sidebar-texts')) existingList.insertAdjacentHTML('beforeend', textSection);
    return;
  }

  const aside = document.createElement('aside');
  aside.className = 'legacy-sidebar';
  aside.setAttribute('aria-label', '전체 작업 목록');
  aside.innerHTML = `
    <div class="legacy-sidebar-head">
      <a class="legacy-brand" href="${rootPrefix}index.html?v=8">이영 <span>Lee Young</span></a>
      <nav aria-label="사이트 메뉴"><a href="${rootPrefix}texts.html?v=8#intro0">소개</a><a href="${rootPrefix}texts.html?v=8#intro1">글</a><a href="${contentPrefix}resume.html?v=8">이력</a><a href="mailto:iam2022@gmail.com">연락</a></nav>
    </div>
    <button class="legacy-list-toggle" type="button" aria-expanded="false" aria-controls="legacy-work-list">전체 작업 <span>20</span></button>
    <nav id="legacy-work-list" class="legacy-work-list">${sections}${textSection}</nav>`;

  const main = document.querySelector(onHome ? 'main#top' : 'main.container');
  if (!main) return;
  const layout = document.createElement('div');
  layout.className = `legacy-portfolio-layout${onHome ? ' home-portfolio-layout' : ' content-portfolio-layout'}`;
  main.before(layout);
  if (onHome) {
    const content = document.createElement('div');
    content.className = 'home-content';
    const footer = document.querySelector('.site-footer');
    content.append(main);
    if (footer) content.append(footer);
    layout.append(aside, content);
  } else {
    layout.append(aside, main);
  }

  const button = aside.querySelector('.legacy-list-toggle');
  const list = aside.querySelector('.legacy-work-list');
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    list.classList.toggle('is-open', open);
  });
})();
