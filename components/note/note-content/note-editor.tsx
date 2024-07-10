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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { MoreButton } from "../../custom/buttons/more-button";
import { useDeleteNote, usePatchNoteContent } from "@/app/api/note/note.query";
import { DropdownMenuGroup, DropdownMenuItem } from "../../ui/dropdown-menu";
import { NoteCreateButton } from "../note-control/note-create-button";
import { Note } from "@/types/note";
import useSaveStatusStore from "@/stores/useSaveStatusStore";
const extensions = [...defaultExtensions, slashCommand];

interface TailwindAdvancedEditorProps {
  selectedNoteId: string;
  userId: string;
  token: string;
  data: Note;
}

const NoteEditor = ({
  data,
  selectedNoteId,
  userId,
  token,
}: TailwindAdvancedEditorProps) => {
  const { mutate: deleteNote } = useDeleteNote(token, selectedNoteId, userId);
  const { mutate: patchNote } = usePatchNoteContent(
    token,
    selectedNoteId,
    userId
  );

  const [initialContent, setInitialContent] = useState<null | JSONContent>();
  const { saveStatus, setSaveStatus } = useSaveStatusStore();
  const [charsCount, setCharsCount] = useState();

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setCharsCount(editor.storage.characterCount.words());
      console.log(editor.getHTML());
      patchNote({
        noteName: null,
        noteBody: JSON.stringify(json),
        noteBodyHtml: editor.getHTML(),
      });
      setSaveStatus("Saved");
    },
    500
  );

  useEffect(() => {
    if (data.noteBody) setInitialContent(JSON.parse(data.noteBody));
    else setInitialContent(defaultEditorContent);
  }, [data.noteBody, data.noteName]);

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
        <NoteCreateButton />
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
          initialContent={initialContent}
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
