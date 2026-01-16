import fs from "fs";
import simpleGit from "simple-git";

const git = simpleGit();

// read dates
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

async function run() {
  for (const entry of data) {
    const date = entry.date;

    // create dummy change
    fs.writeFileSync("commit.txt", date);

    await git.add("commit.txt");

    await git.commit(`commit on ${date}`, {
      "--date": date
    });

    console.log(date);
  }
}

run();
