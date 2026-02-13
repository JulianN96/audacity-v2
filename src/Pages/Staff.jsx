import { Link } from "react-router-dom";
import staffRecords from "../data/staff.json";

const DISCORD_INVITE_URL = "https://discord.gg/QXnpg2gkKJ";

const rankGroups = [
  {
    title: "Guild Leadership",
    summary: "Top-level command and strategic direction across Audacity.",
    roles: [
      {
        rank: "Commander General👑",
        tone: "purple",
        heading: "Leader of Audacity",
        details: ["Defines vision, standards, and long-term community direction."],
      },
      {
        rank: "Commander🥇🥇",
        tone: "gold",
        heading: "In-Game Leaders - Corps Leaders",
        details: [
          "Leads operations in assigned games and manages game-specific command.",
          "Assigned by the Commander General.",
          "Can be lost over time if activity drops.",
        ],
      },
    ],
  },
  {
    title: "Officers",
    summary: "Cross-game officers with either role ownership or battalion leadership.",
    roles: [
      {
        rank: "Major🥇",
        tone: "red",
        heading: "Role Managers",
        details: [
          "Officer role focused on specific organizational duties.",
          "Examples: Troop Administration Officer, Provisions Officer, Community Officer.",
        ],
      },
      {
        rank: "Captain🥈",
        tone: "red",
        heading: "Battalion Leaders",
        details: [
          "Leads 3 platoons (up to 96 members) across the guild structure.",
        ],
      },
    ],
  },
  {
    title: "Platoon Leaders",
    summary: "Leadership ranks managing squads and delegated operational responsibilities.",
    roles: [
      {
        rank: "Lieutenant",
        tone: "blue",
        heading: "Platoon Leaders",
        details: [
          "Leads 4 squads in their game section.",
          "Can be lost if the member becomes inactive.",
        ],
      },
      {
        rank: "2nd Lieutenant",
        tone: "blue",
        heading: "Role Specific Duties",
        details: [
          "Specialized responsibilities under a Major.",
          "Examples: Base of Operations Coordinator, Communications Specialist, Recruitment Specialist.",
        ],
      },
    ],
  },
  {
    title: "Squad Leaders",
    summary: "Small-unit leadership and practical role support.",
    roles: [
      {
        rank: "Sergeant Major🔰",
        tone: "green",
        heading: "Squad Leaders",
        details: [
          "Represents and leads a smaller group (up to 7 players).",
          "Reports directly to a Lieutenant.",
        ],
      },
      {
        rank: "Sergeant🔰",
        tone: "green",
        heading: "Second In Command",
        details: ["Acts as the squad second-in-command under a Sergeant Major."],
      },
      {
        rank: "Corporal",
        tone: "green",
        heading: "Role Specific Duties",
        details: [
          "Supports simple role-based duties under a Major.",
          "Examples: Uniform Specialist, Crafting Specialist.",
        ],
      },
    ],
  },
  {
    title: "Player Roles",
    summary: "Progression-based member roles determined by community tenure.",
    roles: [
      { rank: "Trooper 1st Class", tone: "white", heading: "Member for 6+ months", details: [] },
      { rank: "Trooper 2nd Class", tone: "white", heading: "Member for 2+ months", details: [] },
      { rank: "Trooper 3rd Class", tone: "white", heading: "Member for 2+ weeks", details: [] },
      { rank: "Cadet", tone: "white", heading: "New member of Audacity", details: [] },
      { rank: "Guest", tone: "grey", heading: "Friends of Audacity", details: [] },
    ],
  },
];

const getInitials = (value) => {
  const text = String(value || "").trim();

  if (!text) {
    return "??";
  }

  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "??";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const isTbdEntry = (entry) => String(entry.name || "").trim().toLowerCase() === "tbd";

export default function Staff() {
  const currentStaff = staffRecords.filter((entry) => !isTbdEntry(entry));
  const openRoles = staffRecords.filter((entry) => isTbdEntry(entry));
  const staffBySection = currentStaff.reduce((map, entry) => {
    const sectionName = String(entry.section || "General").trim() || "General";

    if (!map.has(sectionName)) {
      map.set(sectionName, []);
    }

    map.get(sectionName).push(entry);
    return map;
  }, new Map());

  return (
    <main className="sr-page">
      <section className="sr-hero">
        <div className="sr-hero-copy">
          <p className="sr-kicker">Audacity Command Structure</p>
          <h1>Staff & Ranks</h1>
          <p>
            Meet the active staff team and review the full rank progression system used across Audacity.
          </p>
          <div className="sr-meta">
            <span>{currentStaff.length} Active Staff</span>
            <span>{openRoles.length} Open Roles</span>
          </div>
        </div>
      </section>

      <section className="sr-section" id="staff">
        <div className="sr-section-head">
          <p>Staff</p>
          <h2>Current Team & Open Positions</h2>
        </div>

        <div className="sr-staff-layout">
          <section className="sr-pane sr-pane-staff">
            <h3 className="sr-subheading">Current Staff</h3>
            <div className="sr-staff-sections">
              {[...staffBySection.entries()].map(([sectionName, members]) => (
                <section className="sr-staff-section" key={sectionName}>
                  <div className="sr-staff-section-head">
                    <h4>{sectionName}</h4>
                    <span>{members.length}</span>
                  </div>
                  <div className="sr-staff-grid">
                    {members.map((entry) => (
                      <article className="sr-staff-card" key={`${entry.section}-${entry.name}-${entry.role}`}>
                        <div className="sr-staff-top">
                          <span className="sr-avatar">{getInitials(entry.name)}</span>
                          <div>
                            <h4>{entry.name}</h4>
                            <p className="sr-role">{entry.role}</p>
                          </div>
                        </div>
                        <div className="sr-staff-tags">
                          <span>{entry.rank}</span>
                          <span>{entry.section}</span>
                        </div>
                        <p className="sr-bio">{entry.bio}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <aside className="sr-pane sr-pane-open">
            <h3 className="sr-subheading">Staff Roles We Are Searching For</h3>
            <div className="sr-open-grid">
              {openRoles.map((entry, index) => (
                <article className="sr-open-card" key={`open-role-${index + 1}`}>
                  <p className="sr-open-rank">{entry.rank}</p>
                  <h4>{entry.role}</h4>
                  <p className="sr-open-section">{entry.section}</p>
                  <p className="sr-open-bio">{entry.bio}</p>
                </article>
              ))}
            </div>
            <a className="sr-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
              Apply In Discord
            </a>
          </aside>
        </div>
      </section>

      <section className="sr-section" id="ranks">
        <div className="sr-section-head">
          <p>Rank System</p>
          <h2>Leadership To Member Progression</h2>
        </div>

        <div className="sr-rank-groups">
          {rankGroups.map((group) => (
            <article className="sr-group-card" key={group.title}>
              <h3>{group.title}</h3>
              <p className="sr-group-summary">{group.summary}</p>
              <div className="sr-rank-list">
                {group.roles.map((role) => (
                  <div className="sr-rank-card" key={role.rank}>
                    <p className={`sr-rank-pill sr-tone-${role.tone}`}>{role.rank}</p>
                    <h4>{role.heading}</h4>
                    {role.details.length > 0 && (
                      <ul>
                        {role.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sr-section sr-footer-cta">
        <div>
          <p className="sr-kicker">Need Help?</p>
          <h2>Questions About Roles Or Promotions</h2>
          <p className="sr-copy">
            If you want to take on responsibility in Audacity or understand the promotion path, contact
            staff through Discord and we will guide you.
          </p>
        </div>
        <div className="sr-actions">
          <a className="sr-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Open Discord
          </a>
          <Link className="sr-button sr-button-ghost" to="/">
            Back To Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
