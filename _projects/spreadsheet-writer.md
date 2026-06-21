---
title: "SpreadsheetWriter"
description: "A fluent .NET library for programmatically building Excel spreadsheets, backed by EPPlus."
github_url: "https://github.com/wouterfennis/SpreadsheetWriter"
tags: [dotnet, csharp, excel, epplus, nuget, fluent api]
order: 5
---

## About this project

Generating Excel output in a .NET application typically means writing verbose, imperative code: instantiate a workbook, get a worksheet, set cell A1, set cell A2, apply formatting to a range, and so on. SpreadsheetWriter wraps that complexity behind a clean fluent interface so the intent of the spreadsheet structure is visible at a glance in the code.

The library targets common scenarios where you need to produce consistently-formatted Excel files from code — reports, data exports, generated templates — without tying your domain logic directly to EPPlus. The abstractions layer keeps the consumer code testable and leaves room to swap the underlying engine if needed.

## Key features

- Fluent API for defining spreadsheet structure and content with method chaining
- EPPlus backend for full `.xlsx` compatibility
- `SpreadsheetWriter.Abstractions` package for dependency-inversion and testability
- MIT licensed

## Getting started

Install the NuGet package and start building spreadsheets with a fluent API:

```bash
dotnet add package SpreadsheetWriter.EPPlus
```

For projects that need to mock or replace the writer in tests, reference the abstractions package separately:

```bash
dotnet add package SpreadsheetWriter.Abstractions
```

See the [repository](https://github.com/wouterfennis/SpreadsheetWriter) for source code and usage examples.
