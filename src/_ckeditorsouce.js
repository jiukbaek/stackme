import React, { Component } from "react";
import CKEditor from "ckeditor4-react";

CKEditor.editorUrl = "http://localhost:9000/config/ckeditor/ckeditor.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CKEditor
          config={{ customConfig: "/config/ckeditConfig.js" }}
          onChange={e => console.log(e.editor.getData())}
        />
        {/* data="<p>CKEditor Test12341</p>"
         */}
      </div>
    );
  }
}

export default App;
