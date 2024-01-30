import { EditorState, Modifier, RichUtils, SelectionState } from "draft-js";

type Marker = {
  symbol: string;
  method: string;
  style: string;
};

/**
 * Applies styles based on the marker and removes the markd
 * @param editorState Editor State
 * @param style
 * @param markerLength
 * @returns Editor State
 */
export function applyStyleAndRemoveMarker(
  editorState: EditorState,
  marker: Marker,
): EditorState {
  const selection = editorState.getSelection();
  let contentState = editorState.getCurrentContent();
  const blockKey = selection.getStartKey();

  // Remove marker symbols
  const blockRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: marker.symbol.length,
  });

  contentState = Modifier.removeRange(contentState, blockRange, "backward");
  const newState = EditorState.push(
    editorState,
    contentState,
    "change-inline-style",
  );

  // Apply styles based on marker symbols
  if (marker.method === "block")
    return RichUtils.toggleBlockType(
      EditorState.forceSelection(newState, contentState.getSelectionAfter()),
      marker.style,
    );

  return RichUtils.toggleInlineStyle(
    EditorState.forceSelection(newState, contentState.getSelectionAfter()),
    marker.style,
  );
}
