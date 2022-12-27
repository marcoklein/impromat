import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItemDivider,
  IonMenuToggle,
  IonPage,
  IonText,
  ScrollCustomEvent,
} from "@ionic/react";
import { arrowForwardOutline, information, menu } from "ionicons/icons";
import { useState } from "react";
import { routeAbout, routeWorkshops } from "../routes/shared-routes";
import { routeLibrary } from "./library/library-routes";

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
                App for planning, holding, and sharing improvisational theatre
                workshops.
              </h1>
            </IonText>
            <IonButton
              fill="solid"
              routerLink={routeWorkshops()}
              className="ion-margin-top"
            >
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Create a Workshop
            </IonButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "768px" }} className="ion-margin-top">
            <IonText>
              <h2>Made For Improvisers</h2>
            </IonText>
            <IonText color="medium">
              Impromat is made for improv beginners who want to hold improv
              workshops, established groups that want further inspiration, or
              regular workshop leaders that look for a one-stop app for managing
              their improv workshops.
            </IonText>
            <IonText color="dark">
              <h3>Improv Beginners</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Are you new to improv and want to try it out with some people?
                Impromat helps you with finding exercises and games for your
                first improv session.
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
                Are you regularly holding improv workshops within your own group
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
              Create a Workshop
            </IonButton>
            <IonText color="dark">
              <h2>Everything You Need</h2>
            </IonText>
            <IonText color="medium">
              Developed by improvisers, made for improvisers. Impromat offers
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
            </IonText>
            <IonButton fill="outline" routerLink={routeWorkshops()}>
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Open Workshops
            </IonButton>
            <IonText color="dark">
              <h3>Improv Exercises</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Explore over one thousand existing improv exercises and games
                from various sources like{" "}
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
                .
              </p>
            </IonText>
            <IonButton fill="outline" routerLink={routeLibrary()}>
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Open Element Library
            </IonButton>
            <IonText color="dark">
              <h3>You Want More?</h3>
            </IonText>
            <IonText color="medium">
              <p>
                Impromat lives from your workshop and element contributions. If
                you do something cool with it, have feedback, or new ideas drop
                an email at{" "}
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
