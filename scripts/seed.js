// This script is used to seed the database with initial data
const { execSync } = require("child_process")

try {
  // Compile the TypeScript seed file
  console.log("Compiling seed file...")
  execSync("npx tsc db/seed.ts --esModuleInterop --resolveJsonModule --target es2017 --module commonjs --outDir dist")

  // Run the compiled seed file
  console.log("Running seed file...")
  execSync("node dist/db/seed.js", { stdio: "inherit" })

  console.log("Seed completed successfully!")
} catch (error) {
  console.error("Error running seed:", error)
  process.exit(1)
}
