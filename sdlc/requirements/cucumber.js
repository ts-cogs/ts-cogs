/**
 * configure cucumber options
 */
module.exports = {
    default: [
        /**
         * We use Typescript, see: [example](https://github.com/cucumber/cucumber-js-examples/tree/main/examples/typescript-node)
         */
        "--require-module ts-node/register",

        /**
         * let all the features be end with `steps.ts`
         */
        "--require features/**/*.steps.ts"
    ].join(" "),
};