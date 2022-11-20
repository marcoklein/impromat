export interface SectionModel {
  id: string;
  version: number;
  name: string;
  elements: string[];
  note: string | undefined;
  color: string | undefined;
  isVisible: boolean;
  isCollapsed: boolean;
}
