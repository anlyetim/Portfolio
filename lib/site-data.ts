/**
 * ============================================================
 * SITE DATA — Edit all visual assets and text here
 * ============================================================
 *
 * To change logos/colors/images, edit the arrays below.
 * Each skill piece has: name, color, icon (2-letter abbrev), row, col.
 * Portfolio projects have: title, description, tags, color.
 * Social links have: name, href, iconName (lucide icon key).
 *
 * To add a logo URL instead of a text icon, add a `logoUrl` field
 * to any skill piece and render it in the puzzle component.
 * ============================================================
 */

// ─── Profile Photos (Home Section) ─────────────────────────────
export const profilePhotos = [
  "/profile_pics/p1.jpeg",
  "/profile_pics/p2.jpeg",
]

// ─── Skill Pieces ──────────────────────────────────────────────
export interface SkillPiece {
  id: string
  name: string
  color: string
  icon: string      // 2-letter abbreviation displayed in the piece
  logoUrl?: string   // optional: URL to an SVG/PNG logo (overrides icon text)
  row: number
  col: number
}

export const skills = {
  development: [
    { id: "react", name: "React", color: "#61DAFB", icon: "Re", logoUrl: "/icons/react-16-svgrepo-com.svg", row: 0, col: 0 },
    { id: "java", name: "Java", color: "#ED8B00", icon: "Ja", logoUrl: "/icons/java-svgrepo-com.svg", row: 0, col: 1 },
    { id: "csharp", name: "C#", color: "#68217A", icon: "C#", logoUrl: "/icons/c-sharp-16-svgrepo-com.svg", row: 0, col: 2 },
    { id: "threejs", name: "Three.js", color: "#049EF4", icon: "3D", logoUrl: "/icons/Threejs-logo.svg", row: 0, col: 3 },
    { id: "typescript", name: "TypeScript", color: "#3178C6", icon: "TS", logoUrl: "/icons/typescript-16-svgrepo-com.svg", row: 1, col: 0 },
    { id: "nodejs", name: "Node.js", color: "#68A063", icon: "No", logoUrl: "/icons/node-js-svgrepo-com.svg", row: 1, col: 1 },
    { id: "python", name: "Python", color: "#3776AB", icon: "Py", logoUrl: "/icons/python-127-svgrepo-com.svg", row: 1, col: 2 },
    { id: "flutter", name: "Flutter", color: "#02569B", icon: "Fl", logoUrl: "/icons/flutter-svgrepo-com.svg", row: 1, col: 3 },
  ] as SkillPiece[],

  design: [
    { id: "blender", name: "Blender", color: "#EA7600", icon: "Bl", logoUrl: "/icons/blender-svgrepo-com.svg", row: 0, col: 0 },
    { id: "photoshop", name: "Photoshop", color: "#31A8FF", icon: "Ps", logoUrl: "/icons/photoshop-svgrepo-com.svg", row: 0, col: 1 },
    { id: "unity", name: "Unity", color: "#CCCCCC", icon: "Un", logoUrl: "/icons/unity-svgrepo-com.svg", row: 0, col: 2 },
    { id: "premiere", name: "Premiere Pro", color: "#9999FF", icon: "Pr", logoUrl: "/icons/premiere-svgrepo-com.svg", row: 1, col: 0 },
    { id: "aftereffects", name: "After Effects", color: "#9999FF", icon: "Ae", logoUrl: "/icons/aftereffects-svgrepo-com.svg", row: 1, col: 1 },
    { id: "canva", name: "Canva", color: "#00C4CC", icon: "Ca", logoUrl: "/icons/canva-svgrepo-com.svg", row: 1, col: 2 },
  ] as SkillPiece[],

  cyber: [
    { id: "kali", name: "Kali Linux", color: "#557C94", icon: "Ka", logoUrl: "/icons/kalilinux-svgrepo-com.svg", row: 0, col: 0 },
    { id: "burp", name: "Burp Suite", color: "#FF6633", icon: "Bu", logoUrl: "/icons/Burpsuite--Streamline-Simple-Icons.svg", row: 0, col: 1 },
    { id: "wireshark", name: "Wireshark", color: "#1679A7", icon: "Ws", logoUrl: "/icons/wireshark-svgrepo-com.svg", row: 0, col: 2 },
    { id: "nmap", name: "Nmap", color: "#4682B4", icon: "Nm", logoUrl: "/icons/nmap_icon_132152.svg", row: 0, col: 3 },
    { id: "terminal", name: "Terminal", color: "#4EAA25", icon: "Te", logoUrl: "/icons/terminal-svgrepo-com.svg", row: 1, col: 0 },
    { id: "py-cyber", name: "Python", color: "#3776AB", icon: "Py", logoUrl: "/icons/python-127-svgrepo-com.svg", row: 1, col: 1 },
    { id: "owasp", name: "OWASP", color: "#CC2222", icon: "Ow", logoUrl: "/icons/Owasp--Streamline-Simple-Icons.svg", row: 1, col: 2 },
    { id: "metasploit", name: "Metasploit", color: "#2596CD", icon: "Ms", logoUrl: "/icons/Metasploit--Streamline-Simple-Icons.svg", row: 1, col: 3 },
  ] as SkillPiece[],
}

// ─── Tab accent colors (per skill tab) ────────────────────────
export const tabAccents = {
  development: "#FFD400",
  design: "#3B82F6",
  cyber: "#FF2D2D",
}

// ─── Portfolio Projects ────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  descriptionTR: string
  tags: string[]
  color: string
  thumbnailUrl?: string  // optional: URL to a project screenshot
  gallery?: string[]     // optional: multiple images/videos shown side-by-side
  artstationUrl?: string
  githubUrl?: string
  thumbnailMode?: "icon" | "themed-icon"  // icon: centered image, themed-icon: SVG that inverts with theme
}

export interface ProjectRow {
  category: string
  categoryTR: string
  projects: Project[]
}

export const portfolioRows: ProjectRow[] = [
  {
    category: "Coding / Software Projects",
    categoryTR: "Yazılım Projeleri",
    projects: [
      {
        id: "c1",
        title: "Glox",
        description: "A colorful and addictive mobile puzzle game built with Flutter.",
        descriptionTR: "Flutter ile geliştirilmiş renkli ve bağımlılık yapıcı bir mobil bulmaca oyunu.",
        tags: ["Flutter", "Dart", "Mobile", "Game"],
        color: "#02569B",
        gallery: [
          "/coding_portfolio/glox/st1.png",
          "/coding_portfolio/glox/st2.png",
          "/coding_portfolio/glox/st3.png",
        ],
        githubUrl: "https://github.com/anlyetim/Glox",
      },
      {
        id: "c2",
        title: "ActionRing",
        description: "A fast-paced action ring mobile game with dynamic gameplay mechanics.",
        descriptionTR: "Dinamik oyun mekanikleri ile hızlı tempolu bir aksiyon halka mobil oyunu.",
        tags: ["Mobile", "Game", "Android"],
        color: "#4CAF50",
        thumbnailUrl: "/coding_portfolio/actionring_icon.png",
        thumbnailMode: "icon",
        githubUrl: "https://github.com/anlyetim/ActionRing",
      },
      {
        id: "c3",
        title: "3D Particle Website",
        description: "An interactive 3D particle-based website with immersive visual effects.",
        descriptionTR: "Sürükleyici görsel efektlerle interaktif 3D parçacık tabanlı bir web sitesi.",
        tags: ["Three.js", "JavaScript", "WebGL"],
        color: "#9C27B0",
        thumbnailUrl: "/coding_portfolio/3dparticle.png",
        githubUrl: "https://github.com/anlyetim/3DParticleWebsite",
      },
      {
        id: "c4",
        title: "1111 Game",
        description: "A number guessing game with clean UI and engaging gameplay.",
        descriptionTR: "Temiz arayüz ve ilgi çekici oynanış ile bir sayı tahmin oyunu.",
        tags: ["Game", "Web", "JavaScript"],
        color: "#FF9800",
        thumbnailUrl: "/coding_portfolio/1111game.jpg",
        githubUrl: "https://github.com/anlyetim/1111-Number-Guessing-Game",
      },
      {
        id: "c5",
        title: "DunkLocate",
        description: "A location-based basketball court finder application.",
        descriptionTR: "Konum tabanlı bir basketbol sahası bulma uygulaması.",
        tags: ["Mobile", "Maps", "Location"],
        color: "#E65100",
        thumbnailUrl: "/coding_portfolio/dunklocate.png",
        githubUrl: "https://github.com/anlyetim/DunkLocate",
      },
      {
        id: "c6",
        title: "Modern Portfolio Website",
        description: "A sleek, modern portfolio website with smooth animations and responsive design.",
        descriptionTR: "Akıcı animasyonlar ve duyarlı tasarım ile şık, modern bir portfolyo web sitesi.",
        tags: ["Next.js", "React", "TypeScript"],
        color: "#2196F3",
        thumbnailUrl: "/coding_portfolio/modernportfolio.png",
        githubUrl: "https://github.com/anlyetim/Modern-Portfolio",
      },
      {
        id: "c7",
        title: "PortXplorer",
        description: "A network port scanning and exploration tool for cybersecurity analysis.",
        descriptionTR: "Siber güvenlik analizi için bir ağ port tarama ve keşif aracı.",
        tags: ["Python", "Cybersecurity", "Networking"],
        color: "#2196F3",
        thumbnailUrl: "/coding_portfolio/cybersecurity-black-icon.svg",
        thumbnailMode: "themed-icon",
        githubUrl: "https://github.com/anlyetim/PortXplorer",
      },
      {
        id: "c8",
        title: "TeamPad",
        description: "A collaborative team notepad application for real-time note sharing.",
        descriptionTR: "Gerçek zamanlı not paylaşımı için işbirlikçi bir takım not defteri uygulaması.",
        tags: ["Web", "Collaboration", "Real-time"],
        color: "#4CAF50",
        thumbnailUrl: "/coding_portfolio/Teampad.png",
        githubUrl: "https://github.com/anlyetim/TeamPad",
      },
      {
        id: "c9",
        title: "Metasploit Pentesting",
        description: "A penetration testing toolkit and documentation for security assessments.",
        descriptionTR: "Güvenlik değerlendirmeleri için bir penetrasyon testi araç seti ve dokümantasyonu.",
        tags: ["Python", "Cybersecurity", "Pentesting"],
        color: "#FF0000",
        thumbnailUrl: "/coding_portfolio/cybersecurity-black-icon.svg",
        thumbnailMode: "themed-icon",
        githubUrl: "https://github.com/anlyetim/Metasploit-Pentesting",
      },
    ],
  },
  {
    category: "3D / Design Projects",
    categoryTR: "3D / Tasarım Projeleri",
    projects: [
      {
        id: "d1",
        title: "3D Rick and Morty Lab",
        description: "A detailed 3D recreation of the iconic Rick and Morty lab, featuring realistic lighting and textures.",
        descriptionTR: "Rick and Morty laboratuvarının detaylı 3D rekreasyonu. Gerçekçi aydınlatma ve dokular içerir.",
        tags: ["Blender", "Eevee", "3D"],
        color: "#82E83A",
        thumbnailUrl: "/portfolio/3D Rick and Morty Lab/rickandmorty_lab.jpg",
        artstationUrl: "https://www.artstation.com/artwork/ZalXKZ",
      },
      {
        id: "d2",
        title: "Abandoned Spaceship",
        description: "An eerie abandoned spaceship scene with volumetric fog, rust materials, and dramatic lighting.",
        descriptionTR: "Hacimsel sis, pas materyalleri ve dramatik aydınlatma ile ürkütücü bir terk edilmiş uzay gemisi sahnesi.",
        tags: ["Blender", "Cycles", "Sci-Fi", "3D"],
        color: "#5B8FA8",
        thumbnailUrl: "/portfolio/Abondoned Spaceship/abandoned_spaceship.jpg",
        artstationUrl: "https://www.artstation.com/artwork/Ealok4",
      },
      {
        id: "d3",
        title: "Desert Night",
        description: "A serene desert landscape at night with moonlit dunes, atmospheric haze, and starry skies.",
        descriptionTR: "Ay ışığıyla aydınlanan kum tepeleri, atmosferik pus ve yıldızlı gökyüzü ile huzurlu bir gece çöl manzarası.",
        tags: ["Blender", "Cycles", "Environment", "Lighting", "3D"],
        color: "#D4A84B",
        thumbnailUrl: "/portfolio/Desert/desertnight.jpg",
        artstationUrl: "https://www.artstation.com/artwork/14dPJe",
      },
      {
        id: "d4",
        title: "Magic Forest",
        description: "A low-poly stylized magic forest with glowing flora, fairy lights, and enchanted atmosphere.",
        descriptionTR: "Parlayan bitkiler, peri ışıkları ve büyülü atmosfer ile low-poly stilize sihirli orman.",
        tags: ["Blender", "Low Poly", "Stylized", "Eevee", "3D"],
        color: "#4DD88A",
        thumbnailUrl: "/portfolio/Magic Forest/lowpoly_magicforest.jpg",
        artstationUrl: "https://www.artstation.com/artwork/xYW9gX",
      },
      {
        id: "d5",
        title: "Modern Watch",
        description: "A photorealistic 3D render of a modern luxury watch with precise reflections and studio lighting.",
        descriptionTR: "Hassas yansımalar ve stüdyo aydınlatması ile modern bir lüks saatin fotorealistik 3D render'ı.",
        tags: ["Blender", "Product", "Advertising", "3D"],
        color: "#C0C0C0",
        thumbnailUrl: "/portfolio/Modern Watch/watch1.jpg",
        gallery: [
          "/portfolio/Modern Watch/watch1.jpg",
          "/portfolio/Modern Watch/watch_vid.mp4",
          "/portfolio/Modern Watch/watch2.jpg",
        ],
        artstationUrl: "https://www.artstation.com/artwork/aoGqK9",
      },
      {
        id: "d6",
        title: "Ocean",
        description: "A dynamic ocean simulation with realistic water shaders, foam, and atmospheric conditions.",
        descriptionTR: "Gerçekçi su gölgelendiricileri, köpük ve atmosferik koşullar ile dinamik okyanus simülasyonu.",
        tags: ["Blender", "Simulation", "VFX", "3D"],
        color: "#2196F3",
        thumbnailUrl: "/portfolio/Ocean/ocean.mp4",
        artstationUrl: "https://www.artstation.com/artwork/PezRdy",
      },
      {
        id: "d7",
        title: "Statue of Fish",
        description: "A surreal artistic sculpture of a fish rendered with metallic materials and dramatic composition.",
        descriptionTR: "Metalik materyaller ve dramatik kompozisyon ile render edilmiş sürreal bir balık heykeli.",
        tags: ["Blender", "3D", "Art"],
        color: "#FF7043",
        thumbnailUrl: "/portfolio/Statue Of Fish/statue_of_fish.jpg",
        artstationUrl: "https://www.artstation.com/artwork/EvbqY0",
      },
    ],
  },
]

// ─── Social Links (Contact Section) ───────────────────────────
export const socialLinks = [
  { name: "GitHub", iconName: "github" as const, href: "https://github.com/anlyetim" },
  { name: "LinkedIn", iconName: "linkedin" as const, href: "https://www.linkedin.com/in/anl-yetim/" },
  { name: "ArtStation", iconName: "artstation" as const, href: "https://anly05.artstation.com/" },
  { name: "Instagram", iconName: "instagram" as const, href: "https://www.instagram.com/anl.y05/" },
]

// ─── i18n Strings ─────────────────────────────────────────────
export type Lang = "TR" | "EN"

export const strings: Record<Lang, {
  continue: string
  backToHome: string
  scatter: string
  collect: string
  solved: string
  skillSet: string
  selectedWork: string
  portfolio: string
  getInTouch: string
  letsWork: string
  name: string
  email: string
  message: string
  sendMessage: string
  sent: string
  home: string
  skillsLabel: string
  portfolioLabel: string
  contact: string
  interactiveDev: string
  greetingPrefix: string
  greetingName: string
  subtitle: string
  bio: string
  view: string
  artstation: string
  development: string
  design: string
  cyberSecurity: string
}> = {
  TR: {
    continue: "Devam",
    backToHome: "Ana Sayfa",
    scatter: "Dağıt",
    collect: "Topla",
    solved: "Çözüldü!",
    skillSet: "Yetenekler",
    selectedWork: "Seçili Çalışmalar",
    portfolio: "Portfolyo",
    getInTouch: "İletişime Geç",
    letsWork: "Birlikte Çalışalım",
    name: "İsim",
    email: "E-posta",
    message: "Mesaj",
    sendMessage: "Gönder",
    sent: "Gönderildi!",
    home: "Ana Sayfa",
    skillsLabel: "Yetenekler",
    portfolioLabel: "Portfolyo",
    contact: "İletişim",
    interactiveDev: "Yazılım Geliştirici & Tasarımcı",
    greetingPrefix: "Merhaba Ben ",
    greetingName: "Anıl!",
    subtitle: "Cyber Security ve Development",
    bio: "Kod, tasarım ve sanatı harmanlayarak ilgi çekici dijital içerikler üretmeyi seviyorum. Oyun geliştirmeden 3D tasarım ve modern web arayüzlerine kadar...",
    view: "Görüntüle",
    artstation: "ArtStation",
    development: "Yazılım",
    design: "Tasarım",
    cyberSecurity: "Siber Güvenlik",
  },
  EN: {
    continue: "Continue",
    backToHome: "Back to Home",
    scatter: "Scatter",
    collect: "Collect",
    solved: "Solved!",
    skillSet: "Skill Set",
    selectedWork: "Selected Work",
    portfolio: "Portfolio",
    getInTouch: "Get in Touch",
    letsWork: "Let's work together",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    sent: "Sent!",
    home: "Home",
    skillsLabel: "Skills",
    portfolioLabel: "Portfolio",
    contact: "Contact",
    interactiveDev: "Developer & Designer",
    greetingPrefix: "Hi, I'm ",
    greetingName: "Anıl!",
    subtitle: "Cyber Security & Development",
    bio: "Coding, design, and art to create immersive digital experiences. From game development to 3D visualizations and modern web interfaces.",
    view: "View",
    artstation: "ArtStation",
    development: "Development",
    design: "Design",
    cyberSecurity: "Cyber Security",
  },
}

// ─── Home section badges ──────────────────────────────────────
export const homeBadges = ["Cyber Security", "Backend", "Frontend", "UI/UX", "Web", "3D"]
