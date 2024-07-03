"use client";
import { defaultEditorContent } from "@/lib/content";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "@/components/novel/image-upload";
import {
  slashCommand,
  suggestionItems,
} from "@/components/novel/slash-command";
import { defaultExtensions } from "@/components/novel/extensions";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProps {
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
  setJsonContent: React.Dispatch<React.SetStateAction<string>>;
}

const CommentEditor = ({ setHtmlContent, setJsonContent }: EditorProps) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setCharsCount(editor.storage.characterCount.words());
      setHtmlContent(editor.getHTML());
      setJsonContent(JSON.stringify(json));
      setSaveStatus("Saved");
    },
    500
  );

  // useEffect(() => {
  //   const content = window.localStorage.getItem("novel-content");
  //   if (content) setInitialContent(JSON.parse(content));
  //   else setInitialContent(defaultEditorContent);
  // }, []);

  // if (!initialContent) return null;

  return (
    <div className=" w-full ">
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          className="relative w-full min-h-[300px] p-5 border-muted bg-background  sm:rounded-2xl sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(value) => item.command?.(value)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default CommentEditor;
