import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import MathExtension, { InlineMathNode } from "./_components/math-extention";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      InlineMathNode,
      MathExtension.configure({
        evaluation: false,
        katexOptions: { macros: { "\\B": "\\mathbb{B}" } },
      }),
    ],
    content: `<p>Hello World!
      <br/>
      <br/>
      This is a sum: <span data-type="inlineMath" data-latex="\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right."></span>
      <br/>
      <br/>
      This is a block math expression:
      <br/>
      <span data-type="inlineMath" data-display="yes" data-evaluate="yes" data-latex="\\sum_{i=0}^n i^2"></span>
      <br/>
      <br/>
      Cool, right?</p>`,
  });

  useEffect(() => {
    if (editor) {
      console.log({ editor });
      (window as any).tiptapEditor = editor;
    }
  }, [editor]);
  return (
    <div>
      <button
        onClick={() => {
          editor?.commands.insertContent({
            type: "inlineMath",
            attrs: { latex: "x^2 = \\sqrt{x^4}" },
          });
        }}
      >
        Insert Math
      </button>
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  );
};

export default Tiptap;
