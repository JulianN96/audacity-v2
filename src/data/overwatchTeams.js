import rawTeams from "./esportsteams.json";
import defaultTeamLogo from "../assets/overwatch/teamfortitudelogo.png";

const accentPalette = [
  { accent: "#f49b3a", accentSoft: "rgba(244, 155, 58, 0.24)" },
  { accent: "#5bc7ff", accentSoft: "rgba(91, 199, 255, 0.24)" },
  { accent: "#8edf7a", accentSoft: "rgba(142, 223, 122, 0.24)" },
  { accent: "#caa0ff", accentSoft: "rgba(202, 160, 255, 0.24)" },
  { accent: "#ff8ca4", accentSoft: "rgba(255, 140, 164, 0.24)" },
];

const fallbackValue = (value, fallback = "TBD") => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const text = String(value).trim();
  return text.length > 0 ? text : fallback;
};

const firstNonEmpty = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined) {
      continue;
    }

    const text = String(value).trim();

    if (text.length > 0) {
      return text;
    }
  }

  return "";
};

const logoModules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

const normalizeAssetPath = (value) =>
  value
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^src\//, "")
    .replace(/^\.\//, "");

const resolveTeamLogo = (rawPath) => {
  const input = firstNonEmpty(rawPath);

  if (!input) {
    return defaultTeamLogo;
  }

  const cleaned = normalizeAssetPath(input);
  const candidates = [
    input,
    `../${cleaned}`,
    `../${cleaned.replace(/^assets\//, "assets/")}`,
    `../assets/${cleaned.replace(/^assets\//, "").replace(/^overwatch\//, "overwatch/")}`,
  ];

  for (const candidate of candidates) {
    if (logoModules[candidate]) {
      return logoModules[candidate];
    }
  }

  const targetFile = cleaned.split("/").pop()?.toLowerCase();

  if (targetFile) {
    const match = Object.entries(logoModules).find(([path]) =>
      path.toLowerCase().endsWith(`/${targetFile}`)
    );

    if (match) {
      return match[1];
    }
  }

  return defaultTeamLogo;
};

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const collectSubstitutes = (roster) => {
  if (!roster) return [];
  const subs = [];
  const main = firstNonEmpty(roster.substitute);
  if (main) subs.push(main);
  let i = 1;
  while (Object.prototype.hasOwnProperty.call(roster, `substitute${i}`)) {
    const sub = firstNonEmpty(roster[`substitute${i}`]);
    if (sub) subs.push(sub);
    i++;
  }
  return subs;
};

const baseTeams = rawTeams.map((team, index) => {
  const name = fallbackValue(team.teamname, `Team ${index + 1}`);
  const shortName = fallbackValue(team["teamname-short"], name);
  const palette = accentPalette[index % accentPalette.length];
  const accent = firstNonEmpty(
    team.accent,
    team.color,
    team.colour,
    team.accentColor,
    team.accent_colour,
    team.accent_color
  );
  const accentSoft = firstNonEmpty(
    team.accentSoft,
    team.colorSoft,
    team.colourSoft,
    team.accentSoftColor,
    team.accent_soft,
    team.accent_soft_color,
    team.accent_soft_colour
  );

  return {
    id: `${toSlug(shortName)}-${index}`,
    slug: toSlug(shortName),
    name,
    shortName,
    elo: fallbackValue(team.ELO),
    region: fallbackValue(team.region),
    manager: fallbackValue(team.manager),
    coach: fallbackValue(team.coach),
    captain: fallbackValue(team.captain),
    roster: {
      tank: fallbackValue(team.roster?.tank),
      dps: fallbackValue(team.roster?.dps),
      dps2: fallbackValue(team.roster?.dps2),
      support: fallbackValue(team.roster?.support),
      support2: fallbackValue(team.roster?.support2),
      substitutes: collectSubstitutes(team.roster),
    },
    logo: resolveTeamLogo(
      firstNonEmpty(
        team.logo,
        team.logoPath,
        team.logopath,
        team["logo-path"],
        team.teamLogo,
        team.team_logo
      )
    ),
    accent: accent || palette.accent,
    accentSoft: accentSoft || (accent ? `color-mix(in srgb, ${accent} 24%, transparent)` : palette.accentSoft),
  };
});

const slugCounts = {};

export const overwatchTeams = baseTeams.map((team) => {
  const seen = (slugCounts[team.slug] || 0) + 1;
  slugCounts[team.slug] = seen;

  return {
    ...team,
    slug: seen === 1 ? team.slug : `${team.slug}-${seen}`,
  };
});

export const getOverwatchTeamBySlug = (slug) =>
  overwatchTeams.find((team) => team.slug === slug);
