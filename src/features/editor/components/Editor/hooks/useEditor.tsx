import {
  ContentBlock,
  DraftHandleValue,
  EditorState,
  Modifier,
  RichUtils,
} from "draft-js";
import { applyStyleAndRemoveMarker } from "../../../utils/applyStyleAndRemoveMarker";
import { removeInlineStyles } from "../../../utils/removeInlineStyles";
import useEditorState from "@/features/editor/hooks/useEditorState";

const markers = [
  { method: "block", symbol: "#", style: "header-one" },
  { method: "style", symbol: "*", style: "BOLD" },
  { method: "style", symbol: "**", style: "REDLINE" },
  { method: "style", symbol: "***", style: "UNDERLINE" },
  { method: "block", symbol: "```", style: "code-block" },
];

export default function useEditor() {
  const { editorState, setEditorState } = useEditorState();

  /**
   * BeforeInput Event Handler
   * @param chars char input
   * @param editorState Current Editor State
   * @returns  Editor State
   */
  const handleBeforeInput = (
    chars: string,
    editorState: EditorState,
  ): DraftHandleValue => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();
    const blockType = currentBlock.getType();
    const isCollapsed = selection.isCollapsed();

    if (
      isCollapsed &&
      blockType === "unstyled" &&
      editorState.getCurrentInlineStyle().size === 0 &&
      chars == " "
    ) {
      for (let marker of markers) {
        if (blockText == marker.symbol) {
          const newState = applyStyleAndRemoveMarker(editorState, marker);
          setEditorState(newState);
          return "handled";
        }
      }
    }

    return "not-handled";
  };

  /**
   * Custom CSS styling for block
   * @param contentBlock Current content
   * @returns
   */
  function blockStyle(contentBlock: ContentBlock) {
    const type = contentBlock.getType();
    if (type === "header-one") {
      return "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl";
    }
    return "";
  }

  const handleReturn = (
    e: React.KeyboardEvent,
    state: EditorState,
  ): DraftHandleValue => {
    // Remove all styles on Enter key press
    if (e.shiftKey) {
      const newEditorState = RichUtils.insertSoftNewline(state);
      setEditorState(newEditorState);
    } else {
      const currentContent = state.getCurrentContent();
      const selection = state.getSelection();
      const textWithEntity = Modifier.splitBlock(currentContent, selection);
      const newState = EditorState.push(state, textWithEntity, "split-block");
      setEditorState(removeInlineStyles(newState));
    }
    return "handled";
  };

  /**
   * Key Event Handler
   * @param command Key pressed
   * @returns
   */
  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  /**
   * OnChange Event Handler
   * @param e Editor State on change
   */
  const onChange = (e: EditorState) => {
    const selection = e.getSelection();
    const contentState = e.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();
    if (!blockText) setEditorState(removeInlineStyles(e));
    else setEditorState(e);
  };

  return {
    handleReturn,
    handleBeforeInput,
    handleKeyCommand,
    editorState,
    onChange,
    blockStyle,
  };
}
