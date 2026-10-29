# itelect4-backend

[![CI](https://github.com/Ryotofu/itelect4-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/Ryotofu/itelect4-backend/actions/workflows/ci.yml)

The REST API behind the ITELECT4 course project: Express on TypeScript, MongoDB Atlas via Mongoose, JWT authentication, and Gemini AI integration.

- **Live API:** https://itelect4-backend-weld.vercel.app/api/health
- **Frontend Repo:** https://github.com/Ryotofu/itelect4-project

## Architecture

```mermaid
flowchart LR
  fe["itelect4-project<br/>React + Vite on Vercel"]
  be["itelect4-backend<br/>Express on Vercel"]
  db[("MongoDB Atlas")]
  ai["Gemini API"]
  fe -- "fetch + Bearer token" --> be
  be -- "Mongoose" --> db
  be -- "GEMINI_API_KEY" --> ai