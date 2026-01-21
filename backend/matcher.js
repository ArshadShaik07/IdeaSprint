import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read internships.json
const data = fs.readFileSync(
  path.join(__dirname, "internships.json"),
  "utf-8"
);

const internships = JSON.parse(data);

export default function matchInternships(skills, interest) {
  const results = [];
  const studentSkills = skills.map(skill => skill.toLowerCase());

  internships.forEach(internship => {
    let score = 0;
    let reasons = [];

    internship.required_skills.forEach(reqSkill => {
      if (studentSkills.includes(reqSkill.toLowerCase())) {
        score += 10;
        reasons.push(`Matched required skill: ${reqSkill}`);
      } else {
        score -= 5;
      }
    });

    internship.optional_skills.forEach(optSkill => {
      if (studentSkills.includes(optSkill.toLowerCase())) {
        score += 5;
        reasons.push(`Matched optional skill: ${optSkill}`);
      }
    });

    if (internship.domain.toLowerCase() === interest.toLowerCase()) {
      score += 5;
      reasons.push("Domain matched");
    }

    results.push({
      role: internship.role,
      score,
      reason: reasons.join(", ")
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}
