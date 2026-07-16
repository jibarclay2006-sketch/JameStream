import { readFileSync } from "node:fs";

import { globSync } from "glob";
import { describe, expect, it } from "vitest";

const executableFiles = globSync(
  ["src/**/*.{ts,tsx}", "index.html", "package.json", "public/config.js"],
  {
    ignore: ["src/**/*.test.ts"],
    nodir: true,
  },
);

const forbiddenRuntimeMarkers = [
  "react-ga4",
  "VITE_TRACK_SCRIPT",
  "ENABLE_POPUNDER",
  "POPUNDER_SCRIPT_URL",
  "ENABLE_HOME_AD",
  "HOME_AD_ZONE_ID",
  "ENABLE_SECONDARY_AD",
  "ENABLE_BOOKMARKS_AD",
  "VITE_ENABLE_RYBBIT",
  "useRybbitWatchingEvent",
  "aqle3.com",
  "fizzledesire.com",
  "clixou.com",
];

describe("ad-free build guard", () => {
  it.each(forbiddenRuntimeMarkers)(
    "does not contain the removed runtime marker %s",
    (marker) => {
      const matches = executableFiles.filter((file) =>
        readFileSync(file, "utf8").includes(marker),
      );

      expect(matches).toEqual([]);
    },
  );

  it("uses the pinned local provider bundle", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

    expect(packageJson.dependencies["@p-stream/providers"]).toBe(
      "file:vendor/providers",
    );
  });
});
