import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { editorStateAtom } from "../stores/editorState";
import { EDITOR_LOCAL_STORAGE_KEY } from "../config/consts";
import { useEffect } from "react";

export default function useEditorState() {
  const [editorState, setEditorState] = useRecoilState(editorStateAtom);

  useEffect(() => {
    const savedContent = localStorage.getItem(EDITOR_LOCAL_STORAGE_KEY);
    if (savedContent) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent))),
      );
    }
  }, []);

  const save = (): void => {
    const content = editorState.getCurrentContent();
    localStorage.setItem(
      EDITOR_LOCAL_STORAGE_KEY,
      JSON.stringify(convertToRaw(content)),
    );
    toast("Content saved successfully.");
  };

  return {
    editorState,
    setEditorState,
    save,
  };
}
