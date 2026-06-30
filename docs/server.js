const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const dataFile = path.join(root, "cms-data.json");
const cmsUser = "alafrescaturismo@gmail.com";
const cmsPassword = "Hendaya1.";
const sessionCookie = "alafresca_cms";
const sessions = new Set();
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function send(res, status, body, type = "text/plain; charset=utf-8", headers = {}) {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store", ...headers });
  res.end(body);
}

function redirect(res, location) {
  res.writeHead(302, { Location: location, "Cache-Control": "no-store" });
  res.end();
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const [name, ...value] = part.trim().split("=");
    return [name, decodeURIComponent(value.join("="))];
  }));
}

function isCmsLoggedIn(req) {
  return sessions.has(parseCookies(req)[sessionCookie]);
}

function protectCms(req, res) {
  if (isCmsLoggedIn(req)) return false;
  if (req.method === "GET") {
    redirect(res, "/cms-login.html");
  } else {
    send(res, 401, JSON.stringify({ ok: false, error: "No autorizado" }), mimeTypes[".json"]);
  }
  return true;
}

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const resolved = path.normalize(path.join(root, requested));
  return resolved.startsWith(root) ? resolved : null;
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.startsWith("/cms-login")) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 64 * 1024) req.destroy();
    });
    req.on("end", () => {
      const data = new URLSearchParams(body);
      if (data.get("email") === cmsUser && data.get("password") === cmsPassword) {
        const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessions.add(token);
        res.writeHead(302, {
          Location: "/cms.html",
          "Set-Cookie": `${sessionCookie}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`,
          "Cache-Control": "no-store"
        });
        res.end();
        return;
      }
      redirect(res, "/cms-login.html?error=1");
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/cms-logout")) {
    const token = parseCookies(req)[sessionCookie];
    if (token) sessions.delete(token);
    res.writeHead(302, {
      Location: "/index.html",
      "Set-Cookie": `${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
      "Cache-Control": "no-store"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/cms-data")) {
    if (!fs.existsSync(dataFile)) return send(res, 200, "{}", mimeTypes[".json"]);
    return send(res, 200, fs.readFileSync(dataFile), mimeTypes[".json"]);
  }

  if (req.method === "POST" && req.url.startsWith("/cms-data")) {
    if (protectCms(req, res)) return;
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8 * 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
        send(res, 200, JSON.stringify({ ok: true }), mimeTypes[".json"]);
      } catch {
        send(res, 400, JSON.stringify({ ok: false }), mimeTypes[".json"]);
      }
    });
    return;
  }

  if (req.method !== "GET") return send(res, 405, "Method not allowed");
  const filePath = safePath(req.url);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return send(res, 404, "Not found");
  }
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  if ((urlPath === "/cms.html" || urlPath === "/cms.js") && protectCms(req, res)) return;
  const ext = path.extname(filePath).toLowerCase();
  send(res, 200, fs.readFileSync(filePath), mimeTypes[ext] || "application/octet-stream");
});

function listen(port) {
  server.once("error", () => listen(port + 1));
  server.listen(port, "127.0.0.1", () => {
    console.log(`A la fresca: http://127.0.0.1:${port}/`);
  });
}

listen(Number(process.env.PORT || 4173));
