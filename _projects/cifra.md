---
title: "Cifra"
description: "A web application that generates pre-formatted Excel exam grading spreadsheets from reusable class and test definitions, eliminating repetitive manual setup."
github_url: "https://github.com/wouterfennis/Cifra"
tags: [dotnet, csharp, blazor, aspnet, excel, education, docker]
order: 4
---

## About this project

Anyone who has ever created exam grading spreadsheets by hand will recognise the problem Cifra solves. Every time a new exam cycle starts, the same structure needs to be rebuilt: student names, assignment columns, grade formulas. It is tedious, error-prone, and entirely automatable.

Cifra lets you define your classes (with student names imported from CSV or entered manually) and your test structure (assignments, questions, grading parameters) once, then generates a ready-to-use spreadsheet in seconds. The generated file opens directly in any spreadsheet editor, so there is no new tool for examiners to learn.

Under the hood it is a Blazor frontend backed by an ASP.NET Core Web API, running via Docker Compose — a compact but representative stack for a practical line-of-business application.

## Key features

- Class management: create student lists manually or import from CSV
- Test configuration: define assignments, questions per assignment, grading scale, and multiple test versions
- On-demand spreadsheet generation downloaded directly through the browser
- Blazor frontend for an interactive, SPA-style experience without JavaScript
- Docker Compose-based build and deployment

## Getting started

Build and start the application with Docker Compose:

```powershell
git clone https://github.com/wouterfennis/Cifra.git
cd Cifra
docker-compose build
docker-compose up
```

Once running, open the application in your browser and follow the workflow: create a class, create a test, then generate a spreadsheet. See the [README](https://github.com/wouterfennis/Cifra#tutorial) for a step-by-step tutorial.
