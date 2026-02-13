import { Link } from "react-router-dom";
import palworldHero from "../assets/palworld.webp";
import palworldShot from "../assets/palworld2.webp";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const playHighlights = [
  "Open-world exploration with shared progression",
  "Base building, automation, and resource logistics",
  "Pal collection, breeding, and combat team tuning",
  "Co-op boss attempts and world event runs",
];

const gameplayFocus = [
  {
    title: "Progression",
    text: "Players can jump in at different paces and still contribute through exploration, crafting, farming, or combat roles.",
  },
  {
    title: "Base Development",
    text: "We treat base growth as a collaborative project, starting practical and scaling into cleaner, optimized production layouts.",
  },
  {
    title: "Community Sessions",
    text: "Regular group sessions for boss hunts, capture runs, and gear progression keep both new and veteran players involved.",
  },
];

export default function Palworld() {
  return (
    <main className="pw-page">
      <section className="pw-hero" style={{ "--pw-hero-image": `url(${palworldHero})` }}>
        <div className="pw-hero-copy">
          <p className="pw-kicker">Audacity Survival Division</p>
          <h1>Palworld</h1>
          <p>
            One shared world, always online. Build your base, train your team, and progress at your own
            pace in a server designed for both casual and committed players.
          </p>
          <div className="pw-hero-actions">
            <a className="pw-button" href="#server">
              Server Info
            </a>
            <a className="pw-button pw-button-ghost" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Join Via Discord
            </a>
          </div>
        </div>
      </section>

      <section className="pw-section" id="server">
        <div className="pw-section-head">
          <p>Server</p>
          <h2>Single Persistent World</h2>
        </div>

        <article className="pw-server-card">
          <div className="pw-server-main">
            <p className="pw-server-title">Audacity Palworld Server</p>
            <h3>Online 24/7</h3>
            <p>
              We run one Palworld server with continuous uptime and the latest game updates so everyone
              can play without worrying about restart windows or outdated builds.
            </p>
            <div className="pw-server-pills">
              <span>24/7 Uptime</span>
              <span>Latest Updates</span>
              <span>Discord Managed Access</span>
            </div>
          </div>
          <figure className="pw-server-image">
            <img src={palworldShot} alt="Palworld base preview" loading="lazy" />
          </figure>
        </article>
      </section>

      <section className="pw-section">
        <div className="pw-section-head">
          <p>Game Info</p>
          <h2>What To Expect</h2>
        </div>
        <p className="pw-copy">
          Our Palworld setup leans into long-term co-op progression. Players can focus on gathering,
          construction, combat, breeding, or logistics while still feeding into shared goals.
        </p>

        <div className="pw-highlight-grid">
          {gameplayFocus.map((item) => (
            <article className="pw-highlight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="pw-feature-tags">
          {playHighlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="pw-section pw-join-section" id="join">
        <div>
          <p className="pw-kicker">Join Us</p>
          <h2>Join Details Are Shared In Discord</h2>
          <p className="pw-copy">
            To protect the private server, direct connection details are posted only in our Discord. Join
            the community and we will get you set up quickly.
          </p>
        </div>
        <div className="pw-join-actions">
          <a className="pw-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="pw-button pw-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
