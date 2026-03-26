import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN
});

const [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");

if (!owner || !repo) {
  console.error("Missing or invalid GITHUB_REPOSITORY (expected owner/repo).");
  process.exit(1);
}

octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/labels", {
  owner,
  repo,
  issue_number: process.env.NUMBER,
  labels: [
    "🎯: feature branch"
  ]
}).then(res => {
  if (res.statusCode > 400) {
    console.log("❌ There was a problem.");
    process.exit(1);
  }
});