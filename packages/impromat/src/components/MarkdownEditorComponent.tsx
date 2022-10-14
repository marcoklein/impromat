import { MarkdownEditor } from "@remirror/react-editors/markdown";

interface ContainerProps {
  markdown: string;
}

/**
 * Render a markdown editor.
 */
export const MarkdownEditorComponent: React.FC<ContainerProps> = ({
  markdown,
}) => {
  return (
    <div style={{ margin: 0 }}>
      <MarkdownEditor initialContent={markdown}></MarkdownEditor>
    </div>
  );
};
