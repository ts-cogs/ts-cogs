
import path from "node:path";
import fs from "node:fs";

console.log(process.cwd());

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "dist", "sdlc.json"), "utf-8"));

const packages = Object.values(data?.statements)?.filter((statement) => statement?.tags?.includes("package"))
    
console.log(packages.map(statement => statement.title));

// now, create a folder for each package in the docs
packages.forEach((statement) => {
    const dir = path.join(process.cwd(), "..", "docs", "docs", "packages",  statement.title);
    console.log(dir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    //s.writeFileSync(path.join(process.cwd(), "..", "docs", statement.title + ".md"), `---
})
