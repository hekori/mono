export * from "./lib/cli";

console.log("called cli", __dirname, process.cwd());

import { Command } from "commander";
const program = new Command();
