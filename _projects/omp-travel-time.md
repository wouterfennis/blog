---
title: "OMP Travel Time"
description: "A PowerShell module that shows real-time, traffic-aware travel time to your home address directly in your Oh My Posh terminal prompt."
github_url: "https://github.com/wouterfennis/omp-travel-time"
tags: [powershell, oh my posh, google routes api, windows, terminal, developer tools]
order: 3
related_posts:
  - /2025/11/14/my-experience-with-github-copilot-in-an-open-source-project/
---

## About this project

Towards the end of a working day, monitoring the traffic situation for the journey home is a small but regular distraction. This project eliminates it by surfacing that information where a developer already spends most of their time: the terminal prompt.

OMP Travel Time extends [Oh My Posh](https://ohmyposh.dev/) with a segment that queries the Google Routes API every five minutes during configurable active hours and displays the current travel time with a colour-coded traffic indicator. The project was built as an experiment with GitHub Copilot agentic AI — I acted as architect and requirements engineer while Copilot agents wrote the code. You can read about that experience in the related blog posts below.

The modular PowerShell architecture, comprehensive test suite, and address validation logic make this a useful reference for anyone writing non-trivial PowerShell tooling.

## Key features

- Real-time travel time to a configured home address via Google Routes API
- Traffic-aware routing with colour-coded indicators (green / yellow / red)
- Configurable active-hours window to minimise unnecessary API calls
- Windows Location Services integration for privacy-respecting origin detection
- Automated updates via Windows scheduled task (runs every 5 minutes)
- Comprehensive test suite: unit, integration, and configuration tests
- Address format validation and geocoding verification with smart suggestions
- Modular `src/` architecture separating core logic, services, and configuration

## Getting started

You need a Google Maps API key with the Routes API enabled. Run the installation wizard as administrator:

```powershell
git clone https://github.com/wouterfennis/omp-travel-time.git
cd omp-travel-time

# Run the test suite first (no API key required for most tests)
.\tests\Run-AllTests.ps1

# Then install
.\scripts\Install-TravelTimeService.ps1
```

The installer prompts for your API key, home address, and active-hours window. See the [README](https://github.com/wouterfennis/omp-travel-time#getting-started) for the full setup guide.
