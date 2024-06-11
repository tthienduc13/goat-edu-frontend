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
import { Hint } from "../custom/hint";
import { Button } from "../ui/button";
import { SquarePen, Trash } from "lucide-react";
import { MoreButton } from "../custom/buttons/more-button";
import { useAddNote, useDeleteNote } from "@/app/api/note/note.query";
import { DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand];

interface TailwindAdvancedEditorProps {
  selectedNoteId: string;
  userId: string;
  token: string;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
}

const NoteEditor = ({
  selectedNoteId,
  userId,
  htmlContent,
  setHtmlContent,
  token,
}: TailwindAdvancedEditorProps) => {
  const { mutate: addNote } = useAddNote(token, userId);
  const { mutate: deleteNote } = useDeleteNote(token, selectedNoteId, userId);

  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setCharsCount(editor.storage.characterCount.words());
      setHtmlContent(highlightCodeblocks(editor.getHTML()));
      window.localStorage.setItem("note-novel-content", JSON.stringify(json));
      setSaveStatus("Saved");
    },
    500
  );

  useEffect(() => {
    const content = window.localStorage.getItem("note-novel-content");
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  const handleAddNote = () => {
    const newNote = {
      noteName: "Unititled",
      noteBody: "",
    };
    addNote(newNote);
  };

  if (!initialContent) return null;

  return (
    <div className="relative w-full ">
      <div className="flex absolute items-center right-5 top-0 z-10  gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount} Words
        </div>
        <Hint label="Create new note" side="bottom" sideOffset={10}>
          <Button
            onClick={handleAddNote}
            variant="ghost"
            size="icon"
            className=" rounded-full"
          >
            <SquarePen className="w-5 h-5" />
          </Button>
        </Hint>
        <MoreButton>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                onClick={() => deleteNote()}
                variant="ghost"
                className="hover:bg-destructive/30 hover:text-destructive w-full rounded-md"
              >
                <Trash className="h-4 w-4 mr-2" />
                <span>Delete</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </MoreButton>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={defaultEditorContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full px-5 py-10  bg-background  "
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

export default NoteEditor;
