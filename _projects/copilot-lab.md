---
title: "Copilot Lab"
description: "A hands-on lab series for learning to use GitHub Copilot responsibly and effectively, covering prompting, planning, testing, and prompt governance."
github_url: "https://github.com/wouterfennis/copilot-lab"
tags: [github copilot, ai, developer tools, prompt engineering, testing, dotnet, csharp]
order: 2
related_posts:
  - /2025/11/14/my-experience-with-github-copilot-in-an-open-source-project/
---

## About this project

Most introductions to GitHub Copilot focus on the moment of acceptance: you see a suggestion and you press Tab. This lab series starts exactly where that stops — teaching you how to steer Copilot with deliberate context so the suggestions are worth accepting in the first place.

The eight labs progress from setting up global instruction files through to multi-step planning, test-first workflows, reconciling conflicting constraints across docs and code, and finally managing prompt snippets as first-class artefacts with their own governance lifecycle. Each lab ends with a reflection exercise to build the habit of improving your prompting practice over time.

For teams adopting Copilot beyond individual productivity, this repository is a practical resource: the guard rails, principles, and snippet governance model can be lifted directly into a team workflow.

## Key features

- Eight sequential labs, each introducing a new layer of context or constraint
- Guard rails emphasising functional core, plan-before-code, and test-first workflows
- Prompt snippet library with governance metadata (STATUS, LAST-REVIEW, OWNER)
- Conflict reconciliation strategies when instructions, diagrams, and code disagree
- `REFLECTION.md` template in every lab to encourage structured improvement habits
- Global `.github/copilot-instructions.md` as a reusable pattern for your own projects

## Getting started

Clone the repository and open the first lab directory:

```pwsh
git clone https://github.com/wouterfennis/copilot-lab.git
cd copilot-lab/labs/lab-01-basic-instructions
```

Each lab has its own README with the starting prompt. The recommended workflow is: read the README, run a planning prompt in Copilot Chat, capture the plan in `PLAN.md`, implement, and then answer the reflection questions. See the [repository README](https://github.com/wouterfennis/copilot-lab#getting-started) for the full recommended path.
