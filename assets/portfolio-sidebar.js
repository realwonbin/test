(() => {
  const prepareHiddenGalleries = () => {
    document.querySelectorAll('.hidden-gallery').forEach((gallery) => {
      const precedingGrids = [...document.querySelectorAll('.image-gallery.two, .image-gallery.three, .image-gallery.four, .image-gallery.five, .image-gallery.six, .image-gallery.seven')]
        .filter((grid) => grid.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING);
      const visibleGrid = precedingGrids.at(-1);
      if (visibleGrid) {
        const visibleItems = [...visibleGrid.querySelectorAll(':scope > a')];
        const completeRows = Math.min(Math.floor(visibleItems.length / 4) * 4, 20);
        if (completeRows >= 16 && visibleItems.length > completeRows) {
          visibleItems.slice(completeRows).reverse().forEach((item) => gallery.prepend(item));
        }
      }
    });
  };

  prepareHiddenGalleries();

  if (new URLSearchParams(location.search).get('embed') === '1') {
    document.body.classList.add('embedded-content');
    return;
  }

  const projects = [
    { title: '표면의 말 : 황학동 만물시장에서 시작한 간판기록의 연속과 확장', items: [
      ['2007', '만물시장', 'everythingmarket.html'], ['2008', '인민로', 'renminro.html'],
      ['2009–10', '평화와 통일', 'pnr0910.html'], ['2018', '호안끼엠', 'hoankiem.html'],
      ['2021', '바이센지', 'weissensee.html'], ['2022', '사랑곳', 'sarangkot.html'],
      ['2023', '비늘', 'scale.html'], ['2024', '알고도날레스', 'algodonales.html'],
      ['2025', '담 Threshold', 'threshold.html']
    ]},
    { title: '환원되지 않는 것들 : 비선형적 시간으로부터 생태윤리적 감각으로', items: [
      ['2005', '대추와 꿀벌', 'haj.html'], ['2005–07', '문을 두드리다', 'kod.html'],
      ['2007', '캄보디아에서 온 37세의 분반나씨', 'cambo.html'], ['2009', '보이지 않는 당신', 'oosy.html'],
      ['2009–15', '돌탑', 'st.html'], ['2011–', '조화', 'af.html'],
      ['2023–26', '까만 사탕', 'carbon.html']
    ]},
    { title: '진행 중인 구조 : 사건의 기록과 유형의 발견', items: [
      ['2009', '충무로', 'chungmuro.html'], ['2017–18', '반딧불이', 'firefly.html'],
      ['2018, 25', '시계탑', 'clocktower.html'], ['2026', '지번', 'lot.html']
    ]}
  ];

  // 전시 아카이브 링크: 아래 이름과 주소만 실제 정보로 교체하면 됩니다.
  const exhibitionLinks = [
    ['Archive 01', '전시 아카이브', 'https://example.com/'],
    ['Archive 02', '전시 프로젝트', 'https://example.com/'],
    ['Related', '관련 기록', 'https://example.com/']
  ];

  const onHome = document.body.classList.contains('home-sidebar-page');
  const inContents = location.pathname.includes('/contents/');
  const inTextPages = location.pathname.includes('/texts/');
  const rootPrefix = (inContents || inTextPages) ? '../' : '';
  const contentPrefix = inContents ? '' : `${rootPrefix}contents/`;
  const current = location.pathname.split('/').pop() || 'index.html';
  const sections = projects.map(({ title, items }) => `
    <section>
      <h2>${title}</h2>
      ${items.map(([year, name, href]) => `<a${href === current ? ' class="is-current" aria-current="page"' : ''} href="${contentPrefix}${href}?v=9"><span>${year}</span>${name}</a>`).join('')}
    </section>`).join('');

  const textSection = `
    <section class="sidebar-texts">
      <h2>생각들</h2>
      <a href="${rootPrefix}texts/tangled-thread.html?v=9"><span>존재에 대한</span>엉킨 실타래, 달항아리</a>
      <a href="${rootPrefix}texts/this-text-does-not-explain.html?v=9"><span>매체에 대한</span>이 글은 작업을 설명하지 않습니다</a>
      <a href="${rootPrefix}texts/near-things.html?v=9"><span>윤리에 대한</span>가까운 것들은 가장 멀리 있다</a>
    </section>`;

  const exhibitionSection = `
    <section class="sidebar-exhibitions">
      <button class="sidebar-exhibition-toggle" type="button" aria-expanded="false" aria-controls="sidebar-exhibition-links">
        <span>전시 기록</span><small>${exhibitionLinks.length}</small>
      </button>
      <div id="sidebar-exhibition-links" class="sidebar-exhibition-links">
        ${exhibitionLinks.map(([label, name, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><span>${label}</span>${name}</a>`).join('')}
      </div>
    </section>`;

  const bindExhibitionToggle = (scope) => {
    const toggle = scope.querySelector('.sidebar-exhibition-toggle');
    const links = scope.querySelector('.sidebar-exhibition-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
    });
  };

  const bindSidebarNavigation = (aside, contentArea) => {
    aside.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link || link.classList.contains('legacy-brand') || link.target === '_blank' || link.protocol === 'mailto:') return;

      const url = new URL(link.href, location.href);
      if (url.protocol !== 'file:' || !url.pathname.includes('/88_test/')) return;
      event.preventDefault();

      url.searchParams.set('embed', '1');
      let frame = contentArea.querySelector(':scope > .sidebar-content-frame');
      if (!frame) {
        frame = document.createElement('iframe');
        frame.className = 'sidebar-content-frame';
        frame.name = 'portfolio-content';
        frame.title = '선택한 콘텐츠';
        contentArea.replaceChildren(frame);
      }
      frame.src = url.href;
    });
  };

  const existingList = document.querySelector('.legacy-portfolio-layout .legacy-work-list');
  if (existingList) {
    if (!existingList.querySelector('.sidebar-texts')) existingList.insertAdjacentHTML('beforeend', textSection);
    if (!existingList.querySelector('.sidebar-exhibitions')) existingList.insertAdjacentHTML('beforeend', exhibitionSection);
    bindExhibitionToggle(existingList);
    return;
  }

  const aside = document.createElement('aside');
  aside.className = 'legacy-sidebar';s
  aside.setAttribute('aria-label', '전체 작업 목록');
  aside.innerHTML = `
    <div class="legacy-sidebar-head">
      <a class="legacy-brand" href="${rootPrefix}index.html?v=9">이영 <span>Lee Young</span></a>
      <nav aria-label="사이트 메뉴"><a href="${rootPrefix}about.html?v=9">시작</a><a href="${rootPrefix}texts.html?v=9">생각</a><a href="${contentPrefix}resume.html?v=9">이력</a><a href="https://blog.younglee.co.kr" target="_blank" rel="noopener noreferrer">블로그</a></nav>
    </div>
    <button class="legacy-list-toggle" type="button" aria-expanded="false" aria-controls="legacy-work-list">전체 작업 <span>20</span></button>
    <nav id="legacy-work-list" class="legacy-work-list">${sections}${textSection}${exhibitionSection}</nav>`;

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
    bindSidebarNavigation(aside, content);
  } else {
    const content = document.createElement('div');
    content.className = 'sidebar-content-area';
    content.append(main);
    layout.append(aside, content);
    bindSidebarNavigation(aside, content);
  }

  bindExhibitionToggle(aside);

  const button = aside.querySelector('.legacy-list-toggle');
  const list = aside.querySelector('.legacy-work-list');
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    list.classList.toggle('is-open', open);
  });
})();
