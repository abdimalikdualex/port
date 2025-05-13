// This script is used to set up the database schema
const fs = require("fs")
const { execSync } = require("child_process")

try {
  // Read the SQL schema file
  const schema = fs.readFileSync("db/schema.sql", "utf8")

  // Create a temporary file with the schema and a command to execute it
  fs.writeFileSync(
    "temp-schema.js",
    `
    const { neon } = require('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL || '');
    
    async function setupSchema() {
      try {
        console.log('Setting up database schema...');
        await sql\`${schema}\`;
        console.log('Schema setup completed successfully!');
      } catch (error) {
        console.error('Error setting up schema:', error);
      }
    }
    
    setupSchema();
  `,
  )

  // Execute the temporary file
  console.log("Running schema setup...")
  execSync("node temp-schema.js", { stdio: "inherit" })

  // Clean up
  fs.unlinkSync("temp-schema.js")
} catch (error) {
  console.error("Error setting up database:", error)
  process.exit(1)
}
