---
layout: post
title: "Using the Archimate motivation layer"
date: 2024-06-03
categories: [Architecture]
image: /assets/images/2024/05/Organisational-chart-lego.jpg
tags: [archi, archimate, architecture, examples, motivation layer]
---

How often did you ask yourself during a project: "Why am I doing this again?". You have to take a step back, zoom out of the technicalities and look at the written requirements or talk with the stakeholders of your project. Often discovering that you had made an assumption about the underlying reasons some work had to be done or in a certain way.

Although you could say this is part of iterative working, often the information that is discovered at that point in time is in the middle of an already running iteration. Halting the workflow of a team member to get the reasoning behind a change or addition.

How nice would it be if there would be an 'architecture' diagram of the stakeholders in the project. What their needs, drivers and priorities are. To help you make important decisions on a day to day basis. Archimate might have the solution!

Archimate is a very large modeling language. Too large to fit in a single blog post obviously. There are interesting aspects that I can pick out and use individually to gain insight or generate more impact in a project. The Motivation layer from Archimate is a level of architecture that doesn't look at systems, applications or functionality for that matter. Only people, their roles in the project and what they find important.

So how would you start mapping this diagram? The challenge during these initial impressions or talks with the stakeholders is to not dive straight into the problems, challenges or even solutions that might already be on the table. First we have to get a clear scope of who the stakeholders are in the organization. Who may or may not benefit from the project. Don't narrow the scope just yet, this can always be done later.

## Why

What is the benefit of mapping the stakeholders and their motivations in the first place? I would say it often comes down on delivering the right thing, in the right timing under the right circumstances.

Before you as an architect or software engineer start making decisions and implementations that have consequences in the long run. You have to be able to reference the initial needs of the stakeholders that pay and use the project that will be delivered.

Building up a diagram and giving insights in this should always be worth the investment. Archimate has a [complete definition](https://pubs.opengroup.org/architecture/archimate2-doc/) of the motivation layer. In this blogpost I will use a limited example and it will be describing the steps through my personal experience.

## Example

In this example we will take a lumber mill company as our employer that has requested us for a certain assignment. The assignment itself isn't important now, as we are only interested in the motivation of our stakeholders. Not knowing exactly which stakeholders will be important, I'll start all the way at the top of the company. Often there is an organogram available that gives a first impression on the positions and roles.

There are for example two chiefs: The CEO and the CFO. Besides we know that there are end users and a project manager involved. Let's start with this set of positions and roles.

These roles have certain 'drivers'. What makes the people behind these roles get out of bed in the morning? What do they want to achieve every day? Every year?

The CEO and CFO have a shared driver regarding the market share. Apparently this is something that is often in their minds when making decisions. Budget is also a shared driver between the CFO and the project manager. There is no unlimited money for change or initiatives.

The customer however is just interested in the quality of the product.

It might not be so obvious to find these drivers so easily. The following step however, the assessments might be easier because these are often the 'problems' why you are hired in the first place. If a stakeholder comes to you with an assignment there must be an assessment behind it to improve. And why is that assessment so important for the stakeholder? Because of his or her driver.

The assessments should give an insight in how the drivers are currently looking. Assessments may influence each other to express a potential root cause.

Now that we have some idea about the roles, their drivers and the current assessments. We can draw in goals to improve those assessments.

To measure the progress to the goal there is another layer we can add to make smaller, quantifiable outcomes.

Outcomes can positively or negatively influence the goal they are associated with. Making this visible can reveal conflicting interests and can help to prioritize each outcome.

There are more components to this layer in Archimate that break down the situation more and more to extract principles, requirements and constraints. These can shape the next phase when the business architecture is drawn. For this blogpost I'll not dive into this further.

## Conclusion

What we have created now is a map of interests, problems, current state of affairs and a dot on the horizon to further discuss with the business and to eventually create more specific architecture diagrams with.

Diagrams like these don't have to be static, but they should reflect a long running strategy in the business. Updating and replacing these components every month would indicate that the roles involved do not have a clear vision for the coming years. Or there might be an underlying driver + assessment that is disrupting stability.

## References

- [ArchiMate® 2.1 Specification](https://pubs.opengroup.org/architecture/archimate2-doc/)
- [Archi – Open Source ArchiMate Modelling](https://www.archimatetool.com/)




