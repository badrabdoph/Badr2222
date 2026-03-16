import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const envPath = path.join(cwd, ".env");
const examplePath = path.join(cwd, ".env.example");
const indexPath = path.join(cwd, "client", "index.html");
const indexTemplatePath = path.join(cwd, "client", "index.template.html");

if (!fs.existsSync(envPath)) {
  if (!fs.existsSync(examplePath)) {
    console.warn("[ensure-env] .env.example not found; skipping .env creation.");
  } else {
    fs.copyFileSync(examplePath, envPath);
    console.log("[ensure-env] Created .env from .env.example");
  }
}

try {
  const stat = fs.statSync(indexPath);
  if (stat.isDirectory()) {
    fs.rmSync(indexPath, { recursive: true, force: true });
  }
} catch {
  // missing is fine; we'll restore from template if available
}

if (!fs.existsSync(indexPath)) {
  if (fs.existsSync(indexTemplatePath)) {
    fs.copyFileSync(indexTemplatePath, indexPath);
    console.log("[ensure-env] Restored client/index.html from template");
  } else {
    console.warn("[ensure-env] client/index.html missing and no template found.");
  }
}
