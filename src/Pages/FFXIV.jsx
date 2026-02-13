import { Link } from "react-router-dom";
import ffxivShot from "../assets/ffxiv.webp";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const raidTracks = [
  {
    title: "Savage Group",
    status: "Active",
    description:
      "Our core raid team focuses on savage progression, consistency, and improving together through review and repetition.",
    points: ["Scheduled progression", "Role refinement", "Mechanic consistency"],
  },
  {
    title: "Ultimate Preparation",
    status: "Starting Soon",
    description:
      "We are preparing to begin ultimate content with a disciplined practice structure and clear long-term goals.",
    points: ["Roster planning", "Execution drills", "Endurance progression"],
  },
];

const communityActivities = [
  {
    title: "New Player Support",
    text: "We help new players through story quests, unlock paths, and older content so they can catch up without pressure.",
  },
  {
    title: "Legacy Content Runs",
    text: "We regularly revisit older extremes and savage tiers for clears, mounts, and relaxed challenge nights.",
  },
  {
    title: "Eorzea GeoGuesser",
    text: "We run an Eorzea GeoGuesser game with a Discord scoreboard for weekly bragging rights and friendly rivalry.",
  },
];

const galleryPlaceholders = Array.from({ length: 6 }, (_, index) => ({
  id: `ff-shot-${index + 1}`,
  image: ffxivShot,
}));

export default function FFXIV() {
  return (
    <main className="ff-page">
      <section className="ff-hero" style={{ "--ff-hero-image": `url(${ffxivShot})` }}>
        <div className="ff-hero-copy">
          <p className="ff-kicker">Audacity Eorzea Division</p>
          <h1>Final Fantasy XIV</h1>
          <p>
            A small Free Company with a focused raid culture and a supportive social core. We push challenging
            content while making sure new players always have a way in.
          </p>
          <div className="ff-hero-actions">
            <a className="ff-button" href="#raiding">
              Raid Overview
            </a>
            <a className="ff-button ff-button-ghost" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Join Via Discord
            </a>
          </div>
        </div>
      </section>

      <section className="ff-status-strip" aria-label="FC location">
        <p>Free Company: Light Data Center, Odin</p>
        <span>Small community, structured progression, and consistent support for new and returning players.</span>
      </section>

      <section className="ff-section" id="raiding">
        <div className="ff-section-head">
          <p>Raiding</p>
          <h2>Savage Now, Ultimates Next</h2>
        </div>

        <div className="ff-raid-grid">
          {raidTracks.map((track) => (
            <article className="ff-raid-card" key={track.title}>
              <p className="ff-raid-title">{track.title}</p>
              <span className={`ff-status-badge${track.status === "Active" ? " is-active" : ""}`}>
                {track.status}
              </span>
              <p>{track.description}</p>
              <ul>
                {track.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ff-section">
        <div className="ff-section-head">
          <p>Community</p>
          <h2>More Than Raid Night</h2>
        </div>
        <div className="ff-activity-grid">
          {communityActivities.map((item) => (
            <article className="ff-activity-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ff-section" id="gallery">
        <div className="ff-section-head ff-section-head-row">
          <div>
            <p>Screenshots</p>
            <h2>FC Gallery</h2>
          </div>
          <span className="ff-gallery-note">Placeholders until new screenshots are added</span>
        </div>

        <div className="ff-gallery-grid">
          {galleryPlaceholders.map((shot) => (
            <figure className="ff-gallery-card" key={shot.id}>
              <img src={shot.image} alt="FFXIV gallery placeholder" loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="ff-section ff-join-section" id="join">
        <div>
          <p className="ff-kicker">Join Us</p>
          <h2>All Recruitment & Event Info Is In Discord</h2>
          <p className="ff-copy">
            Raid coordination, Free Company access, GeoGuesser scoreboard tracking, and event details are
            all managed through Discord.
          </p>
        </div>
        <div className="ff-join-actions">
          <a className="ff-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="ff-button ff-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
