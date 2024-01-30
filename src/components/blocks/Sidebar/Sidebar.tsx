import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Sidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to use?</CardTitle>
        <CardDescription>
          This is a markdown-like editor. All styles are scoped to a line.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-sm">Heading: </p>
          <div>
            <kbd className="border rounded p-1">#</kbd> +{" "}
            <kbd className="border rounded p-1">space</kbd>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Bold: </p>
          <div>
            <kbd className="border rounded p-1">*</kbd> +{" "}
            <kbd className="border rounded p-1">space</kbd>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Red: </p>
          <div>
            <kbd className="border rounded p-1">**</kbd> +{" "}
            <kbd className="border rounded p-1">space</kbd>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Underline: </p>
          <div>
            <kbd className="border rounded p-1">***</kbd> +{" "}
            <kbd className="border rounded p-1">space</kbd>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Code Block: </p>
          <div>
            <kbd className="border rounded p-1">```</kbd> +{" "}
            <kbd className="border rounded p-1">space</kbd>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
