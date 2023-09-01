import { IonChip, IonIcon, IonLabel, IonRange } from "@ionic/react";
import { filter } from "ionicons/icons";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";

export const ElementFilterBar_Query = graphql(`
  fragment ElementFilterBar_Query on Query {
    tags(take: 1000) {
      id
      name
    }
  }
`);

interface ContainerProps {
  queryFragment: FragmentType<typeof ElementFilterBar_Query>;
}

/**
 * Search for a specific workshop element. Search includes all elements from the improbib and all custom elements.
 */
export const ElementFilterBar: React.FC<ContainerProps> = ({
  queryFragment,
}) => {
  const logger = useComponentLogger("ElementFilterBar");
  const tags = getFragmentData(ElementFilterBar_Query, queryFragment).tags;

  return (
    <div>
      <IonChip>
        <IonIcon icon={filter}></IonIcon>
        <IonLabel>Filter</IonLabel>
      </IonChip>
      <IonChip outline>
        <IonLabel>Warmup</IonLabel>
      </IonChip>
      <div className="ion-padding">
        <h3>Stage</h3>
        <IonChip outline>
          <IonLabel>Ice Breaker</IonLabel>
        </IonChip>
        <IonChip outline>
          <IonLabel>Warmup</IonLabel>
        </IonChip>
        <IonChip outline>
          <IonLabel>Exercises</IonLabel>
        </IonChip>
        <IonChip outline>
          <IonLabel>Game</IonLabel>
        </IonChip>
        <h3>Time</h3>
        <IonRange
          dualKnobs
          value={{ lower: 5, upper: 35 }}
          pin
          pinFormatter={(value) => (value > 30 ? `> 30 min` : `${value} min`)}
          min={5}
          max={35}
          step={5}
          snaps
        ></IonRange>
        {tags.map((tag) => (
          <IonChip outline key={tag.id}>
            <IonLabel>{tag.name}</IonLabel>
          </IonChip>
        ))}
      </div>
    </div>
  );
};
