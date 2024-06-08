import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { roles } from "./roles";
import { notifications } from "./notification";
import { tags } from "./tag";
import { discussion } from "./discussion";
import { subject } from "./subject";
import { flashcard } from "./flashcard";
import { flashcardContent } from "./flashcard-content";

export const queries = mergeQueryKeys(
  roles,
  notifications,
  tags,
  discussion,
  subject,
  flashcard,
  flashcardContent
);
