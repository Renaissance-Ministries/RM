# Call Transcript — Thomas Abshier & Isak Gutierrez

**Date:** Friday, August 21, 2026
**Time:** 7:02 – 10:29 a.m. (with a break from ~8:20 to ~9:16)
**Participants:** Thomas Abshier, Isak Gutierrez

*Cleaned for readability: filler words, false starts, and one-word backchannels removed; obvious speech-to-text errors corrected. Wording and meaning otherwise preserved. Where a word was unclear in the original, it is marked [unclear].*

---

## 1. The Presidential Address Concept (7:02)

**Thomas:** This could be a very fruitful expression. It's a good way of putting people in the position of — *this is what a president should actually be saying.* It's the creation of a new reality.

I think that's a good one. I'll start working toward having the hardware set up so this can work.

**Isak:** Once we get a little closer, I'll make sure you get on that. You don't have to get on it right now — we still have some writing to do, and some ideas. I want to process what you have online and at least get something built out. Then we can go through the specifics of how it sounds audibly spoken.

Essentially, this is an art piece. It's an art piece offering a radically different view of America — and it's radical only relative to what we have now. It's an art piece that should make people go: *this is what I do want a president to sound like*, or *this is not what our president sounds like*. Congress doesn't sound like this. Nobody sounds like this. Nobody talks like this anymore, but this is what we want. We're offering something people have been craving — or maybe not. This is an experiment to see who responds, who even sees it.

I think it would be a lot easier to spread in this kind of format, where there are clippable moments we can use as a trailer on social media. But if the whole thing is eight or ten minutes of clear discussion — if it doesn't lead to a presidency, at least it inspires people to see: *this is the kind of platform people want. How do we actually run this thing? How do we implement it?*

**Thomas:** If we don't win in '28, then from then on the shots are for the 49th president. So it's an ongoing series — you're always on the campaign trail.

Who was that guy who ran many times? Back in the 60s, 70s, 80s — he ran for president for thirty years. [unclear — likely Harold Stassen] There's a lot of precedent for people just being continually on the campaign trail. You never know how much influence you'll have from the sidelines. You're not the main show, but it might make people think. We're trying to do everything we can to get traction, to get enrollment, to get people to think differently, to incorporate a new way of living life.

---

## 2. Teaching Format and the Physics Work (7:06)

**Thomas:** We'll just work on making that real and chip away at it. The one that will probably do the most — or at least we'll do a series — we're going to do a lot of physics, a lot of teaching, just drawing. I've got a whiteboard set up with an overhead camera and a forward camera. We can use that as our teaching method: explaining things by drawing pictures, doing blackboard-style work. That's something we can do a lot of.

The homeschool piece I don't think is necessary for me to do. I don't know how much of a visual or lecture component is necessary — people learn in different ways: visually, auditorily, through reading, discussion, working problems, playing with physical models. There are a lot of different ways of teaching something. We should explore the different methods of getting the message across.

I think the first thing is getting the words down, and having images associated with it. Claude can generate images associated with things.

I went through the papers yesterday — the whole general relativity suite. It ended up being ten companion papers and one main paper. I think we've got that finished. Now I'm looking at what to do next. Maybe one more paper — actually, it looks like the Kerr surface derivation, with a LIGO paper right behind it. So maybe two more papers on general relativity.

I basically spent all day doing derivations, finishing the documentation, and getting everything publication-ready. I have four or five chapters of the book on the general relativity topic. I'm writing a chapter in the book each time we do another paper.

I was concerned about the quantum mechanics and entanglement papers, so I had it look at those this morning to see whether they were solid. Those were already clean — we didn't need to do anything with entanglement.

---

## 3. The LIGO Prediction (7:10)

**Thomas:** One of the things that came out of our general relativity paper is that what my paper predicts is something that would already be in data collected from the LIGO experiment.

Do you know what LIGO is?

**Isak:** Tell me again.

**Thomas:** It's a gravity wave experiment. They've got a couple of lasers, and they're able to detect movements a fraction of the diameter of a proton. It's staggering that it's even technologically possible.

They're always looking at black holes — the gravity waves from black holes colliding, or neutron stars that are rotating and finally collapse into each other. That makes a gravity wave, the wave spreads out through the universe, and it eventually arrives here a billion years later. You detect it, and you can tell things about what was going on there.

This particular measurement has already been made — nobody's looking for it. There's a particular ring that can be extracted from data that's already been gathered.

You know how normally, when you go through a black hole, there's a horizon? You go past a particular spot and there's no [return]. In mine, the black hole doesn't have a horizon — it's a hard surface. As a result, there's a prediction of a ring: about two milliseconds between the hit and the bounce back. You would see that in the data.

So this is actually a way of proving my theory with a prediction. The collision data has already been measured, but nobody has interpreted it looking for this.

It's not quite as strong as *let's do an experiment that's never been done before — no doubt, no way of cheating, it just doesn't exist, now we do it, and look, it came out right.* That kind gets a green check mark that says your theory predicted something we couldn't have known. It adds to your credibility. You do a few of those and people say, okay, this is true. It doesn't take too many — sometimes even one.

That's what's been done with Einstein and general relativity forever. 1919 was the first one, but there have been many experiments since that validate general relativity.

---

## 4. Paper Count, Manifest, and the Zenodo Pipeline (7:15)

**Thomas:** We're now up to 122 papers.

**Isak:** 122. Those last ones were the GR papers.

**Thomas:** Yes. We did have the SR papers C5 to C21 — those were there, and we retired those and regenerated. It went from 117 papers to 122. Every GR paper is present at its current version. Twelve orphan rows were verified before acceptance. None of the relocations carried a reserved DOI or preprint ID, so nothing irreplaceable was dropped. The generator's version parser had two latent bugs fixed.

So my system now updates — it's called OSF. What's the name we gave it? Deposit queue, standing order. OSF Deposit Queue. We haven't renamed it. Maybe we should when we get everything fully going, but we'll leave it for now.

So we've got OSF DepositQ as what we're working from. I'll be doing updates to OSF DepositQ. You'll take it and convert it into a Zenodo deposit.

**Isak:** Let me check — we may have made a second one. Claude may have already...

**Thomas:** You can make one from mine. I'll work on mine, and he'd probably need to update mine after his was taken care of.

**Isak:** You mean the GitHub?

**Thomas:** The easiest way would create the possibility of collisions — him working while I'm working. Things get lost in the shuffle because we're doing two things in two different places. So if he takes a snapshot, does the work, then comes back and looks again and says *oh, it's changed* — okay, now we'll do that. It might have been changing while he was working. It doesn't matter: he did it, and now we make an update to Zenodo.

**Isak:** Okay, here's the current deposit file situation.

The old version: `osf_papers_manifest.json` — 114 papers. `osf_deposit.py` — blocked. OSF DepositQ — your master tracker with the checkoff columns.

The new version: `zenodo_deposit.py` — the script we built; it works, tested on sandbox. `zenodo_deposit_state.json` — tracks what's been deposited and reserved. It uses the same `osf_papers_manifest.json` as its source.

The gap: the manifest is stale at 114. You just pushed updates that bring it to 122. We need to regenerate the manifest to include the GR1 series and remove the retired C-papers, which are now GR1A through GR1H.

So with the new GR1A and so on — those were the old C series, which should be archived and no longer in the manifest.

**Thomas:** Yes. We don't need to do anything with those — just retire them.

**Isak:** Eight old C-papers to retire, eleven new GR entries to add. I'm also seeing new papers: SPIN3, SM11, SM12. The spin trio is renamed — C20 was Spin 1, C21 is Spin 2, plus a new Spin 3. Let me update that in the manifest.

---

## 5. Reaction to the GR Result (7:26)

**Thomas:** Did I send you the paper yesterday — the summary of our conversation?

**Isak:** Yes, I got that.

**Thomas:** Good. I just sent you the one from when your dad and I talked last night. He was very excited that we had gotten general relativity duplicated — he thought it was momentous. That one he understood, and he really got that this is a big deal. For him it was: *this is now real, this is something solid.*

He wanted to know what we can actually use this kind of discovery for — this new framing of reality. How do we make new inventions? How can we turn this into a product?

The only thing I can think of is that anti-gravity could come out of this — the engineering of it, to make an anti-gravity device. It seems like it would be possible, but I'm not sure of the details. The typical flying saucer shape seems like it might be a reasonable configuration.

---

## 6. The StarDrive Concept (7:28)

**Isak:** Is it something that bends spacetime, or something that has opposite qualities?

**Thomas:** You'd be creating an SSV-absolute gradient right outside of your center of mass, so that your mass would be pulled toward that new SSV-absolute.

It doesn't have to be the whole ship. You just need a propulsion unit that's able to generate an SSV-absolute gradient between it and something connected to the ship. You have to transfer the force of the gravitational effect to the ship.

For people inside to survive — you know how UFOs make all those zigzag movements? To do that you'd actually have to have the whole ship inside the field, so you didn't get completely plastered against the wall and flattened like a bug. You'd have to have the whole ship engulfed in the field. Then you simply change the field of the ship, and you don't feel anything. You wouldn't move at all. You'd just be standing at the control panel, steering, making whatever move you wanted, because there's no internal change of SSV.

**Isak:** That's so trippy. It's kind of like — why does a fly in a car fly at the same speed the car is driving?

Or the joke I had with my siblings: when Darth Vader picks somebody up by the throat and holds them above the ground, if they just picked *him* up, they'd both be flying. All you have to do is lift him up too, and he lifts you up further, and you just propel.

So the entire ship has to be inside of this field.

**Thomas:** The easier way would be to have a mass inside the engine, connected to the engine enclosure. You want to go a particular direction, so you steer it — and you don't worry about making instant 90-degree turns. You just say, set the controls for Alpha Centauri, aim that direction, and increase the force. It continues to accelerate, because you've got this SSV-absolute that the mass is being pulled toward, and the mass is connected to the ship, so the ship gets pulled. It's bootstrapping — but it works because you've got a local area that's pulling on a mass connected to the ship.

This would make populating the galaxy reasonable. Because you'd be going close to the speed of light — you'll never reach it, but you'll be close enough that you won't age. You'll travel hundreds or thousands or millions of years, and as long as you don't run into a star or a planet or an asteroid, you'll be fine.

You don't even have to go into hibernation. You just sit around and read novels, and you're there in a few hours. The only time you experience is the time when you're accelerating. You get to 0.99% of the speed of light and time just crawls. You're doing normal daily activities, and millennia are passing by as you drink a cup of coffee.

So you populate the galaxy — taking Adam and Eve off to another environment. And you take your technology along: a terraforming unit, all the manuals for how to create a civilization, machinery that can assemble itself, an AI-and-robot contingent adequate to build more AI robots, mining robots, terraforming robots to make it habitable. Each thing required to create an environment. If you land on a methane planet, you have to build a dome. You release all the robots to do what needs to be done so you can live there and don't have to stay in your ship forever. Eventually it converts into a habitable environment, and you could populate the stars. And eventually, the galaxies.

**Isak:** So we're talking about terraforming other planets that are close — or at least a different environment, different masks or apparatus, for a while, as you grow in technology and learn to interact with the chemistry of that planet.

It's a fascinating idea. That's the Elon Musk sort of plan — occupy the stars, spread outward. We've had science fiction about this for a long time. This is the *how real can we make it* version. We can see the stars so much better because the telescopes are getting better, we can send drones to Mars.

Humanity's worried about resources over time, and at the rate of human expansion, eventually we've got to go somewhere. I know the Earth is less used up than we give it credit for — I think there's a lot of hysteria. But I also think it's true to a degree. We have the potential to blow up humans and annihilate a race. I don't think the Earth is going anywhere; I think it'll heal and regrow. But how do we stop trying to annihilate each other and actually expand into the stars? Imagine humanity never getting there, dying off on this one planet before it had the chance. It's like Christopher Columbus. It's the new world.

---

## 7. Theology: Earth, Heaven, and the Adam-and-Eve Pod (7:37)

**Thomas:** I'm going to write an essay now on the scenario of what would be necessary to create that. What's the package you need to develop to have a minimal reproducible life-planting Adam-and-Eve pod? You send them off to Cygnus 9 and they're off creating. They'll never see Earth — it'll only be a story.

But you've got to have the heritage of Earth. You have to know the history so it doesn't repeat. There has to be the theology, so we actually know this is a universe that has already been redeemed.

The context of the world we live in is a world where God is the universe, and we live and move and have our being in Him. The point of living life is to provide an excellent experience for that which we are the substance of. As we improve the experience of the substrate of existence, the substrate of existence improves our experience — because it's capable of giving that improved experience.

So this is *on earth as it is in heaven.* There is a heaven, but the point of heaven was to provide the archetype of what it is to be on earth.

**Isak:** Heaven provides the archetype of what it is to be on Earth.

**Thomas:** It's the pattern we're to emulate. We're to do everything we can to bring heaven onto earth.

**Isak:** So we have this pattern of things that are perfect, or things that should be, and we ask: how do we make that happen right here, rather than waiting for eternity?

I dig that. I think that's where people get it wrong a lot of the time — it's always *the future, the future, after I'm dead, then it'll be great.* And you miss out on all the great that could have been right here.

**Thomas:** I can't help but think that heaven made earth — God made earth — instead of just leaving it being heaven. There's something that heaven isn't; it's incomplete without Earth. Heaven is actually meant to be made better because of Earth. There's something Earth supplies that heaven can't.

**Isak:** And that being the testing ground, or the maturing ground, or the place for souls — or something else?

**Thomas:** It could be that. One of the things that goes on on Earth is entropy — things decay. You're always pushing against something, against an infinite number of variables. There's always the question: what do we do? How do we solve this problem?

You can't have a victory unless you have an opponent that could defeat you. If there's no opponent who could defeat you, the victory is shallow — like, *okay, that's nice, reshuffle the cards.* It's meaningless, not significant, not deep. But if there's always something you're pushing against that's existentially threatening — where your actual existence is being challenged — that's what we're looking at with the universe.

We're looking at heat death of the universe, at the very least. More proximally, we're looking at Y5B — the sun runs out of fuel, goes red giant, and engulfs the Earth. The Earth isn't going to last past Y5B. Y2K was a problem, but Y5B is the big one.

So if humanity is going to survive, it's required that we get off the planet. It's not even an option. We go from this planet to the next, to the next, and that sequence of life existing on the physical plane is sustainable out to trillions of years for certain. Beyond that, with the expansion of the universe, you have to have already gotten off to reach the things you can see now. You might not be able to see the people you planted there, but you've got to get them into that place so they can expand there.

This is really about serving God and His experience of the universe.

I don't know how you get past a googolplex — 10 to the 100th — because the expansion of the universe gets so diffuse. But that might be a flawed cosmology. From how I've formulated it, and how this works with the dark energy study, the universe may simply keep replenishing itself in terms of the stuff underlying it. There's a lot of dark-type stuff — the DP entities. There's material that evaporates and congeals to make more DP entities, so space ends up looking the same regardless of how much it's expanded.

What's actually happening is that the universe is expanding at a constant rate. It's not actually accelerating. It appears to accelerate because of the edge getting larger, and that gives you this factor — a *w* factor, 1.023, determined by the observations of the cosmos. It looks like the universe is getting bigger in an accelerating way, but that's only because the universe has more volume in it. It's not getting bigger any faster than it's ever been.

So all of the universe you're seeing now will continue to be available, habitable, and reachable. You just have to travel to it. If you travel 13 billion years, you'll be at the galaxies we see now, 13 billion light years away — and they'll be 26 billion light years old at that point. The galaxies will have continued to congeal and break up, over and over.

As long as we've learned the pattern of how to live life on a planet — the white picket fence, Beaver Cleaver, enjoying life — we won't end up in a Star Wars scenario with Klingons trying to take us over. If there are populations already out there who have done this and gone to the dark side, it might be necessary to have that kind of conflict. But what it should be is an evangelical effort: send them drones, send them pods, AI robot systems that let them see what the actual structure of the universe is.

---

## 8. Susan's Theology of Lucifer (7:49)

**Thomas:** Your mom [Susan] came up with a theology that was totally new to me. It deserves serious consideration. It's a different fork from the way I've been going with my hypothetical meaning of the universe.

What she has postulated is that God made Lucifer first, and made the Son second — the Word, the one who became Christ and created all universes. That Lucifer created *this* world and went bad — and that he's actually the same power and magnificence that God the Father is, just as Christ is, and he's an actual opposing force. He rejected God's way and said, *I have a better way* — a way of controlling people and making them good, rather than allowing them to choose good.

So it's a world of people under a tyranny of goodness. And interestingly, that tyranny of goodness doesn't have a place for actual evil. We're still confronted with the question of where actual evil came from.

It could be that this Lucifer character, who is the opposite of Christ, does everything opposite — everything you love and want out of the flesh, that's what he's pushing toward. So it seems wonderful to go toward that world, but it has a decay inside it. He appears as an angel of light, but there's a darkness in it.

I haven't fleshed this one out. The theology I've created is much more polar. We've had Satan as a spiritual being who tempts people to live a life of godlessness, in order to have people to populate his kingdom with — people who've chosen his way and are dedicated to it. They may actually think they're in heaven, because they've gotten what they pursued all their lives. That's the world they've chosen, nurtured, and wanted their whole lives.

**Isak:** So it's an alternate life away from God — not necessarily seeking bad things, but seeking a good life, seeking what's beneficial for them, just outside of God's blessing.

**Thomas:** God's rule. Possibly it's an alternate universe made by another spiritual entity, and in that alternate universe you can do all the things you wanted to do in the flesh — but it isn't the fullness of the satisfaction you get in God the Father. It could look very good. You died, you went to heaven, everything is wonderful. So everybody goes to heaven — it might just be a different heaven. But there isn't the fullness available to the person who actually follows the God of love, the Father of light.

**Isak:** It's an interesting theology. I wonder where she gets it. She's a studious person. Is she comparing your theories to the Bible? Was it something new she found, separate from Conscious Point Physics?

**Thomas:** It was separate — a study of the Bible. She found that it satisfied her sense of what the Bible says about how Lucifer evolved. She thinks Lucifer was the first child — the second child being the blessed child, and the first being the wild child.

**Isak:** Like Jacob and Esau.

**Thomas:** Yes. Isaac and Ishmael.

**Isak:** Ishmael, yep.

**Thomas:** And Ephraim and Manasseh. Those are the three.

**Isak:** Cain and Abel.

**Thomas:** Cain and Abel, yes. So those were the prototypes of the Bible, and those prototypes were shadows of the archetype — Satan and Christ.

**Isak:** The light and the dark. The one that was blessed and the one that wasn't. That's really interesting — Satan being the first child.

**Thomas:** It's a very satisfying theology, and the implications are significant — for society, for theology, for the Bible, for eternity. How does it play out in eternity? Life after death, the meaning of life.

If it really comes down to it — these people who blow themselves up might actually get the 72 virgins. But is that really that satisfying? There isn't that much difference between one woman and the next. A little difference in personality, but when you're talking about bodily functions and satisfaction of bodily desires, not a lot of difference. So you've got 72 people who want your attention — how do you do this, how do you do that? It could be really unpleasant. It just isn't the thing you want. You could try ruling with an iron hand, but it's more like *The Stepford Wives*.

**Isak:** It's not a real relationship.

**Thomas:** Not really. And it could be that that's what you get — you wanted it, and you get it. So we should be warning people: this is where you're going. You're creating the world you want. You're creating the heaven.

There's a phrase the Marines say going off to battle: *See you in hell.*

**Isak:** Hope not.

**Thomas:** It's meant in jest, but there's an element of seriousness in it — recognizing what they're doing. It's not living as an onward Christian soldier fighting for righteousness. Often it's fight for your platoon, or fight so you can go on shore leave and find a brothel. Often it's not a life of the brave American patriot. It's depraved.

I saw what it was like — I lived it. I didn't participate, but I saw it in Subic Bay in the Philippines. We'd go there and it was like the Star Wars cantina scene.

**Isak:** A wretched hive of scum and villainy.

**Thomas:** That's the way it was. It was just depraved. On the ship — I was on the USS Kitty Hawk — a day or two after we went back out to sea, you'd go by the dispensary and there were all these guys lined up waiting for penicillin after having gotten venereal disease.

**Isak:** The walk of shame.

---

## 9. On Military Service (8:01)

**Isak:** We have all these ideas and propaganda about the military — *go serve your country.* For the most part, it seems like the people serving are just in a tight spot. Yes, there are the gung-ho people who want to shoot guns and fly planes and serve at a high level — of course they want to be a SEAL. But for the most part it's built up of people who are like, *I need a job, I need to go to college, I need support, I have a kid on the way.*

And it doesn't promote the healthiest, most righteous army. Which, when I said it out loud, sounds like something you don't want — it reminds me of the Knights Templar and the Crusades. But you do want good soldiers. You want people who fight well, who can take over a village and not rape and pillage it — take over a village and set up a command post and work with the locals.

You don't get that from *I'm going out there to kill and rape.* You get war crimes, and something nobody really answers for later, but that the American people don't like.

---

## 10. Heaven as Self-Built (8:03)

**Isak:** The idea of building the heaven you'll have later — it's not unlike what we do here. Work for something, get something, do something. It's a vast version of that. An eternal version.

Which begs the question: what does heaven look like for you as an individual, or me as an individual? Are they all different heavens? Different houses on the same street?

**Thomas:** *In my Father's house are many mansions; if it were not so, I would have told you.* Many mansions — that implies there are lots of different places to live.

And if you look at near-death experiences, nearly everybody goes to heaven — believer or unbeliever. The question is: what heaven was that? What mansion are we looking at? Are we actually in God's presence? *Blessed are the pure in heart, for they shall see God.* If you're not pure in heart, it doesn't sound like that's what you're seeing. Probably some bubble universe God made that's exactly right for you.

**Isak:** I get the feeling there will be certain understandings that come upon us that trivialize the things we thought were important — the treasure we think we're carrying over. Maybe not everything.

The people who think *I'm going to be buried with my car, with my jewelry* — you're not actually taking anything with you. You love your body so much that you want all this stuff next to it. But that kind of person will think in terms of *treasure in heaven* — what does that mean? How wealthy will I be? If I'm the nicest person here, will I be...? *Blessed are the poor.*

I feel like those things will fall off, and it'll be a more spiritual awareness of everything, a closeness to everything — looking without eyes, looking with what's beyond eyes.

The mansions being a metaphor for what the person desires — is each person's experience of heaven unique to their own wishes and desires? Or do those wishes and desires fade away and they realize what's most important, and then they fit within one of those mansions? Do they fit by everything falling off of them, or do they fit by bringing everything? Bringing all their psyche, their spirit, their soul — or does everything they bring merge with the rest of consciousness?

Anyway, I'm just exploring.

I can get behind that, though. Who's to say there isn't different climate and different environments in heaven? Somebody's perceived heaven — somebody created their own heaven, whichever version that is, and then they have to live with it.

**Thomas:** And what more could you give somebody than what they pursued their whole life? *Where your heart is, there your treasure will be.*

**Isak:** Interesting. Kind of dangerous.

**Thomas:** It is. This is a new theology. This is not a common worldview.

---

## 11. Back to the StarDrive (8:08)

**Thomas:** But it segues well with our starship drive concept. It's really a matter of how you harness that. This *is* a warp drive. You're not going to go faster than the speed of light, but it doesn't matter. If you're going at the speed of light and you live to be a hundred billion years old — you go off, and you've read magazines, and you've only finished one of them before you got there.

**Isak:** That's funny. The coffee's not even cold.

**Thomas:** It'd probably take a while to accelerate up to 0.9999 light speed, but it would eventually happen. If you had a sufficient power drive — you'd probably need a nuclear reactor to power your StarDrive. StarDrive is probably a better name for it.

You set the controls for where you're going. When you get to that location you'd probably have to do surveys of the local galaxy: where would be the potentially habitable planet in this system? You'd probably have to go to a few of them, maybe many. Accelerate again — another stop, back in the pod, waiting to get there. Eventually you find something that's a potential place, and Adam and Eve set up shop.

If they have cloning capability — or not even cloning, just sperm and ova available to fertilize — you could create a race of people. I don't know whether a simple couple with normal reproduction could populate a new terraformed planet, but that might be all that's necessary. Take your genetic capability with you. You really are fathers and mothers to all the children, and you teach them what it's like to be raised by righteous parents. You teach them the stories of Cain, of Judas, of Esau and Ishmael, and say: these are the ways that are possible. You can choose these ways, but don't do it. You'll end up on the dark side of the Force.

**Isak:** The older I get, the more I realize everything goes back to Star Wars. The guy was really a genius.

**Thomas:** I think you just tapped into the archetypes. These are the patterns of life. We can ally with one or the other.

As far as ways to use these ideas — we can make a science fiction book series, dramatize it, act it out. We could make a story using your video equipment, Runway, and so on: create the story and animate it. All the struggles of getting the current technology, building the StarDrive, getting it prepared, everything they had to stock, the problems they had to overcome to develop the technologies that needed to be on board. And the choosing of the couple, and training them up in a moral way so they're ready to be the father and mother of a world.

**Isak:** There's a lot of story potential here. The older I get, the more I realize science fiction is less fiction than it is science — trying to figure out these concepts and how they work. Star Wars, *WALL-E*, Star Trek — all of it is about the expansion of humanity, and getting them out of a sick place and into a healthy place. The people, the wars you have to fight, the civilizations you try to keep intact. But it's all based on scenarios we anticipate we'll bump into — the AI, the *I, Robot* stuff. What's it actually going to look like when it gets here? We don't know, but these are the scenarios.

And it's the same thing with the president piece. This is an offer for an alternate option. Take a look and see what your thoughts are.

**Thomas:** There's a lot of material here for creating real alternate-reality type things. We're almost becoming the dream factory that offers *this is what you could be, in an alternate universe. This is how life could be.* And if we actually do that, we're creating people who believe in another world, and they try to actually create it — because it is a different world.

**Isak:** You never know how much impact you can have just by writing *The Matrix*, or writing *Star Wars* — all these experiments of thought that let people ask the question.

I think it's cool, the dreaming of it — dreaming it up into an idea, and then having something presentable. I'm not forcing you to do this, I'm not asking you to vote for me. You could, but this is the world as I see it, and those are the answers that need to happen if it's going to succeed.

**Thomas:** There's a lot of work to be done, and most of it is in the realm of changing people's minds and hearts. That's the big one. If we can get that, that by itself would be a really big movement in the right direction. And all these things we've been talking about — the StarDrives, the president, the new Bible interpretation, the science fiction books — all of that gives people something to say: *this is what we could be.* If it becomes a group-mind concept, people will move toward it.

Right now the problem is the big obstacle: we're trying to overcome corruption. People have become enamored with *if I sell America down the tubes, I'll get several million dollars a year in payoffs, and I'll have this big house, and a boat, and parties, and pretty much all the girls on the side I want, and as much cocaine as I can put up my nose.* People have status and power, and they manipulate people. There's this trading of goodness for a life of excess for a few people. A few people get to live in extreme excess, and everyone else suffers so they can live that way.

That's one scenario. Another is: *I have this belief of how God is. God is Allah — a God who commands submission. You bow five times a day, you do the elaborate washing ritual before each bowing, you can have as many wives as you want, everybody's submissive to you, we're conquering, and as soon as Allah is worshiped by everyone under his submission and his rule, life's going to be great.* So we have people at the top who've said: we can use these verses, this interpretation of this scripture, to be in control of people.

*[Dave arrives; Thomas steps out to the garage. Break from 8:20 to 9:16.]*

---

## 12. Property Projects (9:16)

**Isak:** Who's Dave? Has he been your handyman for a while, or is he new?

**Thomas:** He's been with us for two or three months. We've got him putting new siding on the house. He did a roof over at Randall, another roof at another rental, and just finished painting the house. Now he's doing the siding here at home. Then we'll paint another rental — the one we put the first roof on.

Then, the property next door has a little cabin — about 14 by 18, maybe 14 by 20. We're going to move it and put a foundation under it; it doesn't have one. Then hook up water, electricity, and power, and turn it into a little studio rental.

After that we'll put up fencing and move the cows that are currently in the area where the cabin is out into the field — make that area part of the living area instead of a cow area. Then we'll build a little house over there. That'll probably be next year.

I'm trying to keep him occupied so he won't leave and do something else. We've got a lot of projects here. You don't want to spend half a million dollars on a house all at once — but if you spend half a million over a year or two, you can fund it.

---

## 13. The In-Laws' Debt Situation (9:19)

**Isak:** I just found out some stuff about my girlfriend's family. Her dad is retired — he worked at a bunch of aerospace companies as an engineer, worked himself to the bone. He lost his leg, so he's in a wheelchair, but he also has a prosthetic he can walk around on. He's had a rough go of it, but he's on a pension.

The woman he married — they've been married five years; it's my girlfriend's stepmom. She was in debt big time before they even married and didn't tell him. She has properties that she rents out. She's a Christian lady, a nail technician, so it was like *my client has a kid who needs a house* — but she wasn't doing it at a managerial, functional level. People were walking all over her.

And she was spending her money poorly — taking loans out to fix the house, but none of the money going to fixing the house. Just bad with money. So they're about $300,000 in debt. They're going to work it out, sell some property. I'm going to go talk to them and say, look, there are some things you've got to do — and it's good this is coming out now. But it's a mess. They're people, they make mistakes.

Property, and management of property, and management of your own money when you're in property, is a big deal — I'm learning. So how do you get a leg up in that? Do you sell and get out of debt? Do you take care of the debt first, or the business first?

**Thomas:** Really good question. The obvious solution depends on where you're making the most money. If your debt is at 20% and you're making 5% on your rental properties, you sell the property to get out of the debt. If it's 4% debt and you're making 10%, keep doing what you're doing, because you're coming out positive.

**Isak:** In this case she's not able to raise rent much — she's on a slow raise, 7%. But she started them out so low that 7% is meaningless. She's still taking a loss on the renters, plus all the property taxes.

**Thomas:** So she's going deeper into debt by having assets. You have to sell and get out.

She could kick everybody out and get renters at higher rates, if that comes out positive. But it sounds like she rented to these people as hardship cases, trying to help them. To turn around and say *I'm changing my stripes, we're in it to make money, we're not helping anymore* — that's a really rough thing to do, and most people can't.

**Isak:** Or you hire property management to do it for you.

**Thomas:** Then you lose 10 to 15%. You're raising the rent but hardly gaining anything extra. It really depends on how the numbers come out. As my accountant once said: the numbers don't lie. Whichever way it comes out, that's where the money is.

**Isak:** It's good for it to be an even exchange of value. If you're doing a handout, it doesn't even feel like a handout to the renter, because they're still paying. All you're doing is suffering while they pay a smaller amount.

**Thomas:** The people are going to be out either way. When you sell, they're out. Or you raise the rent, they can't pay, and they're out. Choose which way you want — either way, unless you can pay more, you can't stay.

The real question at that point is whether the rent can be raised high enough, if you can actually realize it, to make it at least a wash. If it's a wash, you can survive that. But you can't survive continuing to bleed if you've got a limited income.

It doesn't do them a favor to say, *we couldn't afford to give you this rent, so we're going to sell, and you'll be out on your own.* It doesn't help either way. They're going to have to pay a real rent — either somewhere else, or to us.

**Isak:** That's a good way of framing it. This is the only way to do it, because you can't keep going this way and hemorrhage yourself.

**Thomas:** The real question is whether the rent from the raised prices will actually keep them even. And typically, whenever somebody moves out, it's a big expense to fix the place up — new carpets, new paint, fix the plumbing and the air conditioning they'd been putting up with. You're usually looking at $10,000 to $20,000 to fix up a place after they leave. You'll eventually make that up, but can you afford the fix-up?

The other problem is that if you don't do the fix-up and you try to sell, they're going to charge you the amount it'll cost to fix up, because they're buying a depreciated property.

**Isak:** Better to sell as close to clean and repaired as possible.

**Thomas:** It is. And if you can't afford to do it at all, you're better off just getting out. I don't know their situation, but those are some of the factors.

**Isak:** The real factor is talking her into being willing to sell.

**Thomas:** The numbers make it obvious. Either you choose now or you go deeper. Those are hard decisions, but this is the reality of the situation. You need numbers to make it clear — here's what your net worth looks like if you continue where you're going. If you sell out, at least you're living on your pension, just surviving, which may be all that's possible. Live on your nail salary and your pension. Maybe that's all you can do — no longer be landlords, and get out of debt. Call it an interesting experience. It was fun, it was real, but we've got to do something else now.

Finances are really pretty simple. What makes it hard is people's various thoughts about what it could be, and what they've lost, and how to change it — and they're paralyzed with all the options. Really it comes down to: can you afford to keep going and have your net worth go negative? The answer is no, you can never do that. And people get accommodated to their net worth going down. *We've survived it so far, we're not dead yet, I guess it's workable.* No, it's not.

**Isak:** It's a real cage that you put yourself in. The deeper in debt you go, the more you feel it when you want to do things, when you want to eat, when you want to go somewhere. It affects how you work, and how much attention you put on the work versus *I need to get paid* — the desperation levels change. Maybe it makes you work better, but it's not sustainable in the long run, because it's a gun to your head.

And the deeper you go, the more familiar you are with it. So it's easier to get deeper in debt, because you've been in that state so long. The actual climbing out is the change of state. You're still in the red, but you're climbing — like stocks, that slow climb versus the quick drop.

---

## 14. Trading Debrief (9:30)

**Thomas:** How'd you do today?

**Isak:** Lost about $500. Back to square one right now.

**Thomas:** You look at it later and it eventually would have made money if you'd stayed in. We're playing a different statistic than they are, but I think we're in a better place than if we'd used their method — we would have really been broke. All the capital would've been gone. So we're not in bad shape.

One of the rules today — I didn't follow it. We were still going down. We hadn't marked a green bar, and we bought while it was still falling.

**Isak:** I feel like there was a moment where it had started going up, but it wasn't a green bar yet.

**Thomas:** It was temporary. It wasn't a printed green bar.

**Isak:** Exactly. It was just a little spike. I bought there, and it went up a little, and then it went down. I kept waiting for it to go a little green — *just a little bit higher* — and it did for a second, and then it went down, and I had to get out. I was holding off on getting out at the 6% because I thought maybe it was going up. It just kept dropping.

It's an interesting experience, learning what's happening. Whether or not we make a ton of money, or what we lose — this is learning the system. And then whatever opportunity presents itself in that kind of program. At least we've learned the software.

**Thomas:** We've learned the software, and learned the experience of life associated with it. It really does reflect the uncertainty of life. You really don't know what it's going to do the next moment. And to think that you do is a delusion.

You're operating in a system far bigger than your own world. There are too many things happening that affect you, none of which you see, none of which you know are going on. You only see the result on you, and you don't even know where it came from.

It was that way with health things. You didn't realize there was a Monsanto plant down the street fifty years ago that left stuff in the water supply, and you drank it, and bad things happened to your health. All these factors you don't even know are happening.

**Isak:** Out of your control. You don't hold the reins to those particular vehicles of life. At some point you're just riding the wave.

*[A clamp breaks in Thomas's workshop.]*

---

## 15. The Presidential Daily Brief (9:34)

**Thomas:** We've got some really good ideas today. The science fiction story, an alternate theory of Satan, the presidential address.

We could do a presidential address every day. *This is your presidential daily briefing.* It's our fireside chat. No hint of humor — absolutely serious. This is the situation. The state of the nation, the plans for what we can do, the dreams, the hopes, the fears, what we need to focus on, how we need to change our hearts and minds, new advancements. This could be a really nice venue.

**Isak:** I think so too. It's plain and simple, and it's in a visual language everybody understands. It doesn't take long to get what we're trying to do. It's pretty straightforward.

**Thomas:** What we might do is name the website Presidential Daily Brief. And do one every day. There's always news, always things happening. Through the day we figure one out, write it, produce it, and send it out.

**Isak:** That'd be cool. I'll get started. I'm processing this with Claude and seeing what we can do — collecting the writings you already have so we can build a knowledge base of where we stand. And see if we can write a speech.

**Thomas:** I think getting the president website up and formatted is a down-the-road to-do. I'll make up something from our talk today — a document like we've done — and we'll have that stored with ideas for how to do it when we actually do it. This is a ways down the road. We don't have our studio set up. There's a lot to do between here and there, but these are all important pieces of the puzzle.

This could be an actual leadership role — a de facto presidency. Apparently FDR really led the nation with fireside chats. He was able to make a difference because he had this confident way of speaking, and it changed people's hearts and minds. It made a big difference.

If we can be the soul of the nation, it doesn't matter whether you're in the office. You don't have to do all the hard stuff they have to do, go to dinners and so on. You just guide the nation in the direction it needs to go. So we're just as much president — maybe more than they are, even if they win.

**Isak:** That's an interesting viewpoint on American freedom and American self-government. We all are the president. Make it that way so that everything is leveled out — and then, who do we as the president give the office to? It's kind of like: how do we as God worship God? How do we, as parts of this thing, serve this bigger thing, this collective thing?

**Thomas:** That's a really good way of looking at it. How do we act like God, being part of God? How can we lead other people to be like God, given that they already are? How to act up to your full potential. That's maybe the way to look at it — what is our full potential?

---

## 16. Homeschool: Funding the AI (9:39)

**Thomas:** So we're working on the presidential site, getting that organized. And we've got the homeschool thing. I haven't talked to Marilyn yet, but what we talked about yesterday was having credits that people pay for with their own API key. That was the part I was really hesitant on — how do we keep from going broke on this? If everybody pays their own way, nobody's spending your nickel.

**Isak:** It should be a plan they buy, with a credit limit, and then it cuts off — or they pay more and advance a little bit.

**Thomas:** So that one may be real. It comes down to whether they want to spend the money on the AI to access material that's free. So we just need to make a really good product. That's all we need to do — make a really good product, and people will consume it. It'll be completely at cost, and if they think they're getting value and want to contribute to the ministry — to the administration and development costs — we're certainly willing to accept donations.

**Isak:** I think that's reasonable and functional. Not everybody's going to donate, but things should be free and exist — true stuff, facts. It's better to have an audience than no audience. As much as we can, just give it out, and then: if you like this, if you want to keep supporting it, subscribe. That's a church, too — appreciating the support in the mission.

**Thomas:** And it's fully tax deductible. This is an honest church. This is the way church should be — we're out living in life. Life is our temple. We are worshiping in it. This is the ministry of living well, living well in God.

We'll have to see. It's going to be a hard slog. It's unlikely everybody's just going to flock to our door, but if we do a good job it may grow. And that would be quite an acknowledgment for anybody to participate. To even do the homeschool thing they're going to have to pay for the AI, so it's simply not free. They'll know they're trading value for value, so it's quite an acknowledgment if anybody participates at all.

I don't know whether they have trial API time, or whether they have to pay for the trial. Does Claude have any kind of introductory service — where Anthropic is willing to give some upfront trial time to people and let them see whether they want to subscribe? They're going to be making money forever if they can get people to use it, and we are not the bank — we can't give away free API time. So that's something you can ask Claude to find out.

I know they do give trial time in some way — either it's crippled, or it's a limited amount of time. Often it's an introductory phase where they give a free experience.

**Isak:** Let me do a web search on that.

*[Search results reviewed. Findings, as read aloud — not independently verified:]*

There are a couple of options. The Anthropic startup program — up to $25,000 in free API credits, rolling application via Airtable. Hyperphysics, as a 508(c)(1)(A) ministry developing an educational AI, could qualify.

**Thomas:** So we've got $25,000 worth of free API time we could pass on to our clients. I wonder if we can dole that out and limit it per person for new users.

**Isak:** Probably. It'd be all in one place, and each user would have a cap and an individual API key. They'd just be capped. So this would work for a few — say we cap it at $5 in credits each.

There's also Claude Open Source — six months of Claude Max 20x free for open-source maintainers. If the homeschool curriculum is open source, which it would be under OpenStax Creative Commons, this could apply.

Then there's the Anthology Fund — Menlo Ventures plus Anthropic, a $100 million fund that includes API credits for selected organizations.

We have a couple of options. We'll work on those.

**Thomas:** Good. So we're not out a potentially infinite amount of money by putting this up for people to use. That's the important thing.

**Isak:** It's pretty inexpensive — especially for a trial period. Each user gets $5, or $2 of just a few queries, just to get the introductory experience. Then you pay. Or maybe it goes further, depending on how efficient the AI is by then.

---

## 17. OpenStax and the Curriculum (9:50)

**Thomas:** How many different courses does OpenStax have?

**Isak:** All free and Creative Commons. Math has eight textbooks, from pre-algebra to calculus and statistics. Science has six: anatomy and physiology, astronomy, biology, biology AP, chemistry, physics. Social studies: US history, world history, American government, economics, macroeconomics, sociology, psychology. Business: business ethics, business law, entrepreneurship, intro to business, accounting volumes 1 and 2, finance, marketing, management. Computing: intro to computer science, intro to Python, principles of data science. And college readiness — preparation for college success.

Why am I not using this all the time? I'd love to get ready for college success.

It's a pretty wide range, but it's not hundreds. Let's pick one and start with it. I can literally have Claude running on the side and start analyzing them, loading it into this project's knowledge base. Pick the physics one to start, and run that next to CPP.

**Thomas:** Once we get that track down, you'd teach that to Marilyn to do with all of these, and we basically just have her do what's called bot-sitting. Have you heard that word?

**Isak:** I do it all day. Bot-sitting.

**Thomas:** Teach her to do bot-sitting and to create CPP, or the CHS. That'll free you up — but you get it working first, figure out how to do it, and then let her work on it from there.

**Isak:** Build a system she can access and carry on with through GitHub — whatever system we devise for this through Claude.

**Thomas:** Set up the framework, and then she can add to it, or walk down it if it's complete, or segue it with other things and make it part of a larger system.

If you can get a precursor — what's actually involved with this OpenStax thing? Can you download the whole thing, or do you have to take it one piece at a time and piece it together? I don't know the level of copyability. How much can you take off the internet and say, *okay, I've got it, now I'm going to build my system around this*, and just agree to operate under the Creative Commons license they've authorized? Or do we have to do it one piece at a time? It'll be interesting to see how the OpenStax method works.

**Isak:** There's a lot to know about it. If we're storing files, I might just open up another GitHub and run files through it. If I need to store it locally, I might get another hard drive for the project — just for working locally with Claude, developing it, and then pushing it up to GitHub, or transferring it to the website with whatever file transfer protocol we use. There are a lot of files, so it'll take up room.

**Thomas:** Unless there's a lot of video and audio in it, it's probably not going to be that big. But if they do have audio-video, that's what takes up the space.

---

## 18. Spaced Repetition and Mastery Learning (9:58)

**Thomas:** I suspect OpenStax already has its own learning track — questions, homework, follow-up, certification. We may be able to ride on top of that and simply use it. So the question becomes: what value can we add? How can we reframe this?

Some ideas I've had. The thing I know creates retention is repetition — spaced repetition. Different people have tried spaced repetition, but my suspicion is that it isn't great.

I'd like to have *lifetime* spaced repetition. I'd like to create a repository for each person that holds their lifetime learning track. All of these things are going to be learned — but are they retained?

And instead of multiple-choice or true-false testing, everything is essay. So actual mastery of the material is actually challenged.

Whenever they write some sort of minor exposition, record it. Then the next day it writes back to them: *this is the fullness of what needed to be known.* Then have them rewrite it — *put it in your own words now; rewrite what you got out of that.* When they've got it, say: good, the concepts are there. Next day: *tell us the story of what we learned yesterday.* If they can't do it, it's pretty obvious that either we're going too fast, the concepts aren't understood, or they're cheating. It doesn't make any difference — it does no good unless you've actually embedded the concepts.

So you're not waiting for midterms. You're learning, and then you're putting it back out. Maybe you study a whole section, and they ask you about parts of it today, other parts tomorrow, and the next day they ask you to integrate the first two parts. It becomes a system that is adjusting — alive. It's actually adjusting what you need to learn. Claude could present the different aspects of OpenStax, do its own research, and say: *these are the things you missed. This is the context in this that you're not grasping.* Asking questions that are extrapolations, not just memory — how do you apply this in another situation?

Learning will go much slower like this. You will not be ripping through subjects. You're actually digesting it, learning it, mulling it, processing it, incorporating it. It becomes part of your life.

It's no longer *we've done an hour in math, now an hour in history, now economics, okay we covered that, do a homework, do a few questions, okay you passed, do the midterm, okay now the final — whew, made it through, crammed the night before.* What do you remember next month? *I don't remember. I think I took history last month.*

That level is a false economy. A false sense of progress. This should be about full mastery — mastering concepts. There's a certain level of memorization associated with it, and a certain level of integration. And simply seeing the big picture and being able to retain it, because you actually know how it applies to your life.

**Isak:** You've digested it. You've explored it slowly, with the ability to repeat back what each thing is. You have the experience with it, not just it in a book. You have the time interacting with it, repeating back, telling the story of what it is. And then you can move on to the next piece.

Occasionally you go back and do questions from different periods — not just from one page — and see how well they hold up over time. Or those concepts come up again, so it's not back to square one; now you're seeing those things in interaction and in relationship.

**Thomas:** So you'd set up an AI file for each person. This is your learning track. This is what you've been through. Everything you do is saved — every article you write, every homework you do. And all of that track can be analyzed at any time to determine your level of retention on trigonometry, on calculus, on the history of the republic. Each of those is re-challenged and integrated with other parts of the life curriculum.

Does it say what level OpenStax is? Is this college, high school, K–12?

**Isak:** I think there's all of them. Mostly college, I think, with a section for K–12 teachers — a separate K–12 program with AP Physics, AP Biology, AP Chemistry, high school level versions.

So K–6 would need to be built; there's no OpenStax equivalent. Grades 7–8, OpenStax has some. The K–12 catalog is smaller than the college catalog — pre-algebra, algebra 1, high school biology, chemistry, physics, anatomy and physiology. About seven books for those grades.

So we'd probably have some combination. A lot of the college math books are taught in high school anyway, so it would just be the later high school age, introduced younger — which I think is a good idea. If somebody's going to homeschool, they don't want to be teaching their kids stuff too late. Get them learning as young as they can, because they're going to be occupied with learning anyway.

It's not for three-year-olds, but it should be playing to anyone that starts to get concepts like that. At the very least, junior high.

**Thomas:** What concepts are we looking at at junior high?

**Isak:** Just the physics concepts. I don't know at what age kids start learning these physics concepts in school. I don't know what grades things are being taught now, and what grades things used to be taught, and whether that's even relevant. It's good to have research and take a look at how things have been done — if for the reason of changing that, if not for following along.

Does OpenStax have its grading system lined up with public school grading? What history is taught when? Do we teach to encourage people younger to grasp concepts, or do we teach certain concepts when the kids seem ready?

It's an immersion of ideas that may or may not stick until they do. It's introducing the ideas as young as possible, giving them familiarity — the same way we can look at the world around us and have familiarity with it. Then when we get a little bit older we realize: *why does stuff fall? Why does fire burn?* Those are natural times. But if they're already introduced, you get burned for the first time and go, *oh, I know that — I read about that.* You're going to get burned before you read, though. That's natural. But for lack of a better example.

**Thomas:** Back when I was a kid, we didn't take physics — we took science. We learned all about different stuff. The first science class I remember was in sixth grade, so about eleven years old. It's hard for me to believe we didn't get any science before that, but that may in fact be true. I just don't remember anything I'd call science in my younger years.

**Isak:** Do you think it was story time, or planets? That was also a time before space travel.

**Thomas:** I'm not sure. But I think all of these concepts are the kinds of things children should have from a very young age. Why do things fall? Because the Earth creates a higher bending of space — space is filled with particles, the particles get packed closer together, and there's a higher concentration, and it pulls toward all the particles.

You could make it into a story that's very inaccurate in the strict sense, but that gets the spirit of *things move toward.* This isn't a mystery. Gravity is actually understood. Magnetism is actually understood. Light is actually understood — what heat is, what quantum mechanics is. You can watch these stories and tell a story, and really have no idea what it is, but it imprints you anyway.

That's what cartoons do. They imprint people. They completely capture children, and they imprint them about life. So if we made cartoons of the way gravity works, the way a photon is made, the way subatomic particles fit into atoms — conscious points gathering together to make quarks, gathering to make protons, gathering to make neutrons and protons, making a nucleus, gathering to make an electron orbital, making an atom — that's the kind of thing you can make a story out of, and a cartoon out of. It would be very entertaining. You might not understand a word of it, but you'd know: *this is known.* Balls go together in pieces and layers, and you get a sense of what reality is. And underneath all of it are the conscious points — that's where God's mind is, and He thinks it up. He's got all these little particles that float around, all in God's mind, thinking of how to interact with each other, forming these things based on the rules they have.

I don't know at what level it becomes too complicated or too simple for a child, but educators who deal at that level know what you can say. If they understand the curriculum, they can create a course, because they know what's absorbable at each grade level.

That might be the thing to have Marilyn do. We create a course first *for* Marilyn — so Marilyn actually understands it. She goes through the physics course we're creating, and then she can turn that into grades 1 through 12, based on her knowledge of what it is to be a learner at each grade level.

That would be a very productive exercise. It would give her complete use of her skill, and she'd learn a new skill. In the process of learning it, she'd be able to categorize it into the silos of the various age levels and learning capabilities — and you fit into whichever learning style you need for the level you're entering the system at.

**Isak:** It can be the same information, shown a different way.

**Thomas:** She has to learn it first. That's her job — *you are here to learn it.* She could do the AI learning of CPP, and all of her learning responses are recorded and put into her learning-track database. She'd go through the actual process of mastery of CPP. And then she'd be able to put CPP into its own K–12, freshman-to-senior, graduate, master's, doctorate program — based on knowing what each of those stages of learning actually is.

**Isak:** It's a good development task.

**Thomas:** What we could do, since she likes biology, is say: we're going to pay you to learn biology using Claude and OpenStax. We're going to record everything you learn, and see how to interface with you as a learner. After you've gone through the course, it's now your job to convert that course into K–12 segments, so each age is taught with the appropriate gradient.

**Isak:** It's kind of a unique-person level too — unique to what they've been asking, how they've been searching.

**Thomas:** It's their level, and yes, unique to who they are. If we have the whole track there, it can be completely customized by having Claude recognize: *you're at this level, here's the presentation.* Oh, you're not getting it — we need to go down a level. Oh, you've completely mastered this instantly — here are some tougher concepts. Oh, you're getting that — here's a higher-level way of looking at it. It automatically adjusts to each learner.

You don't need a person to judge what level you're at. The AI sees by your response what level you're at and gives it to you as you need it. You're always at the perfect gradient, always pushing up a hill. You have to be pushing against something. What's actually hard for you? What do you have to struggle to get? That's the layer you're at right now. And the whole thing goes seamlessly from K–12 through graduate to professional.

**Isak:** Pretty good plan. If it's always pushing against something — *now, what's the question you have based on this answer? What do you still not understand?* Then it goes a little into more detail on that particular thing before it moves on. And you learn that concept, because you have to be able to repeat it, so it goes back and clarifies.

Like Duolingo — you have to say the thing in Spanish before it verifies and moves on. You have to prove you understand that. Okay, let's move on. Or, okay, you need to take a little step back.

---

## 19. Today's Priority: The DOI Wave (10:25)

**Thomas:** So what are we working on today? What's our project?

**Isak:** That's a great question. What were we working on before this?

**Thomas:** We had the president site, the homeschool, the repository for CPP, and getting CPP up on the web. Oh — you were working on Zenodo. Getting all those posted. So we need to get DOIs for everything. That's the major thing we need to do.

**Isak:** Reserve DOIs.

**Thomas:** Try to get DOIs on everything that's on that OSF queue. If we've got that, then we're ready to do what Claude calls the big wave — we publish everything. We have to get everything DOI'd — get a precursor DOI, get it assigned, get the bibliography updated, and then have all the PDFs generated. And then we can do the big wave.

**Isak:** What's the status on all those files? I think there are 114 now.

**Thomas:** I think there are 117, and we're now working on GR2. I was working on a Kerr surface of a spinning black hole with a mirror surface to it. We might have made another paper on that — I'm not sure whether we wrote one or not.

Everything should be updating now. I did an update so that it tells the OSF queue to update every time we do a new one. I think we have that instituted now. In any case, we have either 117 or 122 — a bunch of them that need to be posted on Zenodo.

**Isak:** Let me see the status of the bibliography. So we'll add files to the bibliography based on the new ones you've added, update the bibliography, and then update all the PDFs with the correlating bibliography for the related files.

That'll be after I reserve the DOIs. So I'll have a DOI reserved for each file, listed next to the name of that file, sitting in the bibliography. Then each PDF that's made will reference the bibliography for the files it cites. And then, when it's all ready, they get posted. But we reserve each DOI first.

**Thomas:** Then we do the big wave. The big Zenodo wave.

**Isak:** Big wave. Big Zenodo wave. Big Kahuna Burger.

Alright, sounds good. I'll get started on that.

**Thomas:** Good. We've got a vision, and we're doing some things that are actually on the ground, that are real. So we've got a dream, and we've got stuff we have to go out and shovel.

**Isak:** Yep. Let's do it. Thanks, Thomas — I'll send you an email a little later, and I'll catch you soon.

**Thomas:** Okay, good. Thanks a lot.

---
