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
    { id: "react", name: "React", color: "#61DAFB", icon: "Re", row: 0, col: 0 },
    { id: "java", name: "Java", color: "#ED8B00", icon: "Ja", row: 0, col: 1 },
    { id: "unity", name: "Unity", color: "#CCCCCC", icon: "Un", row: 0, col: 2 },
    { id: "threejs", name: "Three.js", color: "#049EF4", icon: "3D", row: 0, col: 3 },
    { id: "typescript", name: "TypeScript", color: "#3178C6", icon: "TS", row: 1, col: 0 },
    { id: "nextjs", name: "Next.js", color: "#CCCCCC", icon: "Nx", row: 1, col: 1 },
    { id: "nodejs", name: "Node.js", color: "#68A063", icon: "No", row: 1, col: 2 },
    { id: "python", name: "Python", color: "#3776AB", icon: "Py", row: 1, col: 3 },
  ] as SkillPiece[],

  design: [
    { id: "figma", name: "Figma", color: "#F24E1E", icon: "Fi", row: 0, col: 0 },
    { id: "blender", name: "Blender", color: "#EA7600", icon: "Bl", row: 0, col: 1 },
    { id: "photoshop", name: "Photoshop", color: "#31A8FF", icon: "Ps", row: 0, col: 2 },
    { id: "krita", name: "Krita", color: "#3BABFF", icon: "Kr", row: 1, col: 0 },
    { id: "illustrator", name: "Illustrator", color: "#FF9A00", icon: "Ai", row: 1, col: 1 },
    { id: "substance", name: "Substance", color: "#82C800", icon: "Su", row: 1, col: 2 },
  ] as SkillPiece[],

  cyber: [
    { id: "kali", name: "Kali Linux", color: "#557C94", icon: "Ka", row: 0, col: 0 },
    { id: "burp", name: "Burp Suite", color: "#FF6633", icon: "Bu", row: 0, col: 1 },
    { id: "wireshark", name: "Wireshark", color: "#1679A7", icon: "Ws", row: 0, col: 2 },
    { id: "nmap", name: "Nmap", color: "#4682B4", icon: "Nm", row: 0, col: 3 },
    { id: "linux", name: "Linux", color: "#FCC624", icon: "Li", row: 1, col: 0 },
    { id: "py-cyber", name: "Python", color: "#3776AB", icon: "Py", row: 1, col: 1 },
    { id: "owasp", name: "OWASP", color: "#CC2222", icon: "Ow", row: 1, col: 2 },
    { id: "metasploit", name: "Metasploit", color: "#2596CD", icon: "Ms", row: 1, col: 3 },
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
}

export interface ProjectRow {
  category: string
  categoryTR: string
  projects: Project[]
}

export const portfolioRows: ProjectRow[] = [
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
