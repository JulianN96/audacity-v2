import { Navigate, Link, useParams } from "react-router-dom";
import { getOverwatchTeamBySlug } from "../data/overwatchTeams";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const getInitials = (value, fallback = "?") => {
  const text = String(value || "").trim();

  if (!text) {
    return fallback;
  }

  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return fallback;
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

export default function OverwatchTeam() {
  const { teamSlug } = useParams();
  const team = getOverwatchTeamBySlug(teamSlug || "");

  if (!team) {
    return <Navigate to="/overwatch" replace />;
  }

  const rosterRows = [
    { role: "Tank", player: team.roster.tank, slotType: "core", avatarTone: "tank" },
    { role: "DPS", player: team.roster.dps, slotType: "core", avatarTone: "dps" },
    { role: "DPS", player: team.roster.dps2, slotType: "core", avatarTone: "dps" },
    { role: "Support", player: team.roster.support, slotType: "core", avatarTone: "support" },
    { role: "Support", player: team.roster.support2, slotType: "core", avatarTone: "support" },
    ...team.roster.substitutes.map((sub) => ({
      role: "Substitute",
      player: sub,
      slotType: "sub",
      avatarTone: "sub",
    })),
  ];

  const staffRows = [
    { title: "Manager", name: team.manager, avatarTone: "manager" },
    { title: "Coach", name: team.coach, avatarTone: "coach" },
    { title: "Captain", name: team.captain, avatarTone: "captain" },
  ];

  const missingPattern = /(trial|tbd|\?)/i;
  const openRoles = rosterRows
    .filter((row) => row.slotType === "core" && missingPattern.test(row.player))
    .map((row) => row.role);
  const uniqueOpenRoles = [...new Set(openRoles)];
  const activeCoreCount = rosterRows.filter(
    (row) => row.slotType === "core" && !missingPattern.test(row.player)
  ).length;

  return (
    <main className="ow-team-page" style={{ "--ow-accent": team.accent, "--ow-accent-soft": team.accentSoft }}>
      <section className="ow-team-hero">
        <div className="ow-team-hero-logo-shell">
          <img src={team.logo} alt={`${team.shortName} logo`} className="ow-team-hero-logo" />
        </div>
        <div className="ow-team-hero-copy">
          <p className="ow-kicker">Overwatch Team</p>
          <h1>{team.name}</h1>
          <div className="ow-team-badges">
            <span>{team.region}</span>
            <span>{team.elo}</span>
            <span>{activeCoreCount} / 5 Active</span>
          </div>
          <p className="ow-team-subhead">
            Competitive roster focused on structured growth, weekly review cycles, and coordinated
            team progression.
          </p>
        </div>
      </section>

      <section className="ow-team-layout">
        <aside className="ow-team-stats">
          <h2>Team Stats</h2>
          <div className="ow-stat-row">
            <span>Region</span>
            <strong>{team.region}</strong>
          </div>
          <div className="ow-stat-row">
            <span>Rating</span>
            <strong>{team.elo}</strong>
          </div>
          <div className="ow-stat-row">
            <span>Core Roster</span>
            <strong>{activeCoreCount}/5</strong>
          </div>
          <div className="ow-stat-row">
            <span>Substitutes</span>
            <strong>{team.roster.substitutes.length || "None"}</strong>
          </div>
        </aside>

        <div className="ow-team-content">
          <article className={`ow-team-recruit ${uniqueOpenRoles.length ? "is-open" : "is-closed"}`}>
            <div className="ow-team-recruit-copy">
              <p className="ow-team-recruit-title">
                {uniqueOpenRoles.length ? "We're Recruiting" : "Roster Currently Stable"}
              </p>
              <p>
                {uniqueOpenRoles.length
                  ? `${uniqueOpenRoles.length} role${uniqueOpenRoles.length > 1 ? "s" : ""} currently open.`
                  : "No urgent openings at the moment, but applications are still welcome."}
              </p>
            </div>
            <a className="ow-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Apply Now
            </a>
            {uniqueOpenRoles.length > 0 && (
              <div className="ow-team-recruit-tags">
                {uniqueOpenRoles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
            )}
          </article>

          <article className="ow-team-panel">
            <div className="ow-team-panel-head">
              <h2>Staff</h2>
            </div>
            <div className="ow-staff-list">
              {staffRows.map((staff) => (
                <div className="ow-staff-card" key={staff.title}>
                  <p>{staff.title}</p>
                  <div className="ow-member-line">
                    <span className={`ow-member-avatar ow-tone-${staff.avatarTone}`}>
                      {getInitials(staff.name, staff.title[0])}
                    </span>
                    <strong>{staff.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="ow-team-panel">
            <div className="ow-team-panel-head">
              <h2>Roster</h2>
            </div>
            <div className="ow-roster-list">
              {rosterRows.map((row, index) => (
                <div className="ow-roster-card" key={`${row.role}-${index}`}>
                  <div className="ow-member-line">
                    <span className={`ow-member-avatar ow-tone-${row.avatarTone}`}>
                      {getInitials(row.player, row.role[0])}
                    </span>
                    <strong>{row.player}</strong>
                  </div>
                  <span className={`ow-roster-role${row.slotType === "sub" ? " is-sub" : ""}`}>
                    {row.role}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <div className="ow-team-actions">
        <Link to="/overwatch" className="ow-button ow-button-ghost">
          Back To Overwatch
        </Link>
        <Link to="/" className="ow-button">
          Back To Main Menu
        </Link>
      </div>
    </main>
  );
}
