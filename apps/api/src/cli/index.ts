import { Command } from "commander";
const program = new Command();

program
  .command("migrate [back]")
  .description("Run migrations")
  .action((destination) => {
    console.log("clone command called");
  });

// program.command('stop [service]', 'stop named service, or all if no name supplied');
//
//
//
// program.parse(process.argv);
//
// const options = program.opts();
// if (options.debug) console.log(options);
// console.log("pizza details:");
// if (options.small) console.log("- small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);
