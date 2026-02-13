import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import audacityLogo from "../assets/Audacitylogo.jpg";
import overwatchimage from "../assets/overwatchimage2.webp";
import palworldimage from "../assets/palworld2.webp";
import satisfactoryimage from "../assets/satisfactory.png";
import minecraftimage from "../assets/minecraft.png";
import ffxivimage from "../assets/ffxiv.webp";
import audacityLogoTransparent from "../assets/AudacityLogoTransparent.png";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const menuEntries = [
  {
    id: "overwatch",
    title: "Overwatch",
    tag: "Esports Division",
    path: "/overwatch",
    description: "Roster tracking, team progress, and competition updates.",
    accent: "#f29a2e",
    accentSoft: "rgba(242, 154, 46, 0.22)",
    bgA: "#1f1722",
    bgB: "#0b1627",
    glow: "rgba(242, 154, 46, 0.45)",
    previewOverlay: "rgba(10, 14, 23, 0.52)",
    image: overwatchimage,
  },
  {
    id: "staff",
    title: "Staff & Ranks",
    tag: "Guild Core",
    path: "/staff",
    description: "Current staff roster, open staff positions, and full rank progression.",
    accent: "#b090ff",
    accentSoft: "rgba(176, 144, 255, 0.22)",
    bgA: "#201731",
    bgB: "#10192a",
    glow: "rgba(176, 144, 255, 0.4)",
    previewOverlay: "rgba(14, 11, 22, 0.58)",
    image: audacityLogo,
  },
  {
    id: "ffxiv",
    title: "FFXIV",
    tag: "Raiding Group",
    path: "/ffxiv",
    description: "Static updates, progression targets, and schedules.",
    accent: "#a299ff",
    accentSoft: "rgba(162, 153, 255, 0.22)",
    bgA: "#181a33",
    bgB: "#101b2a",
    glow: "rgba(162, 153, 255, 0.38)",
    previewOverlay: "rgba(12, 11, 22, 0.6)",
    image: ffxivimage,
  },

  
  {
    id: "satisfactory",
    title: "Satisfactory",
    tag: "Factory Ops",
    path: "/satisfactory",
    description: "Layouts, logistics, and automation priorities.",
    accent: "#f3d466",
    accentSoft: "rgba(243, 212, 102, 0.24)",
    bgA: "#312210",
    bgB: "#121e2b",
    glow: "rgba(243, 212, 102, 0.36)",
    previewOverlay: "rgba(16, 14, 9, 0.58)",
    image: satisfactoryimage,
  },
  {
    id: "minecraft",
    title: "Minecraft",
    tag: "Community Build",
    path: "/minecraft",
    description: "Server projects, events, and build showcases.",
    accent: "#90df73",
    accentSoft: "rgba(144, 223, 115, 0.24)",
    bgA: "#182b16",
    bgB: "#13222f",
    glow: "rgba(144, 223, 115, 0.38)",
    previewOverlay: "rgba(10, 16, 9, 0.55)",
    image: minecraftimage,
  },
    {
    id: "palworld",
    title: "Palworld",
    tag: "Survival Squad",
    path: "/palworld",
    description: "Bases, raids, and resource plans for the Palworld team.",
    accent: "#44d9be",
    accentSoft: "rgba(68, 217, 190, 0.24)",
    bgA: "#102d2a",
    bgB: "#0b1d29",
    glow: "rgba(68, 217, 190, 0.4)",
    previewOverlay: "rgba(7, 17, 18, 0.56)",
    image: palworldimage,
  },
  {
    id: "othergames",
    title: "Other Games",
    tag: "Open Lobbies",
    path: "/othergames",
    description: "Side games, one-off events, and community nights.",
    accent: "#f06e81",
    accentSoft: "rgba(240, 110, 129, 0.22)",
    bgA: "#2e1420",
    bgB: "#111a29",
    glow: "rgba(240, 110, 129, 0.4)",
    previewOverlay: "rgba(20, 10, 14, 0.58)",
    image: audacityLogo,
  },
];

export default function Homepage() {
  const [activeId, setActiveId] = useState(menuEntries[0].id);

  const activeEntry = useMemo(
    () => menuEntries.find((entry) => entry.id === activeId) || menuEntries[0],
    [activeId]
  );

  const shellStyle = {
    "--menu-accent": activeEntry.accent,
    "--menu-accent-soft": activeEntry.accentSoft,
    "--menu-bg-a": activeEntry.bgA,
    "--menu-bg-b": activeEntry.bgB,
    "--menu-glow": activeEntry.glow,
    "--menu-overlay": activeEntry.previewOverlay,
    "--menu-image": `url(${activeEntry.image})`,
  };

  return (
    <main className="menu-shell" style={shellStyle}>
      <section className="menu-panel">
        <div className="menu-banner">
          <img src={audacityLogoTransparent} alt="Audacity logo" className="menu-banner-logo" />
          <div className="menu-banner-copy">
            <p className="menu-kicker">Audacity</p>
            <h1 className="menu-title">Welcome to Audacity</h1>
            <p className="menu-subtitle">Choose a game hub to open its dedicated page.</p>
          </div>
        </div>

        <nav className="menu-list" aria-label="Game pages">
          {menuEntries.map((entry) => {
            const isActive = entry.id === activeEntry.id;

            return (
              <Link
                key={entry.id}
                to={entry.path}
                className={`menu-item${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActiveId(entry.id)}
                onFocus={() => setActiveId(entry.id)}
              >
                <span className="menu-item-tag">{entry.tag}</span>
                <span className="menu-item-title">{entry.title}</span>
              </Link>
            );
          })}
        </nav>

        <a className="discord-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
          Join Our Discord
        </a>
      </section>

      <section className="preview-panel" aria-live="polite">
        <div className="preview-card">
          <p className="preview-tag">{activeEntry.tag}</p>
          <h2>{activeEntry.title}</h2>
          <p>{activeEntry.description}</p>
          <Link className="launch-link" to={activeEntry.path}>
            Open {activeEntry.title}
          </Link>
        </div>
      </section>
    </main>
  );
}
