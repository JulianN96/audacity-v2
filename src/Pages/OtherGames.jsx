import { Link } from "react-router-dom";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const sideGames = [
  {
    title: "Warframe",
    status: "Small Presence",
    description:
      "A small group still checks in for new content drops, builds, and occasional co-op sessions.",
  },
  {
    title: "SWTOR",
    status: "Low Activity",
    description:
      "We keep a light footprint here for returning players and nostalgia runs when people feel like jumping back in.",
  },
  {
    title: "LOTRO",
    status: "Legacy Home",
    description:
      "Audacity started in LOTRO. We have mostly drifted away, but it remains a core part of our guild history.",
  },
  {
    title: "Planetside 2",
    status: "Occasional Ops",
    description:
      "Drop-in sessions happen when enough people want large-scale battles and coordinated squad chaos.",
  },
  {
    title: "ARK",
    status: "Servers Paused",
    description:
      "We previously hosted our own ARK servers, but recent update issues forced us to disable them for now.",
  },
  {
    title: "REPO",
    status: "Frequent Nights",
    description:
      "We run regular REPO nights for the laughs, social vibes, and pure chaos factor.",
  },
  {
    title: "Helldivers",
    status: "Community Drops",
    description:
      "Small squads jump in for co-op operations when players want fast-paced mission nights.",
  },
];

export default function OtherGames() {
  return (
    <main className="og-page">
      <section className="og-hero">
        <div className="og-hero-copy">
          <p className="og-kicker">Audacity Community</p>
          <h1>Other Games</h1>
          <p>
            These are games where we still have a small guild footprint, rotating interest, or occasional
            event nights. Not every game is always active, but the door is always open.
          </p>
        </div>
      </section>

      <section className="og-section">
        <div className="og-section-head">
          <p>Community List</p>
          <h2>Side-Game Hubs</h2>
        </div>

        <div className="og-grid">
          {sideGames.map((game) => (
            <article className="og-card" key={game.title}>
              <div className="og-image-placeholder" aria-label="Screenshot placeholder">
                <span>Screenshot Coming Soon</span>
              </div>
              <div className="og-card-body">
                <p className="og-status">{game.status}</p>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="og-section og-join">
        <div>
          <p className="og-kicker">Join In</p>
          <h2>Plans And Pings Live In Discord</h2>
          <p className="og-copy">
            Activity for these games is coordinated through Discord. If you want to revive a game night,
            start one, or rally players for a weekend session, that is the place to do it.
          </p>
        </div>
        <div className="og-actions">
          <a className="og-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="og-button og-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
