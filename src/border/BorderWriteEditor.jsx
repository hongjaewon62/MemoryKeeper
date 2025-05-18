import { useState } from "react";
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";
import styled from "styled-components";

const Wrapper = styled.div`
    background: white;
`

function BorderWriteEditor({ onContentChange }) {
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
  };

    return (
        <Wrapper>
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={modules}
                placeholder="내용을 입력하세요"
            />
        </Wrapper>
    )
}

export default BorderWriteEditor;