---
layout: post
title: "Wheel of Misfortune"
date: 2023-06-12
categories: [Scrum]
image: /assets/images/2023/06/Wheel_of_Fortune_logo-3.png
tags: [brainstorming, devops, incidents, operations, problem solving, wheel of misfortune]
---

![Featured image for wheel of misfortune]({{ '/assets/images/2023/06/Wheel_of_Fortune_logo-3.png' | relative_url }})

Getting software to production is one thing, maintaining it however is a whole other ball game. In your local development environment everything is always running smooth, network issues? Shortage on storage? Slow performance? Those issues often arise when your application is running on a server somewhere with actual production load and data. As developers we cannot be ignorant anymore and leave it to a system engineer to keep the system running for us. That ship has long sailed, we have to reinvent our way of working to develop new software and think ahead of the challenges of running it.

Nobody likes to be called in the middle of the night to be confronted with a failing system without a clear symptom on what is going on. So why wait until problems arise before you tackle them? There is often only so much that can go wrong, and if you already have a mitigating plan ready you'll be back in your bed in no time.

A tool I've been using to help teams think openly about this is the Wheel of Misfortune. It contains all the scenarios you would rather not encounter on a Friday afternoon. The team spins the wheel and one of the scenarios will be picked at random, the team will then sit together and determine what steps they would do to mitigate. This may sound easier than it is. Because there are often more variables involved once your start brainstorming about a specific scenario.

## Phase 1: collecting scenario's

A wheel is just an empty wheel without any unfortunate scenarios. So to have a successful session we first have to collect situations that are fitting to the specific application or context the team works in. A way to approach this is to organize a brainstorm session with post-its and a blank whiteboard. Split the team up into groups of two and tell everyone to think about everything that can go wrong. Nothing is too crazy, there is always some truth behind every problem written down.

Once the stream of new post-its starts to dry up it's time to organize the board, group the cards that are about the same kind of problems. In the order of 'networking', 'data corruption', 'unavailable colleagues' etc.

Using dot votes, each team member can now mark a limited amount of categories to be handled first.

If everything has gone right you should now have a few categories to start future discussions about. These scenarios are apparently the first things that the team thought about, maybe the lack of confidence or knowledge about a problem let to these to be written down. Very valuable information indeed!

## Phase 2: Spin the wheel

At this stage we can add our scenarios to a spinning wheel. For the creative and handy ones out there, you might build something real that can be brought on site. But these days there are plenty of free online tools to use. For example [Wheel of Names](https://wheelofnames.com/).

Be aware though what text you copy and paste to the internet. Keep the scenarios generic enough so that they can't be traced to the project or customer. Can you imagine the scandal?

Now you can spin the wheel!

![Spin the wheel GIF image]({{ '/assets/images/2023/06/spin-the-wheel.gif' | relative_url }})

> "Yelp. Database outage! OK what now?"

As facilitator you can divide the team into groups of two and assign each a random incident. This way you can really simulate an unexpected situation. Each group tries to come with a plan of action. You can provide a few questions to help investigate the problem from multiple angles:

- Is the problem clear enough?
  - What needs to be investigated before continuing?
- What do want to achieve? (Recover or an alternative)
- What influence do we have?
- Who do we need to help solve this?
- How do we reach the solution? In steps
- How do we streamline the solving process?
  - What needs to be documented?
  - What needs to be automated?
- Can we prevent this? How?

All of this brainstorming can result in manuals, flow charts, requirements for monitoring, important contacts etc… Whatever can help the team, each hour spent on pre-solving these issues is a lot less stress and frustration when getting production back on track.

## Phase 3: Reactions

> "How am I ever going to solve this?!"

Colleagues I've tried this with were a bit skeptical at first. Putting jokes or far fetched scenarios on the post-its during phase 1. But once confronted with those same cards during their turn with the wheel. Their faces switched to something more serious: and quickly they will start scribbling notes. That is exactly the sweet spot that you want to reach. A safe and constructive brainstorm session but with a slight touch of panic to keep it interesting.

After just one session team members will often release the following:

- "I need to understand this part of the system better."
- "I don't have the proper tools yet to fix this effectively. I've got new ideas for the coming weeks to work on."
- "I can't fix this on my own. I'm depending on team/person X."
- "Who was on watch duty again?"

All of these realizations are the perfect starting point for new discussions and follow up meetings.

## Phase 4: Follow up

Although one session can be helpful to realize what to do. It doesn't mean that those mitigations will actually work. You will have to try them out, finetune them and share the knowledge in your team. The goal should be that every team member is able to fix or assist in production issues. The Wheel of Misfortune can also be used as a training tool to try out certain mitigations under pressure. Problems of the past can also be put on the wheel to see if the team is actually to measure if the post-mortem at the time was fruitful.

## Conclusion

Once you reach a pre-production stage with your project or need a fresh look at the incidents that overwhelm your team. The Wheel of Misfortune can really break the ice in a comical way in your team.

## References

- [Wheel of Names](https://wheelofnames.com/)
