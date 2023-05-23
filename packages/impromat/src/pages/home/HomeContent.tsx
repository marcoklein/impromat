import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { arrowForwardOutline, information } from "ionicons/icons";
import {
  routeAbout,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";
import { routeLibrary } from "../library/library-routes";

export const HomeContent: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <IonText color="dark">
            <h1>Improving Improv</h1>
          </IonText>
          <IonText color="dark">
            <b>Developed by improvisers — made for improvisers.</b> Impromat
            offers all necessary features to plan your upcoming improv sessions.
          </IonText>
          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>Improv Workshops</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                <b>Plan and manage</b> your own improvisational theatre
                workshops, <b>share</b> them with the community or <b>find</b>{" "}
                inspiring workshops from other improvisers.
              </p>
              <IonButton
                fill="solid"
                routerLink={routeWorkshops()}
                className="ion-margin-vertical"
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                Create a Workshop
              </IonButton>
              <p>
                Improv workshops often have an overall <b>topic</b> and are
                built up by <b>sections</b> (e.g. warm-up), in which different
                elements (exercises and games) are ordered. You can add your own{" "}
                <b>notes</b> to the workshop as well as to every single element
                to adapt the exercises to your workshop topic and style.
              </p>
              {/* <p>
                  For optimal time keeping, you can specify the <b>timeframe</b>{" "}
                  of every element in advance and use the{" "}
                  <b>presentation mode</b> during the workshop.
                </p> */}
            </IonCardContent>
          </IonCard>
          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>Improv Library</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Explore over 1000 existing improv exercises and games in the{" "}
                <b>Element Library</b>. They have beeen extracted from different{" "}
                <b>wiki sources</b> in German and English:{" "}
                <a
                  href="https://improwiki.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Improwiki
                </a>
                ,{" "}
                <a
                  href="https://www.learnimprov.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learnimprov
                </a>{" "}
                and{" "}
                <a
                  href="https://wiki.improvresourcecenter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Improv resource center
                </a>
                . Use the <b>Recommendations</b> feature to find similiar
                elements to add to your workshop.
              </p>

              <IonButton
                className="ion-margin-top"
                fill="solid"
                color="pink-4"
                routerLink={routeLibrary()}
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                Open Element Library
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>Customize Your Improv</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                For easy access, tag certain elements, e.g. exercises you
                commonly use in your workshops, as <b>Favorites</b>. If you
                cannot find an exercise or game in the library, <b>create</b>{" "}
                your own element and incorporate them in your workshop(s).
              </p>
              <IonButton
                className="ion-margin-vertical"
                fill="solid"
                color="yellow-4"
                routerLink={routeLibrary()}
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                Open Favorite Elements
              </IonButton>
              <p>
                The <b>Login</b> via Google account allows you to{" "}
                <b>synchronize</b> your workshops, favorite elements and
                personally created elements on all devices. Thus, you can plan a
                workshop on your computer with the desktop version of Impromat
                and use the <b>mobile app</b> on your smartphone during the
                workshop. (Don't worry, your improv data is not shared with
                Google and safely hosted on a server based in Germany — the
                Impromat server does not collect personal information. See our{" "}
                <IonRouterLink routerLink={routePrivacyPolicy()}>
                  Privacy Policy
                </IonRouterLink>{" "}
                for more information.)
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <IonText>
            <h1>Made For Improvisers</h1>
          </IonText>
          <p>
            <IonText color="dark">
              Impromat is made for <b>all levels</b>: Improv beginners who want
              to prepare their first improv workshops, established groups that
              want further inspiration and experienced workshop leaders who look
              for a one-stop app for managing their improv workshops.
            </IonText>
          </p>
          <IonButton routerLink={routeWorkshops()}>
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            Try it out
          </IonButton>
          <IonText color="dark">
            <h3>Improv Beginners</h3>
          </IonText>
          <IonText color="dark">
            <p>
              Are you new to improvisational theatre and want to try it out with
              some people? Impromat <b>guides</b> you in finding exercises and
              games for your first improv session. Use the recommended elements
              or already existing workshops to benefit from the{" "}
              <b>collective improv knowledge</b>.
            </p>
          </IonText>
          <IonText color="dark">
            <h3>Established Groups</h3>
          </IonText>
          <IonText color="dark">
            <p>
              Are you playing in an improv group and want to{" "}
              <b>discover new games</b> together? Or do you want to bring more{" "}
              <b>structure</b> into your regular sessions by choosing{" "}
              <b>specific topics</b>
              (e.g. character building, focus) to work on with your group.
              Impromat helps you with finding new exercises and games around
              certain topics. It also allows you to arrange the elements in
              sections to have a ready-planned workshop in no time.
            </p>
          </IonText>
          <IonText color="dark">
            <h3>Workshop Leaders</h3>
          </IonText>
          <IonText color="dark">
            <p>
              Are you regularly giving improv workshops within your own group or
              for others? With Impromat you can easily{" "}
              <b>plan, guide through and manage your workshops</b>,{" "}
              <i className="a"></i> by duplicating and adapting given workshop
              structures, adding your personal favorites and creating your own
              elements — plus, when participants or other workshop leaders ask
              you for your notes on a workshop, you can <b>share</b> your
              Impromat workshop with them in no time.
            </p>
            <p>
              <b>Let Impromat be your improv tool!</b>
            </p>
          </IonText>
          <IonButton fill="solid" routerLink={routeWorkshops()}>
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            Open Workshops
          </IonButton>

          <IonText color="dark">
            <h1>You Want More?</h1>
          </IonText>
          <IonText color="dark">
            <p>
              Impromat and the improv community thrive from your workshop and
              element <b>contributions</b>. Everyone can take part in sharing
              their improv knowledge!
            </p>
            <p>
              If you have <b>feedback or new ideas</b>, what the Impromat could
              do, please let us know via email at{" "}
              <a href="mailto:impromat@marcoklein.dev">
                impromat@marcoklein.dev
              </a>{" "}
              or head over to the <b>About</b> page to find out more.
            </p>
          </IonText>
          <IonButton fill="outline" routerLink={routeAbout()}>
            <IonIcon slot="start" icon={information}></IonIcon>
            About the Project
          </IonButton>
        </div>
      </div>
    </>
  );
};
