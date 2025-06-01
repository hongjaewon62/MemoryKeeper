import { useState } from "react";
import ReactQuill, {Quill} from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";
import styled from "styled-components";
// import ImageResize from "quill-image-resize-module-react";

// if (typeof window !== 'undefined' && window.Quill) {
//   window.Quill = Quill;
// }

// Quill.register("modules/imageResize", ImageResize);

const Wrapper = styled.div`
    background: white;

    .ql-editor img {
        max-width: 500px;
        max-height: 500px; 
        object-fit: contain;
  }
`

function BorderWriteEditor({ value, onContentChange }) {
    const [content, setContent] = useState("");
    const handleContentChange = (value) => {
        setContent(value);
        onContentChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["image", "link"],
    ],
    //     ImageResize: {
    //     modules: ['Resize', 'DisplaySize']
    // },
  };

    return (
        <Wrapper>
            <ReactQuill
                value={value}
                onChange={handleContentChange}
                modules={modules}
                placeholder="내용을 입력하세요"
            />
        </Wrapper>
    )
}

export default BorderWriteEditor;