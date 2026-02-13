import { Link } from "react-router-dom";
import minecraftShot from "../assets/minecraft.png";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const minecraftServers = [
  {
    id: "woa",
    name: "World of Adventure",
    version: "Minecraft 1.20.1",
    status: "Legacy Content Build",
    activeDevelopment: false,
    description:
      "Story-heavy custom experience featuring world bosses, unique crafting systems, and hand-built progression arcs.",
    highlights: [
      "Narrative progression",
      "Boss encounters",
      "Unique crafting systems",
      "Long-term custom world",
    ],
  },
  {
    id: "create-together",
    name: "Create Together",
    version: "Minecraft 1.21",
    status: "Actively Developed",
    activeDevelopment: true,
    description:
      "Our forward-looking server with newer updates, modern mod integrations, and active feature development.",
    highlights: [
      "Cutting-edge mod updates",
      "Regular content iteration",
      "Modern automation focus",
      "Community-driven roadmap",
    ],
  },
];

const notableMods = [
  "Create",
  "Tetra",
  "Botania",
  "Alex's Caves",
  "Alex's Mobs",
  "Dungeons and Taverns",
  "Thermal Expansion",
  "...and many more",
];

const placeholderGallery = Array.from({ length: 6 }, (_, index) => ({
  id: `mc-shot-${index + 1}`,
  image: minecraftShot,
}));

export default function Minecraft() {
  return (
    <main className="mc-page">
      <section className="mc-hero" style={{ "--mc-hero-image": `url(${minecraftShot})` }}>
        <div className="mc-hero-copy">
          <p className="mc-kicker">Audacity Modded Division</p>
          <h1>Minecraft</h1>
          <p>
            Two custom-built Audacity modpacks. Two very different worlds. One shared goal: long-term,
            high-quality multiplayer progression for every type of player.
          </p>
          <div className="mc-hero-actions">
            <a className="mc-button" href="#servers">
              Compare Servers
            </a>
            <a className="mc-button mc-button-ghost" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Join Via Discord
            </a>
          </div>
        </div>
      </section>

      <section className="mc-status-strip" aria-label="Server availability">
        <p>Both worlds are online 24/7</p>
        <span>Server join details are managed in Discord for privacy and controlled access.</span>
      </section>

      <section className="mc-section" id="servers">
        <div className="mc-section-head">
          <p>Servers</p>
          <h2>Two Distinct Experiences</h2>
        </div>

        <div className="mc-server-grid">
          {minecraftServers.map((server) => (
            <article className="mc-server-card" key={server.id}>
              <p className="mc-server-version">{server.version}</p>
              <h3>{server.name}</h3>
              <span className={`mc-dev-badge${server.activeDevelopment ? " is-live" : ""}`}>
                {server.status}
              </span>
              <p>{server.description}</p>
              <ul>
                {server.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mc-section">
        <div className="mc-section-head">
          <p>World of Adventure</p>
          <h2>Notable Mod Stack</h2>
        </div>
        <p className="mc-copy">
          World of Adventure is no longer in active development, but it remains one of our most feature-rich
          custom packs with deep progression design and tons of handcrafted systems.
        </p>
        <div className="mc-mod-cloud">
          {notableMods.map((mod) => (
            <span key={mod}>{mod}</span>
          ))}
        </div>
      </section>

      <section className="mc-section" id="gallery">
        <div className="mc-section-head mc-section-head-row">
          <div>
            <p>Screenshots</p>
            <h2>Build Gallery</h2>
          </div>
          <span className="mc-gallery-note">More screenshots coming soon</span>
        </div>

        <div className="mc-gallery-grid">
          {placeholderGallery.map((shot) => (
            <figure className="mc-gallery-card" key={shot.id}>
              <img src={shot.image} alt="Minecraft build preview placeholder" loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="mc-section mc-join-section" id="join">
        <div>
          <p className="mc-kicker">Join Us</p>
          <h2>Apply Through Discord</h2>
          <p className="mc-copy">
            To protect private infrastructure, all connection details and onboarding steps are handled in Discord.
            Join the community, pick your server, and we will help you get set up quickly.
          </p>
        </div>
        <div className="mc-join-actions">
          <a className="mc-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="mc-button mc-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
