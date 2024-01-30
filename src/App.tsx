import { Editor } from "./features/editor";
import Header from "./components/blocks/Header";
import Sidebar from "./components/blocks/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="container h-svh">
      <Header />
      <div className="grid grid-cols-5 gap-4">
        <div className="lg:col-span-4 lg:order-first order-last col-span-5 h-96 lg:h-auto pb-8">
          <Editor />
        </div>
        <div className="lg:col-span-1 col-span-5">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
