import { Link } from "react-router-dom";
import shot1 from "../assets/satisfactory/satisfactoryscreenshot1.png";
import shot2 from "../assets/satisfactory/satisfactoryscreenshot2.png";
import shot3 from "../assets/satisfactory/satisfactoryscreenshot3.png";
import shot4 from "../assets/satisfactory/satisfactoryscreenshot4.png";
import shot5 from "../assets/satisfactory/satisfactoryscreenshot5.png";
import shot6 from "../assets/satisfactory/satisfactoryscreenshot6.png";
import shot7 from "../assets/satisfactory/satisfactoryscreenshot7.png";
import shot8 from "../assets/satisfactory/satisfactoryscreenshot8.png";
import shot9 from "../assets/satisfactory/satisfactoryscreenshot9.png";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const serverStages = [
  {
    name: "Server 01",
    subtitle: "Onboarding World",
    tier: "Tier 1-3",
    description:
      "Perfect for new players learning foundations, logistics basics, and first automation loops.",
    focus: ["Starter base planning", "Power setup", "Early factory flow"],
  },
  {
    name: "Server 02",
    subtitle: "Expansion World",
    tier: "Tier 4-6",
    description:
      "Mid-game scaling with rail, larger factories, and cleaner production architecture.",
    focus: ["Modular production", "Transport planning", "Efficiency upgrades"],
  },
  {
    name: "Server 03",
    subtitle: "Megabase World",
    tier: "Tier 7-9",
    description:
      "Late-game optimization and huge superstructures for high-throughput endgame production.",
    focus: ["High-volume systems", "Superstructure builds", "Endgame optimization"],
  },
];

const galleryShots = [shot2, shot3, shot4, shot5, shot6, shot7, shot8, shot9];

export default function Satisfactory() {
  return (
    <main className="sat-page">
      <section className="sat-hero" style={{ "--sat-hero-image": `url(${shot1})` }}>
        <div className="sat-hero-copy">
          <p className="sat-kicker">Audacity Industry Division</p>
          <h1>Satisfactory</h1>
          <p>
            We build from small starter outposts to massive superstructures. Whether you are placing
            your first miner or tuning a late-game megafactory, there is a place for you here.
          </p>
          <div className="sat-hero-actions">
            <a className="sat-button" href="#servers">
              Explore Servers
            </a>
            <a className="sat-button sat-button-ghost" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Join On Discord
            </a>
          </div>
        </div>
      </section>

      <section className="sat-section" id="about">
        <div className="sat-section-head">
          <p>About The Group</p>
          <h2>Small Bases To Giant Industrial Cities</h2>
        </div>
        <p className="sat-copy">
          Our Satisfactory community focuses on steady progression, collaborative building, and large
          long-term projects. We start lean, iterate fast, and gradually scale into sprawling factory
          networks that are both efficient and fun to build together.
        </p>
      </section>

      <section className="sat-section" id="servers">
        <div className="sat-section-head sat-section-head-row">
          <div>
            <p>Servers</p>
            <h2>3 Worlds, All Experience Levels</h2>
          </div>
          <span className="sat-tier-range">Tier 1 through Tier 9</span>
        </div>

        <div className="sat-servers-grid">
          {serverStages.map((server) => (
            <article className="sat-server-card" key={server.name}>
              <p className="sat-server-name">{server.name}</p>
              <h3>{server.subtitle}</h3>
              <span className="sat-tier-pill">{server.tier}</span>
              <p>{server.description}</p>
              <ul>
                {server.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sat-section" id="gallery">
        <div className="sat-section-head">
          <p>Screenshots</p>
          <h2>Factory Showcase</h2>
        </div>
        <div className="sat-gallery-grid">
          {galleryShots.map((image, index) => (
            <figure className="sat-gallery-card" key={`sat-shot-${index + 2}`}>
              <img src={image} alt={`Satisfactory factory screenshot ${index + 2}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="sat-section sat-join-section" id="join">
        <div>
          <p className="sat-kicker">Join Us</p>
          <h2>Access Is Managed Through Discord</h2>
          <p className="sat-copy">
            All server join details are shared privately in Discord. This keeps access controlled and
            makes it easier for us to onboard players into the right progression world.
          </p>
        </div>
        <div className="sat-join-actions">
          <a className="sat-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="sat-button sat-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
