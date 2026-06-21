---
title: "TimeForCode"
description: "A community platform that connects companies willing to donate developer time with open-source projects that need structured support."
github_url: "https://github.com/wouterfennis/TimeForCode"
tags: [dotnet, csharp, blazor, aspnet, azure, mongodb, oauth, open source]
order: 1
---

## About this project

Open-source software powers a significant portion of modern software infrastructure, yet most maintainers work without any formal support from the companies that depend on their work. TimeForCode tackles that asymmetry head-on: organisations register the developer hours they are willing to donate, open-source projects list what they need, and the platform handles the matchmaking, tracking, and impact reporting.

As a software engineer, the project is interesting beyond its social mission. It is a full-stack .NET application with a realistic, distributed architecture — OAuth 2.0 authentication backed by GitHub, an ASP.NET Core API layer, a Blazor frontend, MongoDB for persistence, and Azure-hosted infrastructure described entirely in Bicep. It is a good case study for how these pieces fit together in a production-ready project.

## Key features

- GitHub OAuth 2.0 login with internal JWT issuance and refresh
- Project registration: publish, list, view, and unpublish GitHub repositories
- Donation management and contribution tracking
- Blazor frontend for donors, contributors, and maintainers
- Docker Compose and Podman local development setup
- Azure App Service deployment with Bicep infrastructure-as-code
- SonarCloud integration for continuous code quality monitoring
- Architecture documented in the Arc42 format

## Getting started

Clone the repository and start the full stack locally with a single script:

```powershell
git clone https://github.com/wouterfennis/TimeForCode.git
cd TimeForCode
.\scripts\start-local.ps1
```

The script starts all services via Podman Compose. An identity-provider mock is included so you do not need a real GitHub OAuth app for local development. See the [README](https://github.com/wouterfennis/TimeForCode#getting-started) for the full setup guide.
