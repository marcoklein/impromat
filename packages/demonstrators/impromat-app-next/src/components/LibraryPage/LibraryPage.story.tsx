import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { LibraryPage } from './LibraryPage';

const testData = [
  {
    id: 'cefef71f-b329-4054-b552-5a2a436fd7b3',
    name: 'Freeze',
    tags: [
      {
        name: 'game',
      },
      {
        name: 'Handle',
      },
      {
        name: 'Cold',
      },
      {
        name: 'pose',
      },
      {
        name: 'replace',
      },
    ],
    markdown:
      '**Synonyms**\n\nClap. Switch. Freeze Tag.\n\n**Introduction**\n\nTwo performers will start a scene and at anytime another performer can yell “freeze” and replace one of the performers in the scene by assuming their frozen pose.\n\n**Description**\n\nFreeze is the single most famous structure in improv comedy. Freeze takes an ancient playground game and turns it into improv comedy theatre gold. If you are not familiar with Freeze Tag as a handle it is recommended to check out the exercise Freeze Tag.\n\nIf you need this one explained you have never seen or done improv (welcome of course!). When a freeze is called all performers in the scene must immediately freeze in whatever position they find themselves in. The audience is watching. When performers “play on” after the freeze a big of the magic is rubbed away. The best yield in this handle is for the performer to quickly move on stage and immediately copy one of the frozen performers. The performer that was copied leaves the stage. The more exact the copy of the pose is the more fun will be had.\n\nOnce there is a new performer onstage in the precisely copied pose the scene continues. There are many branches at this point. In the Freeze Tag-Exercise a brand new scene is started informed by the new performers pose. In a performance the narrative is more important and the scene should continue with the new performer introducing a new twist on the scene happening.\n\n**Gimmicks**\n\n*   Freezing a performer in a challenging physical pose and leaving them there.\n\n**Variations**\n\n*   Audience Freeze – Audience calls the Freeze.\n*   Space Jump – Specialized Freeze structure where performer are not replaced but increase in number.\n*   Freeze For All – When freeze is called any number of performers can jump on stage replacing any number of performers.\n*   Endowment Freeze – Each freeze is endowed with a location, emotion or genre. May actually be easier than standard Freeze Tag for some.\n*   Eyes Closed Freeze – The off stage performers closes their eyes to they have no information about the pose.\n\n**Credits**\n\n*   None.',
    languageCode: 'en',
    sourceUrl: 'https://www.learnimprov.com/freeze-games/',
    sourceName: 'learnimprov',
    sourceBaseUrl: 'https://www.learnimprov.com',
    licenseName: 'Creative Commons 4.0Attribution-ShareAlike 4.0 International',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    createdAt: new Date('2023-03-14T21:21:28.502Z'),
    updatedAt: new Date('2023-03-14T21:21:28.502Z'),
  },
  {
    id: 'f444efa4-aef9-4bf1-90f6-b995874420bc',
    name: 'Freeze-Endowment',
    tags: [
      {
        name: 'game',
      },
      {
        name: 'Handle',
      },
      {
        name: 'endowments',
      },
      {
        name: 'Cold',
      },
      {
        name: 'pose',
      },
      {
        name: 'replace',
      },
    ],
    markdown:
      '**Synonyms**\n\nClap. Switch. Freeze Tag. Environment Freeze\n\n**Introduction**\n\nTwo performers will start a scene and at anytime another performer can yell “freeze” and replace one of the performers in the scene by assuming their frozen pose. At each freeze a new element will be added to the scene\n\n**Description**\n\nFreeze is the single most famous structure in improv comedy. Freeze takes an ancient playground game and turns it into improv comedy theatre gold. If you are not familiar with Freeze Tag as a handle it is recommended to check out the exercise Freeze Tag.\n\nIf you need this one explained you have never seen or done improv (welcome of course!). When a freeze is called all performers in the scene must immediately freeze in whatever position they find themselves in. The audience is watching. When performers “play on” after the freeze a big of the magic is rubbed away. The best yield in this handle is for the performer to quickly move on stage and immediately copy one of the frozen performers. The performer that was copied leaves the stage. The more exact the copy of the pose is the more fun will be had.\n\nOnce there is a new performer onstage in the precisely copied pose the scene continues. There are many branches at this point. In the Freeze Tag-Exercise a brand new scene is started informed by the new performers pose. In Endowment Freeze the host will turn to the audience to get a new endowment for the scene. The performers will immediately adapt the suggestion and continue the scene.\n\nThe host must be efficient when engaging the audience. It is suggested that host prime the audience with one type of endowment for the scene. For example, each freeze may indicate a new environment. Typical types of endowments include:\n\n*   Environment\n*   Emotions\n*   Film Genres\n*   Textiles\n*   Weather\n*   Occupations\n\n**Gimmicks**\n\n*   Freezing a performer in a challenging physical pose and leaving them there.\n\n**Variations**\n\n*   Audience Freeze – Audience calls the Freeze.\n*   Space Jump – Specialized Freeze structure where performer are not replaced but increase in number.\n*   Freeze For All – When freeze is called any number of performers can jump on stage replacing any number of performers.\n*\n*   Eyes Closed Freeze – The off stage performers closes their eyes to they have no information about the pose.\n\n**Credits**\n\n*   None.',
    languageCode: 'en',
    sourceUrl: 'https://www.learnimprov.com/freeze-endowment/',
    sourceName: 'learnimprov',
    sourceBaseUrl: 'https://www.learnimprov.com',
    licenseName: 'Creative Commons 4.0Attribution-ShareAlike 4.0 International',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    createdAt: new Date('2023-03-14T21:21:28.502Z'),
    updatedAt: new Date('2023-03-14T21:21:28.502Z'),
  },
  {
    id: 'c15fd7da-94fb-404e-9d9a-9f8b3b3ce433',
    name: 'Freeze Tag',
    tags: [
      {
        name: 'game',
      },
      {
        name: 'Switches',
      },
      {
        name: 'Chain Games',
      },
    ],
    markdown:
      'Everyone is involved, each scene is usually a two person scene.\n\nTwo players start and play a short scene. When a beat is reached, one of the non-participating players claps his/her hands and/or calls **"Freeze!"** The performers immediately stop and freeze in the pose they just have. The player who has clapped taps one of the two players and takes exactly his/her position. Then a completely new scene starts. The two players take their attitudes as a basis for their actions in the new scene. Usually the game idea for the new scene comes from the new player.\n\nThe excitement of the game is to copy the exact posture down to the last detail and justify it in a new context. A close observation of the scene and postures before the takeover is very important. So that this is possible, the scenes are to be played with a lot of physicality and posture changes. You should end the scene when a beat has just been reached, e. g. after a gag. If the players have also taken an exciting posture during this time, it\'s even better...\n\n## How to Start\n\nYou can start the game in different ways:\n\n*   You let one or two players "obstruct"by someone from the audience.\n*   The players move around the stage with their whole bodies confused and freeze after a clap from the audience.\n\n## Variations\n\n*   Blind Freeze: Players line up in a row, the first one with their backs to the scene. The second (or last) in the row sets the freeze, the first one turns around and takes over.\n*   Audience Freeze: Spectators are allowed to clap their hands and freeze.\n*   Before each new scene, a suggestion is quickly (!) requested from the audience.\n*   For all scenes a default suggestion or a certain theme has to be observed.\n*   Scene Marathon/Retro/Director\'s Cut/Reprise: In the context of an encore, elements (persons, situations) from games of the past performance are integrated into the freeze tag scenes (see Scene Marathon)\n*   In each short scene, sentences are read out from notes filled in by the spectators (see the game Whose line). It\'s also conceivable that there is a piece of paper left over at the end of the show that can be used as a remainder (see scene marathon).\n*   As a preliminary exercise we could recommend Statue - Scene beginning.\n\nSee also: Scene marathon; Freezing; Miniscene chain; Places-switch',
    languageCode: 'en',
    sourceUrl: 'https://improwiki.com/en/wiki/improv/freeze_tag',
    sourceName: 'improwiki',
    sourceBaseUrl: 'https://improwiki.com',
    licenseName: 'CC BY-SA 3.0 DE',
    licenseUrl: 'https://improwiki.com/en/lizenz',
    createdAt: new Date('2023-03-14T21:21:28.502Z'),
    updatedAt: new Date('2023-03-14T21:21:28.502Z'),
  },
  {
    id: '3c101eb6-66d5-4dc2-9e9f-d31d4f55cb95',
    name: 'Freeze Tag',
    tags: [
      {
        name: 'game',
      },
      {
        name: 'Switches',
      },
      {
        name: 'Kettenspiele',
      },
    ],
    markdown:
      '**Freeze Tag** ist auch bekannt als **Switch**, **Zap**, **Kettenimpro**, **Kinoimpro**, **Impro Total**, **Springmaus**, **Red Light - Green Light**, **Szenenmarathon**, oder **Abklatschen**.\n\nAlle sind beteiligt, eine Szene spielen immer nur zwei.\n\nZwei Spieler starten und spielen eine kurze Szene. Wenn ein Beat erreicht ist, klatscht einer der nicht beteiligten Spieler in die Hände und/oder ruft "Freeze!". Die Darstellenden stoppen sofort und frieren in der Haltung ein, die sie gerade haben. Der Spieler, der geklatscht hat, tippt einen der beiden Spieler an und übernimmt exakt dessen Haltung. Es startet ein komplett neue Szene. Die beiden Spieler nehmen dabei ihre Haltungen als Grundlage für ihr Tun in der neuen Szene. In der Regel kommt die Spielidee für die neue Szene von dem neuen Spieler.\n\nDen Reiz des Spiels macht aus, die genaue Haltung detailgenau zu kopieren und diese in einem neuem Kontext zu rechtfertigen. Dafür ist ein genaues Beobachten der Szene und der Haltungen vor der Übernahme sehr wichtig. Damit das möglich ist, sind die Szenen mit viel Körperlichkeit und Haltungsänderungen zu spielen. Beenden sollte man die Szene dann, wenn gerade ein Beat erreicht ist, z.B. nach einem Gag. Wenn die Spieler währenddessen auch noch eine spannende Körperhaltung eingenommen haben ist das um so besser...\n\nDie Spieler auf der Bühne sollten versuchen Ihr Spiel so zu gestallten, dass sie auch gut körperliche Angebote machen. Das macht es den außenstehenden Spielern einfacher, die Szene mit einem Freeze Tag zu unterbrechen.\n\nFreeze Tag wird oft auch als erstes Spiel in einer Show gespielt, da es vom Charakter her sich gut eignet "reinzukommen" und das Publikum versteht, wie Improtheater funktioniert.\n\n**Beginnen** kann man das Spiel auf unterschiedliche Weise:\n\n*   Man lässt einen oder zwei Spieler durch jemanden aus dem Publikum "verbauen".\n*   Die Spieler bewegen sich mit dem ganzen Körper wirr auf der Bühne und frieren nach einem Klatschen aus dem Publikum ein.\n\n**Variationen:**\n\n*   **Blind Freeze:** Die Spieler stellen sich in einer Reihe auf, der jeweils erste mit dem Rücken zur Szene. Der zweite (oder der letzte) in der Reihe setzt den Freeze, der erste dreht sich um und übernimmt.\n*   **Publikums Freeze:** Die Zuschauer dürfen in die Hände klatschen und freezen\\*\\*\n*   Vor jeder neuen Szene wird schnell (!) eine Vorgabe vom Publikum abgefragt.\n*   Bei allen Szenen ist eine Vorgabe oder ein bestimmtes Thema zu beachten.\n*   *Szenenmarathon/Retro/Director\'s Cut/Reprise:* Im Rahmen einer Zugabe werden Elemente (Personen, Situationen) aus Spielen des vergangenen Auftritts in die Freeze-Tag-Szenen eingebaut (siehe Szenenmarathon)\n*   Es werden in jeder Kurzszene Sätze vorgelesen von Zetteln, die die Zuschauer ausgefüllt haben (*siehe* Zettelspiel). Denkbar auch als Resteverwertung übrig gebliebener Zettel am Ende der Show (siehe Szenenmarathon).\n\nAls Vorübung bietet sich Statue - Szenenanfang an.',
    languageCode: 'de',
    sourceUrl: 'https://improwiki.com/de/spiele/freeze_tag',
    sourceName: 'improwiki',
    sourceBaseUrl: 'https://improwiki.com',
    licenseName: 'CC BY-SA 3.0 DE',
    licenseUrl: 'https://improwiki.com/de/lizenz',
    createdAt: new Date('2023-03-14T21:21:28.502Z'),
    updatedAt: new Date('2023-03-14T21:21:28.502Z'),
  },
  {
    id: 'f18cbc6b-af94-4633-95ee-05cfe80f1f7e',
    name: 'Freeze Tag-Exercise',
    tags: [
      {
        name: 'exercise',
      },
      {
        name: 'Exercise',
      },
      {
        name: 'warmup',
      },
      {
        name: 'Warm-Up',
      },
    ],
    markdown:
      '**Synonyms**\n\nClap Out. Freeze.\n\n**Introduction**\n\nPlease form a line with two volunteers front and center.\n\n**Description**\n\nAfter the pithy aphorism of Yes And, there is no greater staple of the improv teaching than Freeze Tag.\n\nThe leader encourages the two front and center players to begin a scene which involves some level of physical activity. Some of the classic ones are two characters fishing, two characters working on some chore. While there will be dialogue between the characters Freeze Tag depends on physical action.\n\nAt some unexpected moment the leader will call out freeze and the two players will instantly freeze in place. A player from the line will immediately approach either of the two players and tag them. The tagged player goes to the back of the line. The new player assumes the exact physical pose that the player they tagged was holding. The new player is tasked with initiating a completely new scene that reflects her acquired pose. This process can continue indefinitely.\n\nBy encouraging the players to assume the exact pose of the player tagged out this exercise can help improve their listening skills. There is an element of spontaneity encouraged as often players will find themselves in poses they could not have imagined themselves in.\n\nThe leader should watch for players changing their pose to reflect a preconceived idea. It is an opportunity to support spontaneity reminding the players that they need not judges their ideas and they will be supported on stage.\n\nThere are many default scenes that allow a player to justify any pose that they find themselves. Experienced players should be discouraged from from employing these standards. Implore them to take risks and commit to random ideas instead of safety.\n\n*   Fighting\n*   Dancing\n*   Adhesive accidents\n*   A model being painted\n*   Store mannequins\n*   Psychotic episodes\n*   Dream episodes\n\nFreeze Tag is often treated like a throw away exercise to fill space or end a workshop. This exercise is also used as a performance handle as an audience or player warm up. When Freeze Tag is played with attention to detail every aspect of improv comedy can be reviewed.\n\nPlayers must be \\*\\*listening \\*\\*to the pose and words of the preceding scene. The must \\*\\*accept \\*\\*the offer of the pose they are striking. They must \\*\\*commit \\*\\*to their first idea with decisiveness. The offer must be \\*\\*expanded \\*\\*upon, and this offer is often a physical one. Freeze Tag offers lots of teaching opportunities as many LACE elements are missed or demonstrated with this exercise.\n\nFreeze Tag is often and excuse to dispense with narrative elements. In an exercise that feels hurried the players, and audience, will still benefit from Settings, Ties, Explorations, and Propels. The scene is usually frozen before it gets to Sorting out.\n\n**Gimmicks**\n\n*   Don’t call freeze and let the players run through a scene.\n*   Rapidly call freeze before players can change the scene.\n*   Hold players in a compromising position by not calling freeze.\n\n**Variations**\n\n*   Endowment Freeze – Each freeze is endowed with a location, emotion or genre. May actually be easier than standard Freeze Tag for some.\n*   Structured Freeze – Player must always pick the stage left pose.\n*   Eyes Closed Freeze – The next player in faces away from the scene or closes their eyes to they have even less information about the pose.\n*   Audience Freeze – Audience calls the Freeze.\n*   Space Jump – Specialized Freeze structure where performer are not replaced but increase in number.\n*   Freeze For All – When freeze is called any number of players can jump on stage replacing any number of players.\n\n**Credits**\n\n*   None',
    languageCode: 'en',
    sourceUrl: 'https://www.learnimprov.com/freeze-tag-exercise/',
    sourceName: 'learnimprov',
    sourceBaseUrl: 'https://www.learnimprov.com',
    licenseName: 'Creative Commons 4.0Attribution-ShareAlike 4.0 International',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    createdAt: new Date('2023-03-14T21:21:28.502Z'),
    updatedAt: new Date('2023-03-14T21:21:28.502Z'),
  },
];

export default {
  component: LibraryPage,
  argTypes: { isSearching: { type: 'boolean' } },
  args: {
    searchResult: testData,
  },
} as ComponentMeta<typeof LibraryPage>;

const Template: ComponentStory<typeof LibraryPage> = (args) => <LibraryPage {...args} />;

export const Default = Template.bind({});

Default.args = {
  isSearching: false,
};

export const Searching = Template.bind({});
Searching.args = {
  isSearching: true,
};

export const Interactive = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<typeof testData>([]);

  const onSearchClick = () => {
    setIsSearching(true);
    setSearchResult([]);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult(testData);
    }, 3000);
  };

  return (
    <LibraryPage
      searchResult={searchResult}
      onSearchClick={onSearchClick}
      isSearching={isSearching}
    />
  );
};
