import { diffImprobib } from "./diff-improbib";

const commandName = process.argv[2];

if (!commandName) {
  throw new Error("Please provide a command.");
}

const commandMapping: Record<string, { callback: () => Promise<void> }> = {
  diff: {
    callback: diffImprobib,
  },
};

console.log(`Executing command: ${commandName}`);

const command = commandMapping[commandName];

if (!command) {
  console.error("Available commands: ", Object.keys(commandMapping));
} else {
  command.callback().then(() => {
    console.log("Command executed successfully.");
  });
}
