import { EditorState, RichUtils } from "draft-js";

/**
 * Removes inline styles for the current block
 * @param editorState
 * @returns Editor State
 */
export function removeInlineStyles(editorState: EditorState) {
  const styles = editorState.getCurrentInlineStyle();
  let newEditorState = editorState;

  // Remove each style one by one
  styles.forEach((style) => {
    newEditorState = style
      ? RichUtils.toggleInlineStyle(newEditorState, style)
      : newEditorState;
  });

  // Create a new EditorState with the modified content
  return RichUtils.toggleBlockType(newEditorState, "unstyled");
}
