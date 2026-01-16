import fs from "fs";
import moment from "moment";

// FIXED RANGE (no "now")
const START_DATE = "2025-06-27";
const END_DATE   = "2026-01-16";
const COMMITS_PER_DAY = 3;

// use UTC to avoid timezone drift
let day = moment.utc(START_DATE, "YYYY-MM-DD");
const end = moment.utc(END_DATE, "YYYY-MM-DD");

const data = [];

while (day.isSameOrBefore(end)) {
  // 3 commits at realistic times
  const hours = [10, 14, 18]; // 10:00, 14:00, 18:00 UTC
  for (let i = 0; i < COMMITS_PER_DAY; i++) {
    data.push({
      date: day.clone().hour(hours[i]).minute(0).second(0).format()
    });
  }
  day.add(1, "day");
}

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
console.log(`data.json generated: ${data.length} commits`);
