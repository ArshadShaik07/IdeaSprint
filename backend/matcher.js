import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load internships.json
const data = fs.readFileSync(
  path.join(__dirname, "internships.json"),
  "utf-8"
);

const internships = JSON.parse(data);

export default function matchInternships(skills, interest) {
  const results = [];
  const studentSkills = skills.map(skill => skill.toLowerCase());

  internships.forEach(internship => {
    let matchedRequired = 0;
    let matchedOptional = 0;
    let reasons = [];

    // Match required skills
    internship.required_skills.forEach(reqSkill => {
      if (studentSkills.includes(reqSkill.toLowerCase())) {
        matchedRequired++;
        reasons.push(`Matched required skill: ${reqSkill}`);
      }
    });

    // Match optional skills
    internship.optional_skills.forEach(optSkill => {
      if (studentSkills.includes(optSkill.toLowerCase())) {
        matchedOptional++;
        reasons.push(`Matched optional skill: ${optSkill}`);
      }
    });

    // Normalize scores
    const requiredScore =
      internship.required_skills.length > 0
        ? matchedRequired / internship.required_skills.length
        : 0;

    const optionalScore =
      internship.optional_skills.length > 0
        ? matchedOptional / internship.optional_skills.length
        : 0;

    // Weighted score
    let score =
      internship.match_logic.required_weight * requiredScore +
      internship.match_logic.optional_weight * optionalScore;

    // Small domain boost
    if (
      internship.domain.toLowerCase() === interest.toLowerCase()
    ) {
      score += 0.1;
      reasons.push("Domain matched");
    }

    // Clamp score between 0 and 1
    score = Math.max(0, Math.min(score, 1));

    results.push({
      role: internship.role,
      score: Math.round(score * 100),
      reason: reasons.length ? reasons.join(", ") : "Partial skill match"
    });
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}