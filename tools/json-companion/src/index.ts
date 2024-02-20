
import path from "node:path";
import fs from "node:fs";
import jsonminify from "jsonminify";

import nunjucks from "nunjucks";


/**
 * replace the nunjucks placeholders with the actual values
 */
nunjucks.render(
    path.join(process.cwd(), "./package.companion.jsonc"),
    /**
     * load the actual values from the package.data.jsonc file into a Js object
     */
    JSON.parse(
        jsonminify(
            fs.readFileSync(
                path.join(process.cwd(), "./package.data.jsonc"),
                "utf-8"
            )
        )
    ),
    function (err, res) {

        fs.writeFileSync(
            path.join(process.cwd(), "./package.json"),
            JSON.stringify(
                JSON.parse(
                    jsonminify(res)
                    
                ),
                null, 4
            )
        )

    }
);
