---
layout: post
title: "Technorama Netherlands 2023 in review"
date: 2023-10-15
categories: [Programming]
image: /assets/images/2023/10/technorama-2023-1-1024x285.jpg
tags: [2023, ai, architecture, artificial intelligence, azure, cloud, development, netherlands, tdd, technorama, test driven development, testing]
---

During and initially after COVID I kind of lost track of IT conferences. Working more from home and occasionally visiting the office makes your professional circle increasingly smaller without noticing it. So when I was made aware that this month the Technorama conference would take place in the [Kinopolis](https://kinepolis.nl/bioscopen/kinepolis-jaarbeurs-utrecht/info/) in Utrecht, I signed up and went there.

![Featured image for 2023-10-15-technorama-netherlands-2023-in-review]({{ '/assets/images/2023/10/technorama-2023-1-1024x285.jpg' | relative_url }})


Technorama is a "Deep knowledge IT Conference" as the event is described on the website. And that is definitely true, I wouldn't describe the sessions as entry level. Most of the presentations given by the large list of speakers require knowledge and experience of working in the field. And for me, that makes it worth spending two days hopping between 14(!) different cinema rooms.

For Dutch standards, the scale of the event was big. Every hour you could choose between 10 different speakers each with their own interesting insight on architecture, cloud computing, data, developer trends, self-improvement, front end development and of course Artificial Intelligence.

## Artificial Intelligence

AI had special attention this year as Chat-GPT and Github Copilot blasted their way in IT development. Jennifer Marsman, a principal engineer at Microsoft, flew over to explain the potential of AI and of course how the Azure platform can make it accessible for any business to hop onboard. AI was mentioned in almost every session I've attended during the day. How it could help solving the problems of businesses, to refactoring or explaining legacy code. Apart from marketing one liners there were actually speakers that showed some real use cases and weren't afraid to demo them live. Often the prompts didn't return the exact answer that was expected but that only confirmed the imperfection of the concept. You always have to review the suggestions or answers being presented by an AI model.

## Architecture

Another topic that many sessions were about was architecture. What struck me were some of the statements that were being made by the IT professionals that started in the 90's and reviewed back on their career and how much the IT landscape has changed. Or as some of them said, actually didn't change all that much. Sure, the technology got more advanced and everything is way more connected than before. But we are still solving the same problems as back in those days and we aren't building quicker or more maintainable systems according to them.

Micro services are often taken as an example where everyone jumps on the bandwagon as the new revolution in architecture. But because modeling and figuring out which components have high cohesion and low coupling is still difficult, the end result is often a distributed monolith.. why not build proper monoliths instead?

The problem isn't micro services themselves but the modeling and designing effort that it takes to get there.

## Cloud development

Many sessions were also about the cloud in general. I've attended a session from [Erwin Staal](https://erwinstaal.nl/) where Bicep, Terraform and Pulumi were compared to each other as they all are tools that can deploy and maintain infrastructure in the cloud.

Bicep is the most narrow scoped tool as it can only be used to deploy to the Azure cloud. But when Azure is the only platform you have to use that is not really a problem. It's maintained by Microsoft directly and has the best integration in tools like Visual Studio Code.

With Terraform and Pulumi the maintenance of the tools is done by third party companies, so the feedback loop when new resources can be released to the cloud can be a bit longer. They do however support both Azure, AWS and other cloud providers. So they can be an excellent fit in an enterprise broad infrastructure as code strategy.

## Test driven development

[Ian Cooper](https://github.com/iancooper) gave a very in-depth but interesting talk about test driven development. Going back and forward between theory, quotes from other TDD evangelists and practise of building software this way.

The learning I've got out of this was that TDD has often been used on the wrong level of testing. Far too much on the implementation (Unit test) level of software. Which makes writing a very basic test difficult because you have to create a lot of implementation details to get the test running for the first time. It should start from a higher point of view almost at contract level for example. A good way to measure if these tests are on the right place is by refactoring existing code, is the test not compiling anymore? Then probably you're testing on a too low level, and maintaining the test suite can be a time consuming task with every new feature.

When it comes to mocking, you should aim to only mock IO. Breaking up the application itself in Mock and real components is again moving your tests too closely to the implementation of the software instead of the behavior/contract.

## Conclusion

Following speaker sessions close to 8 hours a day for two days is a bit intense, especially if you don't make notes along the way. However it is a great opportunity to break out your usual professional circle and talk to complete strangers that happen to do the same job as yourself. For me the conference confirmed things I already do on a day to day basis. But every speaker gave me a hint to look something up or try something at a later moment. There is always something to learn by just listening.




