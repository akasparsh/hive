# 🐝 Hive

A real-time collaborative workspace where teams create rooms t0 chat live,
share files, see who's online, and track activity.

Status: 🚧 Phase 1 - frontend core

## Why this project exists

Hive is a learing project that builds a production-style full-stack system 
step-by-step, covering frontend, backend, decurity, real-time communication, 
messaging, infrastructure, and deployment, using free services only.

## Planned features (MVP first)

- [ ] Sign up / log in (email+password, then Google/GitHub) ;
- [ ] Create and join rooms
- [ ] Real-time chat
- [ ] File uploads
- [ ] Online presence

## Tech stack (planned)

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript, React |
| Backend | Java, Spring Boot |
| Database | PostgreSQL |
| Cache / rate limiting | Redis |
| Messaging | Kafka |
| Real-time | WebSockets (STOMP) |
| Internal RPC | gRPC |
| Infra | Docker, Nginx, GitHub Actions |

## Repository layout

| Folder | Purpose |
|---|---|
| `frontend/` | React web app |
| `backend/` | Spring Boot API |
| `infra/` | Docker, Nginx, deployment config |
| `docs/` | Architecture and decision notes |

## Getting started

Setup instructions will be added as each phase is built.