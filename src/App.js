import { Node } from "./Components/Node";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Node toast={toast} />
      </div>
    </>
  );
}

export default App;
