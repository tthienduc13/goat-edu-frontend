"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@udecode/cn";
import { Plate, TElement, createPlateEditor } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { MENTIONABLES } from "@/lib/plate/mentionables";
import { plugins } from "@/lib/plate/plate-plugins";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      id: "1",
      type: ELEMENT_PARAGRAPH,
      children: [{ text: "Hello, World!" }],
    },
  ];

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={initialValue}>
          <div
            ref={containerRef}
            className={cn(
              "relative",
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className=" p-10"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </DndProvider>
    </>
  );
}
function serializeHtml(
  editor: Omit<
    import("slate").BaseEditor,
    | "children"
    | "operations"
    | "marks"
    | "apply"
    | "getDirtyPaths"
    | "getFragment"
    | "markableVoid"
    | "normalizeNode"
    | "insertFragment"
    | "insertNode"
    | "isInline"
    | "isVoid"
    | "id"
  > & {
    id: any;
    children: import("@udecode/slate").Value;
    operations: import("@udecode/slate").TOperation<
      import("@udecode/slate").TDescendant
    >[];
    marks: Record<string, any> | null;
    isInline: <N extends import("@udecode/slate").TElement>(
      element: N
    ) => boolean;
    isVoid: <N extends import("@udecode/slate").TElement>(
      element: N
    ) => boolean;
    markableVoid: <N extends import("@udecode/slate").TElement>(
      element: N
    ) => boolean;
    normalizeNode: <N extends import("@udecode/slate").TNode>(
      entry: import("@udecode/slate").TNodeEntry<N>
    ) => void;
    apply: <N extends import("@udecode/slate").TDescendant>(
      operation: import("@udecode/slate").TOperation<N>
    ) => void;
    getFragment: <N extends import("@udecode/slate").TDescendant>() => N[];
    insertFragment: <N extends import("@udecode/slate").TDescendant>(
      fragment: N[]
    ) => void;
    insertNode: <N extends import("@udecode/slate").TDescendant>(
      node: N
    ) => void;
    getDirtyPaths: <N extends import("@udecode/slate").TDescendant>(
      operation: import("@udecode/slate").TOperation<N>
    ) => import("slate").Path[];
  } & import("@udecode/utils").UnknownObject & {
      blockFactory: (
        node?: Partial<import("@udecode/slate").TElement> | undefined,
        path?: import("slate").Path | undefined
      ) => import("@udecode/slate").TElement;
      childrenFactory: () => import("@udecode/slate").Value;
      currentKeyboardEvent: React.KeyboardEvent<Element> | null;
      isFallback: boolean;
      key: any;
      plugins: import("@udecode/plate-common").WithPlatePlugin<
        {},
        import("@udecode/slate").Value,
        import("@udecode/plate-common").PlateEditor<
          import("@udecode/slate").Value
        >
      >[];
      pluginsByKey: Record<
        string,
        import("@udecode/plate-common").WithPlatePlugin<
          {},
          import("@udecode/slate").Value,
          import("@udecode/plate-common").PlateEditor<
            import("@udecode/slate").Value
          >
        >
      >;
      prevSelection: import("slate").BaseRange | null;
    } & import("@udecode/plate-common").PlateEditorMethods<
      import("@udecode/slate").Value
    > &
    Pick<
      import("slate-history").HistoryEditor,
      "history" | "undo" | "redo" | "writeHistory"
    > &
    Pick<
      import("slate-react").ReactEditor,
      | "hasEditableTarget"
      | "hasRange"
      | "hasSelectableTarget"
      | "hasTarget"
      | "insertData"
      | "insertFragmentData"
      | "insertTextData"
      | "isTargetInsideNonReadonlyVoid"
      | "setFragmentData"
    >,
  arg1: {
    nodes: import("@udecode/slate").Value;
    dndWrapper: (props: any) => React.JSX.Element;
  }
) {
  throw new Error("Function not implemented.");
}
