/* Sessions on the Moon — dependency-free catalogue rendering. */
(() => {
  "use strict";
  const data = window.SOTM_DATA;
  if (!data) return;
  const byId = id => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const link = (text, href, className) => {
    const a = el("a", className, text);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  };
  const artistUrl = artist => "artist.html?slug=" + encodeURIComponent(artist.slug);
  const artistBySlug = slug => data.artists.find(a => a.slug === slug);
  function artistCard(artist) {
    const card = el("article", "artist-card");
    const a = link("", artistUrl(artist), "artist-card-link");
    const visual = el("div", "card-art");
    if (artist.photo) {
      const img = el("img"); img.src = artist.photo; img.alt = artist.name + " artist portrait"; img.loading = "lazy"; visual.append(img);
    } else { visual.append(el("span", "placeholder-glyph", "◒")); }
    const overlay = el("span", "card-corner", artist.placeholder ? "COMING SOON" : "ARTIST PROFILE ↗");
    visual.append(overlay);
    a.append(visual, el("h3", "", artist.name), el("p", "small muted", artist.location));
    card.append(a);
    return card;
  }
  function makeVideo(video) {
    const card = el("article", "video-card");
    const frame = el("div", "video-frame");
    const button = el("button", "video-poster");
    button.type = "button";
    button.setAttribute("aria-label", "Play " + video.title);
    const image = el("img");
    image.src = "https://i.ytimg.com/vi/" + encodeURIComponent(video.youtubeId) + "/hqdefault.jpg";
    image.alt = ""; image.loading = "lazy";
    button.append(image, el("span", "play-symbol", "▶"));
    button.addEventListener("click", () => {
      const iframe = el("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(video.youtubeId) + "?autoplay=1";
      iframe.title = video.title;
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      frame.replaceChildren(iframe);
    });
    frame.append(button);
    const caption = el("div", "video-caption");
    caption.append(el("p", "eyebrow", video.category), el("h3", "", video.title));
    const names = video.artistSlugs.map(slug => artistBySlug(slug)).filter(Boolean);
    const artists = el("p", "small");
    names.forEach((artist, i) => { if(i) artists.append(document.createTextNode(" · ")); artists.append(link(artist.name, artistUrl(artist), "underlined")); });
    caption.append(artists);
    if (video.description) caption.append(el("p", "small muted", video.description));
    card.append(frame, caption);
    return card;
  }
  const menu = document.querySelector(".menu-button");
  if(menu) menu.addEventListener("click", () => {
    const nav = byId("main-nav");
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  document.querySelectorAll(".year").forEach(n => n.textContent = new Date().getFullYear());
  const page = document.body.dataset.page;
  if (page === "home") {
    const artists = byId("featured-artists");
    data.artists.forEach(a => artists.append(artistCard(a)));
    const film = byId("featured-film");
    const video = data.videos.find(v => v.featured && !v.placeholder);
    if(video) film.append(makeVideo(video));
    else film.append(el("p", "muted", "Film archive coming soon."));
  }
  if (page === "artists") {
    const list = byId("artist-list"), search = byId("artist-search"), count = byId("artist-count");
    function render() {
      const q = search.value.trim().toLowerCase();
      const matches = data.artists.filter(a => [a.name,a.location,...a.genres].join(" ").toLowerCase().includes(q));
      list.replaceChildren(...matches.map(artistCard));
      count.textContent = matches.length + (matches.length === 1 ? " profile" : " profiles");
      if(!matches.length) list.append(el("p", "muted", "No matching artists found."));
    }
    search.addEventListener("input", render); render();
  }
  if (page === "videos") {
    const list = byId("video-list"), search = byId("video-search"), filter = byId("video-filter");
    function render() {
      const q = search.value.trim().toLowerCase(), category = filter.value;
      const matches = data.videos.filter(v => !v.placeholder && (category === "all" || v.category === category) && [v.title,v.category,...v.artistSlugs].join(" ").toLowerCase().includes(q));
      list.replaceChildren(...matches.map(makeVideo));
      if(!matches.length) list.append(el("p","muted","No matching videos yet."));
    }
    search.addEventListener("input",render);filter.addEventListener("change",render);render();
  }
  if(page === "artist") {
    const slug = new URLSearchParams(window.location.search).get("slug");
    const artist = artistBySlug(slug);
    const root = byId("artist-detail");
    if(!artist) {
      document.title = "Artist not found | Sessions on the Moon";
      root.append(el("h1","","Artist not found"),el("p","muted","This artist profile is unavailable."));
      root.append(link("Browse artists ↗","artists.html","button"));return;
    }
    document.title = artist.name + " | Sessions on the Moon";
    const hero = el("section","artist-hero");
    const content = el("div","");
    content.append(el("p","eyebrow",artist.placeholder ? "DEMONSTRATION PROFILE / COMING SOON" : "ARTIST PROFILE / SESSIONS ON THE MOON"));
    content.append(el("h1","",artist.name),el("p","lede",artist.tagline),el("p","small muted",artist.location + " · " + artist.genres.join(" / ")));
    const photo = el("div","artist-portrait");
    if(artist.photo){const img=el("img");img.src=artist.photo;img.alt=artist.name+" portrait";photo.append(img);}
    else photo.append(el("span","placeholder-glyph","◒"));
    hero.append(content,photo);root.append(hero);
    const about = el("section","section prose");
    about.append(el("p","eyebrow","01 / THE ARTIST"),el("h2","","About the artist"),el("p","",artist.bio));root.append(about);
    if(artist.placeholder) { root.append(el("p","muted footnote","This is a sample layout only; no real artist is represented."));return; }
    const actions = el("div","actions");
    [["Download EPK",artist.epk],["Spotify",artist.spotify],["Bandcamp",artist.bandcamp],["Instagram",artist.instagram],["Original press kit",artist.originalPresskit]].forEach(([label,url])=>{if(url)actions.append(link(label+" ↗",url,label==="Download EPK"?"button":"text-link"));});
    root.append(actions);
    if(artist.track){const section=el("section","section prose");section.append(el("p","eyebrow","02 / LISTEN"),el("h2","","Selected sound"));const audio=el("audio");audio.controls=true;audio.preload="none";audio.src=artist.track;section.append(audio);root.append(section);}
    const videos = data.videos.filter(v => v.artistSlugs.includes(artist.slug) && !v.placeholder);
    if(videos.length){const section=el("section","section");section.append(el("p","eyebrow","03 / WATCH"),el("h2","","Music in motion"));const grid=el("div","video-grid");videos.forEach(v=>grid.append(makeVideo(v)));section.append(grid);root.append(section);}
    if(artist.gallery.length){const section=el("section","section");section.append(el("p","eyebrow","04 / PRESS"),el("h2","","Portraits & stills"));const grid=el("div","photo-grid");artist.gallery.forEach((src,i)=>{const img=el("img");img.src=src;img.alt=artist.name+" press photograph "+(i+1);img.loading="lazy";grid.append(img);});section.append(grid);root.append(section);}
  }
})();
