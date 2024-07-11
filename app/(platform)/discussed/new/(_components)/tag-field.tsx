import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "emblor";
import { X } from "lucide-react";
import { Tag } from "@/types/tag";

type TagsInputType = {
  id: string;
  text: string;
};

interface TagFieldProps {
  tags: TagsInputType[];
  setTags: React.Dispatch<React.SetStateAction<TagsInputType[]>>;
  setDiscussionTags: React.Dispatch<React.SetStateAction<Omit<Tag, "id">[]>>;
}

export const TagField = ({
  tags,
  setTags,
  setDiscussionTags,
}: TagFieldProps) => {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const { control } = useFormContext();
  const { field } = useController({
    name: "tags",
    control,
  });

  const handleDeleteTag = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    const newDiscussionTags = newTags.map((tag) => ({ tagName: tag.text }));
    setDiscussionTags(newDiscussionTags);
  };

  useEffect(() => {
    const discussionTags = tags.map((tag) => ({ tagName: tag.text }));
    setDiscussionTags(discussionTags);
    field.onChange(discussionTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <FormItem className="w-full">
      <FormLabel>Tags</FormLabel>
      <FormControl className="w-full">
        <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
          <div className="flex flex-col w-full">
            <TagInput
              type="text"
              styleClasses={{
                input:
                  "border-none outline-none text-muted-foreground shadow-none focus-visible:ring-0",
                inlineTagsContainer: "bg-transparent border-none",
              }}
              placeholder="Choose tags"
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              tags={tags}
              maxTags={4}
              minTags={4}
              setTags={setTags}
              customTagRenderer={(tag, isActiveTag) => (
                <div
                  onMouseEnter={() => setHoveredTag(tag.id)}
                  onMouseLeave={() => setHoveredTag(null)}
                  key={tag.id}
                  className={`px-2 group flex flex-row cursor-pointer items-center gap-x-1 transition-all duration-300 hover:scale-105 py-1 rounded-md ${
                    hoveredTag === tag.id
                      ? "bg-destructive/15 text-destructive"
                      : "bg-emerald-500/15 text-emerald-500"
                  } ${
                    hoveredTag === tag.id
                      ? "hover:bg-destructive/40"
                      : "hover:bg-emerald-500/40"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isActiveTag
                        ? "ring-ring ring-offset-2 ring-2 ring-offset-background"
                        : ""
                    }`}
                  >
                    {tag.text}
                  </span>
                  {hoveredTag === tag.id && (
                    <div
                      onClick={() => handleDeleteTag(tag.id)}
                      className="cursor-pointer  group-hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
