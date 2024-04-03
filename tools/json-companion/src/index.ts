import path from "node:path";
import fs from "node:fs";
import jsonminify from "jsonminify";
import nunjucks from "nunjucks";
import { Command } from "commander";

/**
 * the default path to the data file
 */
const defaultDataPath = "./package.data.jsonc";

/**
 * the default path to the output file
 */
const defaultOutputPath = "./package.json";

/**
 * create a new commander program to handle the command line arguments
 */
const program = new Command();

program.option("-s, --source <path>", "path to the source file", "./package.companion.jsonc");
program.option("-d, --data <path>", "path to the data file", defaultDataPath);
program.option(
    "-o, --output <path>",
    "path to the data file",
    defaultOutputPath,
);

/**
 * parse the command line arguments
 */
program.parse(process.argv);

/**
 * transform the output based on the source file type
 */
const transformFn = program.opts().source.endsWith(".json") || program.opts().source.endsWith(".jsonc")
    ? (s) => JSON.stringify(JSON.parse(jsonminify(s)), null, 4)
    : (s) => s;

/**
 * replace the nunjucks placeholders with the actual values
 */
nunjucks.render(
    path.join(process.cwd(), program.opts().source),
    /**
     * load the actual values from the package.data.jsonc file into a Js object
     */
    JSON.parse(
        jsonminify(
            fs.readFileSync(
                /**
                 * use the provided data file path or the default one
                 */
                path.join(process.cwd(), program.opts().data),
                "utf-8",
            ),
        ),
    ),
    function (err, res) {
        fs.writeFileSync(
            /**
             * use the provided output file path or the default one
             */
            path.join(process.cwd(), program.opts().output),
            transformFn(res),
        );
    },
);
