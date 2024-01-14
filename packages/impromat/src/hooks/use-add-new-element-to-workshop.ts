import { useCallback } from "react";
import { useUpdateWorkshopMutation } from "./use-update-workshop-mutation";

interface InputProps {
  elementId: string;
  workshopId: string;
  sectionId: string;
}

export function useAddNewElementToWorkshopSection() {
  const [mutationResult, addToWorkshopMutation] = useUpdateWorkshopMutation();
  const addNewElementToWorkshopSectionMutation = useCallback(
    async ({ elementId, workshopId, sectionId }: InputProps) => {
      addToWorkshopMutation({
        input: {
          id: workshopId,
          sections: {
            update: [
              {
                id: sectionId,
                elements: {
                  create: [
                    {
                      basedOn: {
                        connect: {
                          id: elementId,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      });
    },
    [addToWorkshopMutation],
  );
  return [mutationResult, addNewElementToWorkshopSectionMutation] as const;
}
