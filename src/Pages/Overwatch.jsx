import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import overwatchHero from "../assets/overwatchimage2.webp";
import { overwatchTeams } from "../data/overwatchTeams";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

export default function Overwatch() {
  const [activeSlug, setActiveSlug] = useState(overwatchTeams[0]?.slug || "");
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 16, y: 16 });
  const teamArenaRef = useRef(null);

  const activeTeam = useMemo(
    () => overwatchTeams.find((team) => team.slug === activeSlug) || overwatchTeams[0],
    [activeSlug]
  );

  const shellStyle = {
    "--ow-accent": activeTeam?.accent || "#f49b3a",
    "--ow-accent-soft": activeTeam?.accentSoft || "rgba(244, 155, 58, 0.24)",
    "--ow-hero-image": `url(${overwatchHero})`,
  };

  const updatePreviewPosition = (event) => {
    const arena = teamArenaRef.current;

    if (!arena) {
      return;
    }

    const rect = arena.getBoundingClientRect();
    const cardWidth = 340;
    const cardHeight = 360;
    const offset = 18;
    const nextX = event.clientX - rect.left + offset;
    const nextY = event.clientY - rect.top + offset;
    const minPos = 10;
    const maxX = Math.max(minPos, rect.width - cardWidth - minPos);
    const maxY = Math.max(minPos, rect.height - cardHeight - minPos);
    const x = Math.min(Math.max(nextX, minPos), maxX);
    const y = Math.min(Math.max(nextY, minPos), maxY);

    setPreviewPosition((current) => {
      if (current.x === x && current.y === y) {
        return current;
      }

      return { x, y };
    });
  };

  const centerPreview = () => {
    const arena = teamArenaRef.current;

    if (!arena) {
      return;
    }

    const rect = arena.getBoundingClientRect();
    const cardWidth = 340;
    const cardHeight = 360;
    const minPos = 10;

    setPreviewPosition({
      x: Math.max(minPos, (rect.width - cardWidth) / 2),
      y: Math.max(minPos, (rect.height - cardHeight) / 2),
    });
  };

  const handleTileMouseEnter = (team, event) => {
    setActiveSlug(team.slug);
    setPreviewVisible(true);
    updatePreviewPosition(event);
  };

  const handleTileFocus = (team) => {
    setActiveSlug(team.slug);
    setPreviewVisible(true);
    centerPreview();
  };

  const playerRows = activeTeam
    ? [
        { label: "Tank", value: activeTeam.roster.tank },
        { label: "DPS", value: activeTeam.roster.dps },
        { label: "DPS", value: activeTeam.roster.dps2 },
        { label: "Support", value: activeTeam.roster.support },
        { label: "Support", value: activeTeam.roster.support2 },
      ]
    : [];

  return (
    <main className="ow-page" style={shellStyle}>
      <section className="ow-hero">
        <div className="ow-hero-copy">
          <p className="ow-kicker">Audacity Esports</p>
          <h1>Overwatch Division</h1>
          <p>
            Structured team development with a community-first culture. Explore each roster,
            track progression, and find where you fit in.
          </p>
          <div className="ow-hero-actions">
            <a className="ow-button" href="#teams">
              View Teams
            </a>
            <a className="ow-button ow-button-ghost" href="#join-us">
              Join Us
            </a>
          </div>
        </div>
      </section>

      <section className="ow-section" id="about-us">
        <div className="ow-section-head">
          <p>About Us</p>
          <h2>Built To Improve Together</h2>
        </div>
        <p className="ow-body-text">
          The Overwatch division focuses on consistency, coaching, and player growth. We run multiple
          rosters with clear skill paths, regular scrims, and a shared review culture so players can
          progress in a competitive environment without losing the social side of the community.
        </p>
      </section>

      <section className="ow-section" id="teams">
        <div className="ow-section-head ow-section-head-row">
          <div>
            <p>Teams</p>
            <h2>Active Rosters</h2>
          </div>
          <span className="ow-team-count">{overwatchTeams.length} teams</span>
        </div>
        <p className="ow-body-text ow-team-intro">
          Our teams that we're actively training and competing with. Each team has its own page with details on roster, staff, and progression goals.
        </p>

        <div
          className="ow-team-arena"
          ref={teamArenaRef}
          onMouseMove={(event) => {
            if (isPreviewVisible) {
              updatePreviewPosition(event);
            }
          }}
          onMouseLeave={() => setPreviewVisible(false)}
        >
          <div className="ow-team-tiles" role="list" aria-label="Overwatch teams">
            {overwatchTeams.map((team) => {
              const isActive = team.slug === activeTeam.slug;

              return (
                <Link
                  key={team.id}
                  to={`/overwatch/team/${team.slug}`}
                  className={`ow-team-tile${isActive ? " is-active" : ""}`}
                  style={{ "--tile-accent": team.accent, "--tile-accent-soft": team.accentSoft }}
                  onMouseEnter={(event) => handleTileMouseEnter(team, event)}
                  onFocus={() => handleTileFocus(team)}
                >
                  <div className="ow-team-logo-shell">
                    <img src={team.logo} alt="Team logo" className="ow-team-logo" />
                  </div>
                  <p className="ow-team-name">{team.shortName}</p>
                  <span className="ow-team-level">
                    {team.region} | {team.elo}
                  </span>
                </Link>
              );
            })}
          </div>

          {activeTeam && (
            <article
              className={`ow-floating-preview${isPreviewVisible ? " is-visible" : ""}`}
              style={{ "--preview-x": `${previewPosition.x}px`, "--preview-y": `${previewPosition.y}px` }}
              aria-live="polite"
              aria-hidden={!isPreviewVisible}
            >
              <p className="ow-preview-tag">Team Preview</p>
              <h3>{activeTeam.name}</h3>
              <div className="ow-preview-pills">
                <span>{activeTeam.region}</span>
                <span>{activeTeam.elo}</span>
              </div>
              <div className="ow-preview-block">
                <h4>Staff</h4>
                <p>Manager: {activeTeam.manager}</p>
                <p>Coach: {activeTeam.coach}</p>
                <p>Captain: {activeTeam.captain}</p>
              </div>
              <div className="ow-preview-block">
                <h4>Players</h4>
                <ul>
                  {playerRows.map((row, index) => (
                    <li key={`${row.label}-${index}`}>
                      <span>{row.value}</span>
                      <small>{row.label}</small>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="ow-preview-foot">Select tile to open full details</p>
            </article>
          )}
        </div>

        {activeTeam && (
          <article className="ow-team-preview-mobile">
            <p className="ow-preview-tag">Active Team</p>
            <h3>{activeTeam.name}</h3>
            <p>
              {activeTeam.region} | {activeTeam.elo}
            </p>
            <Link className="ow-detail-link" to={`/overwatch/team/${activeTeam.slug}`}>
              Open Team Page
            </Link>
          </article>
        )}
      </section>

      <section className="ow-section" id="join-us">
        <div className="ow-section-head">
          <p>Join Us</p>
          <h2>Recruitment Open</h2>
        </div>
        <p className="ow-body-text">
          We are actively looking for players, coaches, analysts, and support staff. Join the
          Discord, introduce yourself, and our esports leads will point you to trials or open roles.
        </p>
        <div className="ow-join-actions">
          <a className="ow-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Join Discord
          </a>
          <Link className="ow-button ow-button-ghost" to="/">
            Back To Game Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
