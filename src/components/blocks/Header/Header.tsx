import { Button } from "@/components/ui/button";
import { useEditorState } from "@/features/editor";

export default function Header() {
  const { save } = useEditorState();

  return (
    <div className="grid grid-row-1">
      <div className="container flex justify-between align-middle pt-10 pb-6">
        <h4 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          AssetIntel Editor
        </h4>
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
