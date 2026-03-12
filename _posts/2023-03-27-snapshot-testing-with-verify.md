---
layout: post
title: "Snapshot testing with Verify"
date: 2023-03-27
categories: [Programming]
image: /assets/images/2023/03/archive-1024x577.png
tags: [file, snapshot, structure, testing, unit tests, verify]
---

Have you ever programmed something that had to output a string or file into a specific format? Whether it's CSV, a markup language or worse.. position based text, I've written many ugly unit tests to compare unreadable output to unreadable expected outcomes. Fortunately there is an alternative: Snapshot Testing. And with a library like [Verify](https://github.com/VerifyTests/Verify), it's actually manageable.

![Featured image for 2023-03-27-snapshot-testing-with-verify]({{ '/assets/images/2023/03/archive-1024x577.png' | relative_url }})

## What is snapshot testing?

Snapshot testing can be seen as a form of output testing. But that comparison is still too generic, whenever you test something you prepare an input, activate something and in the end compare the received output (A.K.A Triple A testing). So what makes snapshot testing different?

The way I see it, the scope is always bigger than one function or task. It comes into play at component or system level where there are always more variables to deal with. But the end result is always a piece of complex information that is formatted in such a way that it feels awkward to assert in a standard unit test assertion. That's the sweet spot where you want to compare output to something that has been verified beforehand but not explicitly visible in the test code itself. But whenever there is a difference between the two, you want it presented in a crystal clear way.

So why not break up the complex code into smaller deterministic bits and write simple unit tests around them? Well, that is not a bad idea, actually you might consider doing that anyway. The downside of only testing small individual pieces of a complex whole is that you can't be sure if the complete output actually fits the requirements.

## What is Verify?

Verify is a library that simplifies the assertion of these complex information outputs of your code. You pass along the received output from your code in the library and two files will be created the first time you run your test. The received output and the future snapshot.

Verify will compare the snapshot from now on with what it receives from your test run. If there are differences in even the slightest details, it will bring up any installed 'diff tool' present and point out the differences between both files. From this point the developer makes up his/her mind to either fix the production code to match the snapshot again, or to update the snapshot to make the test green again during the next testrun.

## Pros and Cons

I've used this tool during an actual customer project in a multidisciplinary team. We had a fitting use case for it because our system had to output different types of files that had to match specific formats. For this use case it is almost a no-brainer to use snapshot testing.

When dealing with **position-based** formats where there is no room for error, having a tool that points out the differences on unit test level is not only early feedback, it saves a lot of frustration with surrounding teams depending on those files.

The Verify library is also easy to understand and to hand over to other team members who have not written the test. This aspect is often overlooked when a new library is introduced in a system and team. The diff tool integration helps with achieving a support base in the team because it is so similar to solving git conflicts that happen on a regular basis anyway.

We've tried to take it one step further and use snapshot testing for mapping purposes as well, where an internal object is mapped to another internal object for example. In this case the snapshot format isn't important but the value content is.

This however did not work out as we anticipated. I've noticed that as time progresses, the team members I've worked with, including myself, often overwrote the expected snapshot with the newly received output without properly thinking it through. A diff tool makes it so easy to just 'resolve' the difference that it almost becomes a sort of gamification. At that point, the test will be green again and won't point out any subtle mistakes. It may sound foolish but it happened to different people during the project.

## Conclusion

Snapshot testing has really opened my eyes to a new tool to use when developing complex software. It is fast, reliable and easy to integrate into an existing system and team. I do recommend it for validating file formats and structure, I don't recommend it for testing complex mapping between objects as human error will eventually decrease the reliability.

## References

- [Verify library](https://github.com/VerifyTests/Verify)
