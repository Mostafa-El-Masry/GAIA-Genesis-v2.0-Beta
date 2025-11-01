import https from "https";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const DAISY_URL = "https://cdn.jsdelivr.net/npm/daisyui@5.3.11/dist/full.css";

function computeSRI(content) {
  const hash = crypto.createHash("sha384");
  hash.update(content);
  return `sha384-${hash.digest("base64")}`;
}

https
  .get(DAISY_URL, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const integrity = computeSRI(data);

      // Update daisyThemes.ts with the integrity value
      const themesPath = path.resolve("daisyThemes.ts");
      let content = fs.readFileSync(themesPath, "utf8");

      // Extract the existing URL
      const urlMatch = content.match(/DAISY_FALLBACK\s*=\s*['"]([^'"]+)['"]/);
      if (!urlMatch) {
        console.error("Could not find DAISY_FALLBACK in daisyThemes.ts");
        process.exit(1);
      }

      // Add or update the integrity hash
      if (content.includes("DAISY_INTEGRITY")) {
        content = content.replace(
          /DAISY_INTEGRITY\s*=\s*['"][^'"]+['"]/,
          `DAISY_INTEGRITY = '${integrity}'`
        );
      } else {
        // Add after DAISY_FALLBACK
        content = content.replace(
          /export const DAISY_FALLBACK/,
          `export const DAISY_INTEGRITY = '${integrity}';\n\nexport const DAISY_FALLBACK`
        );
      }

      fs.writeFileSync(themesPath, content);
      console.log(`Updated daisyThemes.ts with integrity hash: ${integrity}`);
    });
  })
  .on("error", (err) => {
    console.error("Error fetching daisyUI CSS:", err);
    process.exit(1);
  });
