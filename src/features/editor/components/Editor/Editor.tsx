import { Editor as DraftJSEditor } from "draft-js";
import "draft-js/dist/Draft.css";
import { styleMap } from "../../utils/styleMap";
import useEditor from "./hooks/useEditor";
import { Card, CardContent } from "@/components/ui/card";

export default function Editor() {
  const {
    editorState,
    onChange,
    handleBeforeInput,
    handleReturn,
    handleKeyCommand,
    blockStyle,
  } = useEditor();

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        <DraftJSEditor
          editorState={editorState}
          onChange={onChange}
          handleBeforeInput={handleBeforeInput}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={blockStyle}
          customStyleMap={styleMap}
          placeholder={`Start writing your notes`}
          handleReturn={handleReturn}
        />
      </CardContent>
    </Card>
  );
}
