import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { roles } from "./roles";
import { notifications } from "./notification";
import { tags } from "./tag";
import { discussion } from "./discussion";
import { subject } from "./subject";
import { flashcard } from "./flashcard";
import { flashcardContent } from "./flashcard-content";
import { note } from "./note";
import { chapter } from "./chapter";

export const queries = mergeQueryKeys(
  roles,
  notifications,
  tags,
  discussion,
  subject,
  flashcard,
  flashcardContent,
  note,
  chapter
);
