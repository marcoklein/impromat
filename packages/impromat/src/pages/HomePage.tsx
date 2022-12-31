import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonMenuToggle,
  IonPage,
  IonText,
  ScrollCustomEvent,
} from "@ionic/react";
import { arrowForwardOutline, information, menu } from "ionicons/icons";
import { useState } from "react";
import { routeAbout, routeWorkshops } from "../routes/shared-routes";
import { Tabs } from "./library/components/LibraryContentComponent";
import { routeLibrary, routeLibraryTab } from "./library/library-routes";

export const HomePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = (event: ScrollCustomEvent) => {
    setScrolled(event.detail.scrollTop > 100);
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        scrollEvents
        onIonScroll={onScroll}
        fullscreen
      >
        <div style={{ position: "fixed", top: "0px", left: "0px" }}>
          <IonMenuToggle>
            <IonButton
              fill={scrolled ? "solid" : "clear"}
              color={scrolled ? "light" : "dark"}
            >
              <IonIcon icon={menu} slot="icon-only"></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </div>
        <div
          style={{
            minHeight: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="ion-text-center" style={{ maxWidth: "768px" }}>
            <div
              className="ion-padding-top"
              style={{
                maxHeight: "20%",
                maxWidth: "128px",
                margin: "0 auto",
              }}
            >
              <IonImg src="/assets/logo.svg" alt="Impromat Logo"></IonImg>
            </div>
            <IonText color="dark">
              <h1 style={{ fontSize: "2rem" }}>Impromat</h1>
            </IonText>
            <IonText color="medium">
              <h1>
                App for planning, giving, and sharing improvisational theatre
                workshops.
              </h1>
            </IonText>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "900px" }} className="ion-margin-top">
            <IonText color="dark">
              <h1>Improving Improv</h1>
            </IonText>
            <IonText color="medium">
              Developed by improvisers - made for improvisers. Impromat offers
              all necessary features to plan upcoming improv sessions.
            </IonText>
            <IonText color="dark">
              <h3>Improv Workshops</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Plan and manage your own improvisational theatre workshops,
                share them with the community, or find inspiring workshops from
                other improvisers.
              </p>
              <IonButton
                fill="solid"
                routerLink={routeWorkshops()}
                className="ion-margin-top"
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                Create a Workshop
              </IonButton>
              <p>
                Improv workshops often have an overall topic and are built up by
                sections (e.g. warm-up), in which different elements (exercises
                and games) are ordered. You can add your own notes to the
                workshop as well as to every single element to adapt exercices
                to your workshop topic and style. For optimal time keeping
                during the workshop, you can specify the timeframe in advance
                and use the presentation mode.
              </p>
            </IonText>

            <IonText color="dark">
              <h3>Improv Library</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Explore over 1000 existing improv exercises and games in the{" "}
                <b>Element Library</b> from various sources like{" "}
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
                </a>
                , and{" "}
                <a
                  href="https://wiki.improvresourcecenter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Improvresourcecenter
                </a>
                . Use the Recommendations to find similiar elements to add to
                your workshop.
              </p>
            </IonText>
            <IonButton fill="outline" routerLink={routeLibrary()}>
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Open Element Library
            </IonButton>
            <IonText color="dark">
              <h3>Customize Your Improv</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Tag certain elements, e.g. exercices you commonly use in your
                workshops, as favorites for easy access. If you cannot find an
                exercise or game in the library, create your own element and
                incorporate them in you workshop(s).
              </p>
            </IonText>
            <IonButton
              fill="outline"
              routerLink={routeLibraryTab(Tabs.FAVORITES)}
            >
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Open Favorite Elements
            </IonButton>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "900px" }} className="ion-margin-top">
            <IonText>
              <h1>Made For Improvisers</h1>
            </IonText>

            <IonText color="medium">
              Impromat is made for all kind of levels: Improv beginners who want
              to prepare their first improv workshops, established groups that
              want further inspiration and experienced workshop leaders who look
              for a one-stop app for managing their regular improv workshops.
            </IonText>
            <IonText color="dark">
              <h3>Improv Beginners</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Are you new to improv and want to try it out with some people?
                Impromat helps you in finding exercises and games for your first
                improv session.
              </p>
            </IonText>
            <IonText color="dark">
              <h3>Established Groups</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Are you playing in an improv group and you are looking for new
                inspiration for your next workshop? Impromat helps you with
                finding new exercices and games around certain topics.
              </p>
            </IonText>
            <IonText color="dark">
              <h3>Workshop Leaders</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Are you regularly giving improv workshops within your own group
                or for others? With Impromat you can easily plan, hold, and
                share your workshops.
              </p>
            </IonText>
            <IonButton
              fill="outline"
              routerLink={routeWorkshops()}
              className="ion-margin-top"
            >
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Open Workshops
            </IonButton>

            <IonText color="dark">
              <h3>You Want More?</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Impromat lives from your workshop and element contributions. If
                you have feedback or new ideas, what the Impromat could do,
                please let me knwo via email at{" "}
                <a href="mailto:impromat@marcoklein.dev">
                  impromat@marcoklein.dev
                </a>{" "}
                or head over to the about page to find out more.
              </p>
            </IonText>
            <IonButton fill="outline" routerLink={routeAbout()}>
              <IonIcon slot="start" icon={information}></IonIcon>
              About the Project
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
