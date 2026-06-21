---
layout: post
title: "My experience with GitHub Copilot in an open-source project"
description: "My experience using GitHub Copilot agentic AI in an open-source project, acting as architect while Copilot agents write the code."
date: 2025-11-14
categories: [Architecture, Programming]
image: /assets/images/2025/11/banner-1024x534.png
tags: [agentic ai, ai agents, artificial intelligence, azure dev conference, cli extensions, code review, collaboration, developer productivity, developer tools, experimental projects, generative ai, github copilot, github issues, oh my posh, open source, prompt engineering]
---

It is amazing how fast AI developments have led to fundamental changes in the development process of IT projects. It is difficult for me to imagine generative AI and AI agents disappearing from my day-to-day work anytime soon.

![Featured image for 2025-11-14-my-experience-with-github-copilot-in-an-open-source-project]({{ '/assets/images/2025/11/banner-1024x534.png' | relative_url }})

Recently, agentic AI in particular has become a popular step in programming functionality in new and existing software or even executing the functionality directly. Because developments are going so fast, I wanted to assess some of these new tools myself in a new experimental project, starting from nothing.

For this project I wanted to put myself primarily into the position of 'architect' and 'requirements engineer.' Not as the programmer writing every line of code, but with Copilot agents taking the initiative of building the project.

Both the GitHub Copilot Reviewer and I will review any software that is generated. This blogpost is part of a series where I will recount the journey that I've made, things I have discovered and looking back each part of the way with my learnings.

## Project inspiration

I visited the Azure Dev Conference 2025 in Lisbon. Although named Azure, almost every talk on site had 'AI' in it. I saw how presenters build up entire code bases from just prompting and accepting every suggestion that Copilot made, because of the limited time during the talks. But putting it into perspective it is still an incredibly powerful tool.

I wanted to do something similar, primarily working from the prompt, minimal code adjustments from me directly.

Scott Hanselman was also present in Lisbon with very inspiring talks. During one of his demos to the audience he showed an Oh My Posh extension in his terminal window, showing his real-time blood sugar level, as he told us he was a diabetic. I thought that integration was so cool, I wanted to build an extension like that myself.

Towards the end of the day, when I work from the office, I always monitor the traffic situation for the journey back home. Why not build an extension that does that for me? I don't know the Oh My Posh library. I do not write code specifically for the terminal all that often. But with Copilot on my side, and with my general knowledge and experience as a software developer. I must be able to do this and learn along the way.

![Azure dev summit]({{ '/assets/images/2025/11/azure-dev-summit.png' | relative_url }})

## Project kick-off and planning

I wanted to work in a structured way, not only for myself but because LLMs thrive on context and well-structured descriptions. So, every change or idea must be a GitHub Issue first.

When starting a project from scratch there is always a lot of scaffolding to do, repository structure needs to be set up, initial files are to be put in place and a vision of the project has to be written down. Of course, I started right away with Copilot to help me with the kick-off. For interacting with the project and Copilot I've used [Visual Studio Code](https://code.visualstudio.com/) with the [Github Copilot extensions](https://code.visualstudio.com/docs/copilot/overview).

First I started a conversation in the chat window about my ideas for a CLI [Oh My Posh extension](https://github.com/JanDeDobbeleer/oh-my-posh). Not directing Copilot to start building software right away, but to first come to an understanding that we are talking about the same thing and a confirmation for myself that this was going somewhere.

During this, I'm already building up a conversation history in the chat window that can later be used to create GitHub Issues. After some sparring I asked Copilot to convert our talking points to a plan and convert that plan into GitHub Issues.

At this point I had only 'talked' with Copilot, I didn't write any to-dos or documentation myself. Copilot then output a project plan, with a set of proposed GitHub Issues. I only had to review it.

After some minor feedback I sent back over the chat I was satisfied with the initial planning and work items and instead of copying the chat output manually to the GitHub website, I've asked Copilot again to take care of this, and just like that Copilot was making GitHub API calls, populating my project issues list.

And within 30 minutes of starting the conversation, reviewing output, and doing research online. I had an initial project outline and did not have to wonder what I should do next; I could start working my way down the issue list.

The [wouterfennis/omp-travel-time](https://github.com/wouterfennis/omp-travel-time) project was born!

## Looking back and lessons learned

When I review these steps, I am impressed by the initial speed I can make as a single person with just an idea. With Copilot, I can quickly check out ideas, figure out what needs to be done, and post tasks straight to the GitHub project right from the chat. That way, everything's saved and easy for other contributors to jump in and help out.

Was it fun? Yes, as a person that is normally not directly involved in extracting requirements it was an interesting experience. But there are things to consider.

### Solo vs. group collaboration

I was alone in this instance, if I were in a group of people also with opinions about the project I would want a group chat with Copilot as a participant. I am curious whether Copilot would be able to not satisfy everyone in the group but to point out conflicting requirements and provide pushback. For now, the initial proposal will be made between one person and Copilot in most cases. Other people will have to review the result and provide feedback but won't be in the discussion chat in the heat of the moment.

### Review fatigue

You must like to review page after page. Copilot will do the writing, but someone must read it. And I can imagine that that can become tedious output after output. I noticed I was scanning the output that Copilot created at one point. Not thoroughly reading it anymore. That can be OK for issue descriptions, as it is not production code. But if wrong assumptions end up in that text, it can lead to wrong implementations later.

Copilot is diligent, very diligent. If you request something, your chat window will be flooded with text output. Initially, that's quite impressive; however, for someone like me who is accustomed to reviewing code rather than lengthy documentation, sifting through endless detailed responses can quickly become overwhelming.

I caught myself accepting suggestion after suggestion more quickly, thinking "I will come to this later, but I will accept it for now". But that doesn't make sense, as once published on GitHub, other people could pick these up thinking they are reviewed. Perhaps building the wrong functionality.

### Keep instructions precise, not short

Copilot will do its best to serve you but will try to introduce scope creep in its answers. You ask for A but will get A, B and a part of C for the same price. It is not Copilot's fault however, my instructions were too simple and without much context or examples in these cases. That takes some getting used to, as I did not have to 'program through the prompt' but switch to a more storytelling approach. Referencing examples or gaps within the repository.

## See also

- [Copilot Lab](/projects/copilot-lab/) — the hands-on lab series for learning GitHub Copilot responsibly, which grew out of experiences like the ones described in this post
- [OMP Travel Time](/projects/omp-travel-time/) — the Oh My Posh extension project that was built during the experiment described in this post

## References

- [Visual Studio Code](https://code.visualstudio.com/)
- [GitHub Copilot Extensions Documentation](https://code.visualstudio.com/docs/copilot/overview)
- [Oh My Posh CLI Extension](https://github.com/JanDeDobbeleer/oh-my-posh)
- [Project Repository: omp-travel-time](https://github.com/wouterfennis/omp-travel-time)
