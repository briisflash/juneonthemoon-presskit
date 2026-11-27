// Sessions on the Moon: editable artist and video records.
// To add an artist: add an object to artists. To publish a video: add an object to videos.
// Keep artist slug values unique; reference those slugs from video artistSlugs.
const artists = [
  {
    slug: "june-on-the-moon",
    name: "June on the Moon",
    location: "Zambia / Kenya",
    region: "East & Southern Africa",
    genres: ["Folk", "Jazz", "Neo-soul", "Bossa nova"],
    descriptor: "Composer · Sound Designer · Multi-Instrumentalist",
    portrait: "../assets/june-hero-2.jpg",
    bio: "A folk-poetic voice blending ethereal melodies with grounded storytelling, June on the Moon is a self-taught singer, songwriter, guitarist, producer and multi-instrumentalist rooted in Kenya and the Caribbean. Her music moves between jazz, neo-soul, bossa nova, R&B, folk and healing music. Through Sessions on the Moon, she creates intentional spaces where sound, ceremony and audience become part of the same experience.",
    pressKit: "../assets/june-presskit.pdf",
    originalSite: "../",
    spotify: "https://open.spotify.com/artist/4D7fnI4k0SwiiH1v9u6l1j",
    bandcamp: "https://juneonthemoonmusic.bandcamp.com/track/leaving-samsara-where-i-am",
    instagram: "https://www.instagram.com/juneonthemoonmusic/?hl=en"
  }
];
const videos = [
  {id:"leaving-samsara",title:"Leaving Samsara (where i am)",artistSlugs:["june-on-the-moon"],category:"official",youtubeId:"In9rB8typNE",description:"Featured music film from June on the Moon."}
];

// Verified past-session records can be added here when dates, venues and materials are available.
// Example record fields: title, date, city, venue, description, image, videoUrl, setlist.
const pastSessions = [];
function renderPastSessions(){
  const grid=document.querySelector("#past-sessions-grid");
  const empty=document.querySelector("#past-sessions-empty");
  if(!grid||!empty)return;
  grid.replaceChildren();
  empty.hidden=pastSessions.length>0;
  for(const event of pastSessions){
    const card=node("article","past-session-card");
    card.append(node("p","eyebrow",[event.date,event.city].filter(Boolean).join(" / ")));
    card.append(node("h3",null,event.title||"Past session"));
    if(event.venue)card.append(node("p","meta",event.venue));
    if(event.description)card.append(node("p",null,event.description));
    if(event.image){
      const img=node("img");img.src=event.image;img.alt=event.title||"Session photograph";img.loading="lazy";card.prepend(img);
    }
    if(event.videoUrl){const links=node("div","dialog-links");addLink(links,"Watch session",event.videoUrl);card.append(links);}
    if(event.setlist && event.setlist.length){card.append(node("p","meta","SETLIST: "+event.setlist.join(" · ")));}
    grid.append(card);
  }
}

const $ = (selector) => document.querySelector(selector);
const artistBySlug = (slug) => artists.find(a => a.slug === slug);
const safeUrl = url => { try { const u = new URL(url, location.href); return ['https:','http:'].includes(u.protocol) ? u.href : null; } catch {return null;} };
const addLink = (container, label, url) => { const safe = safeUrl(url); if (!safe) return; const a=document.createElement("a"); a.textContent=label+" ↗"; a.href=safe; a.target="_blank"; a.rel="noopener noreferrer"; container.append(a); };
const node = (tag,cls,content) => { const n=document.createElement(tag); if(cls)n.className=cls; if(content!==undefined)n.textContent=content; return n; };
function showArtists(){
  const q=$("#artist-search").value.trim().toLowerCase(), region=$("#artist-region").value;
  const list=artists.filter(a=>(region==="all"||a.region===region)&&[a.name,a.location,...a.genres].join(" ").toLowerCase().includes(q));
  const grid=$("#artist-grid"); grid.replaceChildren();
  list.forEach(a=>{
    const card=node("button","artist-card"); card.type="button"; card.setAttribute("aria-label","View "+a.name+" profile");
    const img=node("img"); img.src=a.portrait; img.alt="Press portrait of "+a.name; img.loading="lazy"; card.append(img);
    card.append(node("h3",null,a.name),node("span","meta",a.location.toUpperCase()),node("p",null,a.genres.join(" / ")));
    card.addEventListener("click",()=>openArtist(a));grid.append(card);
  });
  $("#artist-empty").hidden=list.length>0;
}
function openArtist(a){
  const d=$("#artist-detail"); d.replaceChildren();
  d.append(node("p","eyebrow","ARTIST PROFILE / "+a.location),node("h2",null,a.name),node("p","meta",a.descriptor));
  const photo=node("img","profile-photo");photo.src=a.portrait;photo.alt="Portrait of "+a.name;d.append(photo,node("p",null,a.bio));
  const links=node("div","dialog-links");addLink(links,"Download press kit",a.pressKit);addLink(links,"Spotify",a.spotify);addLink(links,"Bandcamp",a.bandcamp);addLink(links,"Instagram",a.instagram);addLink(links,"Original artist website",a.originalSite);d.append(links);
  const related=videos.filter(v=>v.artistSlugs.includes(a.slug));if(related.length){d.append(node("h3",null,"Music films"));related.forEach(v=>{const b=node("button","button",v.title+" ▶");b.type="button";b.addEventListener("click",()=>{$("#artist-dialog").close();openVideo(v)});d.append(b);});}
  $("#artist-dialog").setAttribute("aria-label",a.name+" artist profile");$("#artist-dialog").showModal();
}
function showVideos(){
  const q=$("#video-search").value.trim().toLowerCase(), category=$("#video-category").value;
  const list=videos.filter(v=>(category==="all"||v.category===category)&&[v.title,...v.artistSlugs.map(s=>artistBySlug(s)?.name||"")].join(" ").toLowerCase().includes(q));
  const grid=$("#video-grid");grid.replaceChildren();
  list.forEach(v=>{
    const b=node("button","video-card");b.type="button";b.setAttribute("aria-label","Watch "+v.title);
    const thumb=node("span","thumb"),im=node("img"); im.src="https://i.ytimg.com/vi/"+encodeURIComponent(v.youtubeId)+"/hqdefault.jpg";im.alt="Thumbnail for "+v.title;im.loading="lazy";thumb.append(im,node("span","play-icon","▶"));
    const names=v.artistSlugs.map(s=>artistBySlug(s)?.name||s).join(" + ");
    b.append(thumb,node("h3",null,v.title),node("span","meta",v.category.toUpperCase()),node("p",null,names));b.addEventListener("click",()=>openVideo(v));grid.append(b);
  });
  $("#video-empty").hidden=list.length>0;
}
function openVideo(v){
  const d=$("#video-detail");d.replaceChildren();d.append(node("p","eyebrow",v.category.toUpperCase()+" / VIDEO ARCHIVE"),node("h2",null,v.title));
  if(/^[\w-]{11}$/.test(v.youtubeId)){const frame=node("iframe","video-embed");frame.title=v.title;frame.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";frame.src="https://www.youtube-nocookie.com/embed/"+v.youtubeId;d.append(frame);}
  d.append(node("p","video-help",v.artistSlugs.map(s=>artistBySlug(s)?.name||s).join(" + ")));
  if(v.description)d.append(node("p",null,v.description));
  $("#video-dialog").setAttribute("aria-label",v.title+" music video");$("#video-dialog").showModal();
}
const regions=[...new Set(artists.map(a=>a.region))].sort();regions.forEach(r=>{const o=node("option",null,r);o.value=r;$("#artist-region").append(o);});
$("#artist-search").addEventListener("input",showArtists);$("#artist-region").addEventListener("change",showArtists);
$("#video-search").addEventListener("input",showVideos);$("#video-category").addEventListener("change",showVideos);
$("#close-artist").addEventListener("click",()=>$("#artist-dialog").close());
$("#close-video").addEventListener("click",()=>$("#video-dialog").close());
$("#video-dialog").addEventListener("close",()=>{$("#video-detail").replaceChildren()});
$("#artist-dialog").addEventListener("close",()=>{$("#artist-detail").replaceChildren()});
$("#menu-toggle").addEventListener("click",()=>{const open=$("#nav").classList.toggle("open");$("#menu-toggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>{$("#nav").classList.remove("open");$("#menu-toggle").setAttribute("aria-expanded","false")}));
$("#year").textContent=new Date().getFullYear();
showArtists();showVideos();renderPastSessions();