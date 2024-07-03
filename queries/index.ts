import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { roles } from "./roles";
import { notifications } from "./notification";
import { tags } from "./tag";
import { discussion } from "./discussion";
import { subject } from "./subject";
import { flashcardContent } from "./flashcard-content";
import { note } from "./note";
import { chapter } from "./chapter";
import { Lesson } from "./lesson";
import { Quiz } from "./quiz";
import { theory } from "./theory";

export const queries = mergeQueryKeys(
  roles,
  notifications,
  tags,
  discussion,
  subject,
  flashcardContent,
  note,
  chapter,
  Lesson,
  Quiz,
  theory
);
