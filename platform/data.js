// Central artist and video catalogue. Add approved artist records here.
window.SOTM_DATA = {
  artists: [
    {
      slug: "june-on-the-moon",
      name: "June on the Moon",
      location: "Zambia · Kenya & the Caribbean",
      genres: ["Folk", "Jazz", "Neo-soul", "Sound design"],
      tagline: "Music made to be felt first, and understood after.",
      bio: "A folk-poetic voice blending ethereal melodies with grounded storytelling, June on the Moon is a self-taught singer, songwriter, multi-instrumentalist, guitarist and producer rooted in Kenya and the Caribbean. Her work moves between jazz, neo-soul, bossa nova, R&B, folk and healing music.",
      photo: "../assets/june-hero-2.jpg",
      gallery: ["../assets/june-photo-1.jpeg", "../assets/june-photo-2.jpeg", "../assets/june-photo-3.jpeg", "../assets/june-photo-4.jpg", "../assets/june-photo-5.JPG"],
      epk: "../assets/june-presskit.pdf",
      track: "../assets/june-track.mp3",
      spotify: "https://open.spotify.com/artist/4D7fnI4k0SwiiH1v9u6l1j",
      bandcamp: "https://juneonthemoonmusic.bandcamp.com/track/leaving-samsara-where-i-am",
      instagram: "https://www.instagram.com/juneonthemoonmusic/",
      originalPresskit: "../index.html",
      featured: true,
      placeholder: false
    },
    {
      slug: "artist-two",
      name: "Artist Two",
      location: "Artist location",
      genres: ["Independent music"],
      tagline: "An independent voice to be discovered.",
      bio: "Placeholder artist profile. Replace this content with a participating musician's approved biography and press photography.",
      photo: "",
      gallery: [],
      epk: "",
      track: "",
      featured: false,
      placeholder: true
    },
    {
      slug: "artist-three",
      name: "Artist Three",
      location: "Artist location",
      genres: ["Independent music"],
      tagline: "A space for new sonic stories.",
      bio: "Placeholder artist profile. Replace this content with a participating musician's approved biography, music and links.",
      photo: "",
      gallery: [],
      epk: "",
      track: "",
      featured: false,
      placeholder: true
    }
  ],
  videos: [
    {
      id: "leaving-samsara",
      title: "Leaving Samsara (where i am)",
      artistSlugs: ["june-on-the-moon"],
      category: "Official video",
      youtubeId: "In9rB8typNE",
      description: "A video featured on June on the Moon's existing press kit.",
      featured: true,
      placeholder: false
    }
  ]
};
