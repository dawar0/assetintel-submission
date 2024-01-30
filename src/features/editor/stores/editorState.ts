import { EditorState } from "draft-js";
import { atom } from "recoil";

export const editorStateAtom = atom<EditorState>({
  key: "editorStateAtom",
  default: EditorState.createEmpty(),
});
