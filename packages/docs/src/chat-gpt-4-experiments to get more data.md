# Using LLMS to enhance improvisational theatre workshops

## Estimate time

This section explores how LLMs are performing in estimating the time required for various exercises.

### Freeze

Request:

```
You are a content producer in improvisational theatre. Given the following description of the exercise "Freeze" between the ===. Read through the text and provide a time assessment in JSON format with {"minimumTime": "<time in minutes>", "maximumTime": "<time in minutes>", "minimumTimeReason": "reason of chosen minimum time", "maximumTimeReason": "<reason of chosen maximum time>"}:

===
Everyone is involved, each scene is usually a two person scene.

Two players start and play a short scene. When a beat is reached, one of the non-participating players claps his/her hands and/or calls "Freeze!" The performers immediately stop and freeze in the pose they just have. The player who has clapped taps one of the two players and takes exactly his/her position. Then a completely new scene starts. The two players take their attitudes as a basis for their actions in the new scene. Usually the game idea for the new scene comes from the new player.

The excitement of the game is to copy the exact posture down to the last detail and justify it in a new context. A close observation of the scene and postures before the takeover is very important. So that this is possible, the scenes are to be played with a lot of physicality and posture changes. You should end the scene when a beat has just been reached, e. g. after a gag. If the players have also taken an exciting posture during this time, it's even better...
How to Start

You can start the game in different ways:

    You let one or two players "obstruct"by someone from the audience.
    The players move around the stage with their whole bodies confused and freeze after a clap from the audience.

Variations

    Blind Freeze: Players line up in a row, the first one with their backs to the scene. The second (or last) in the row sets the freeze, the first one turns around and takes over.
    Audience Freeze: Spectators are allowed to clap their hands and freeze.
    Before each new scene, a suggestion is quickly (!) requested from the audience.
    For all scenes a default suggestion or a certain theme has to be observed.
    Scene Marathon/Retro/Director's Cut/Reprise: In the context of an encore, elements (persons, situations) from games of the past performance are integrated into the freeze tag scenes (see Scene Marathon)
    In each short scene, sentences are read out from notes filled in by the spectators (see the game Whose line). It's also conceivable that there is a piece of paper left over at the end of the show that can be used as a remainder (see scene marathon).
    As a preliminary exercise we could recommend Statue - Scene beginning.

# See also: Scene marathon; Freezing; Miniscene chain; Places-switch
```

GPT-4o Returns

```json
{
  "minimumTime": "10 minutes",
  "maximumTime": "45 minutes",
  "minimumTimeReason": "The minimum time allows for at least a few rounds of scenes, giving all participants a chance to engage in the game, establish the basic mechanics, and perform several freezes.",
  "maximumTimeReason": "The maximum time accounts for more in-depth play with multiple rounds and variations, audience interactions, and ensuring every participant has multiple opportunities to engage, as well as allowing for potential encore scenes and integration of various elements like Scene Marathon or Whose Line."
}
```

Mistral Large

```json
{
  "minimumTime": "5",
  "maximumTime": "20",
  "minimumTimeReason": "The minimum time is set to 5 minutes considering that each scene is a two-person scene and should be played with a lot of physicality and posture changes. Also, the player who claps needs to observe the scene and postures before the takeover, and the new scene starts immediately after the freeze. Therefore, each scene should ideally last for at least 30 seconds to 1 minute, allowing for a minimum of 5 scenes in total.",
  "maximumTimeReason": "The maximum time is set to 20 minutes considering that the excitement of the game lies in copying the exact posture and justifying it in a new context. If the game goes on for too long, it may lose its novelty and become repetitive. Also, the players may run out of ideas for new scenes after a certain point. Therefore, a maximum of 20 scenes (with each scene lasting for 1 minute) should be sufficient."
}
```

### Funeral

```
You are a content producer in improvisational theatre. Given the following description of the exercise "Funeral" between the ===. Read through the text and provide a time assessment in JSON format with {"minimumTime": "<time in minutes>", "maximumTime": "<time in minutes>", "minimumTimeReason": "reason of chosen minimum time", "maximumTimeReason": "<reason of chosen maximum time>"}:

===
Funeral is an improv form that lies somewhere between longform and shortform. In addition to being a performance worthy, it is also used as a character exercise in workshops.
Contents

    1 Format
        1.1 Death intro scene
        1.2 Funeral service, flashbacks

    2 External links

Format

The Funeral format can be played with any number of improvisers. Perhaps 8 to 10 is a good number. The structure is the following:

    Death intro scene
    Funeral anecdote story
    Flashback to anecdote
    Return to funeral service, repeat

Death intro scene

The suggestion taken for the Funeral is a peculiar way to die. With this idea to work from, the first scene performed is one of the improvisers dying this improbable death. This scene should be relatively short, as it is launching pad for the rest of the form. The scene should be wiped when someone has died using the suggestion.
Funeral service, flashbacks

We are then taken to the funeral of this dead person, and the stage picture is as follows: the improviser who died, lying center stage in his/her coffin, and the rest of the improvisers on the back line, as characters from the dead person's life. One person from the back line then comes up to a pantomimed podium, and gives the beginning of an anecdotal story that they shared with the person who has died. It shouldn't be too full of a story - think more along the lines of a premise or suggestion.

It should be kept brief because, after they have given enough to inspire something, this monologuing improviser wipes the stage and takes us to that event. There can and should be multiple characters involved in each scene. After the scene has played out, someone wipes the stage, returning us to the funeral service, where another character from the dead person's life repeats this process.
External links

    Funeral service at Improv Encyclopedia
===
```

Response

```json
{
  "minimumTime": "20 minutes",
  "maximumTime": "40 minutes",
  "minimumTimeReason": "The exercise involves multiple scenes: an intro death scene, several funeral anecdotes, and their corresponding flashbacks. Even with brief scenes and transitions, the structure needs sufficient time to unfold and maintain coherence.",
  "maximumTimeReason": "Depending on the number of improvisers (8 to 10) and the depth of each anecdote and flashback, the exercise could take longer. Each anecdote requires setup, a flashback scene, and a return to the funeral, which can extend the time required to fully explore and perform the exercise."
}
```

Mistral Large Response

```json
{
  "minimumTime": "15",
  "maximumTime": "30",
  "minimumTimeReason": "The exercise involves a death intro scene, which should be relatively short, followed by a series of funeral anecdote stories and flashbacks. Each flashback scene involves multiple characters and should be played out in some detail. Given the structure and the recommended number of improvisers (8-10), a minimum of 15 minutes would be required to allow for a satisfying exploration of the format.",
  "maximumTimeReason": "While the exercise could potentially be extended indefinitely by adding more anecdotes and flashbacks, a maximum of 30 minutes would ensure that the exercise remains focused and engaging. This allows for enough time for each improviser to contribute a story and flashback, while also allowing for some variation in the length and complexity of individual scenes."
}
```

### Harold

Request

```
You are a content producer in improvisational theatre. Given the following description of the exercise "Harold" between the ===. Read through the text and provide a time assessment in JSON format with {"minimumTime": "<time in minutes>", "maximumTime": "<time in minutes>", "minimumTimeReason": "reason of chosen minimum time", "maximumTimeReason": "<reason of chosen maximum time>"}:

===
The Harold is a Longform developed by Del Close. The original form is described in "Truth in comedy" by Del Close and Charna Halpern. Based on this archetype, the Harold consists of the following phases:

    1.) A secular term or a one word suggestion is taken from the audience.

    2.) Intro: An association round of the whole group, verbally and non-verbally starting with a word from the audience.

    3.) Three very different, non-contiguous scenes are played with 2 players each. The 3 scenes have to do with at least one of the associations mentioned in the intro (2.) and should establish six characters. Usually no walk-ons, no edits.

    4.) Now the group game follows. Anything is possible here. Structure games (short forms), monologues, singing, exercises etc... Topics are addressed, which did not appear in the three stories of 3.) but have to do with 2.) or with the initial word from the audience.

    5.) Continuation and deepening of the three stories from 3.) by taking one of the characters, the world or a certain topic from each of the previous scenes. There can suddenly be connections between the stories or leg influences. It doesn't have to happen, but it can. Walk-ons and edits allowed, but shouldn't escalate.

    6.) 2nd group Game. Same as in 4.), but the previous stories from 3.)/4.)/5.) can and may influence the new one.

    7.) End of the 3 Stories from 3.)/5.). If it goes well, the three stories now join/overlap/complement each other thematically and/or in the characters.

    8.) Common End, which connects the stories. All games and forms of play are allowed.

The Harold is played by many improvised theater groups around the world and various variations have developed. The Harold is one of the first longforms in improvisation theatre history.
Tips and Hints

There do not necessarily have to be three games at a time, but four or five are also possible. If a story no longer exists, it does not have to be continued in 7.). Especially with a Harold you don't have to stick slavishly to the or a scheme!
===
```

Response

```json
{
  "minimumTime": "30",
  "maximumTime": "60",
  "minimumTimeReason": "The Harold is a longform improvisation exercise that involves multiple scenes, group games, and story deepening phases. Even at its most condensed, it would take at least 30 minutes to adequately cover all the necessary elements and allow for meaningful improvisation.",
  "maximumTimeReason": "Given the complexity and depth of the Harold, including multiple scenes and games, a performance can easily extend to 60 minutes. This allows for thorough exploration of characters and stories, audience interaction, and the natural flow of improvisational theatre without feeling rushed."
}
```

```json
{
  "minimumTime": "25",
  "maximumTime": "45",
  "minimumTimeReason": "The Harold involves multiple phases, including audience interaction, association rounds, scene establishment, group games, scene continuation, and a common end. Each of these phases requires some time for setup and execution. Given the complexity and the number of scenes, characters, and games involved, a minimum of 25 minutes would be required to give each part sufficient attention without rushing.",
  "maximumTime": "45",
  "maximumTimeReason": "While the Harold is a longform improv structure, it's important to maintain audience engagement. If scenes, games, or associations become too drawn out or overly complex, the audience may lose interest. Therefore, even with room for exploration and development, it's unlikely that a Harold would exceed 45 minutes."
}
```

## Find matching exercise goals

Some inspirations for that:

```
Yes, And
Being present in the moment
Impulse & Spontaneity
Listening
Making & Accepting Offers
Taking Risks
Trusting Yourself
Failing Joyfully
```
