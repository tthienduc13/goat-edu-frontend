import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { roles } from "./roles";
import { notifications } from "./notification";

export const queries = mergeQueryKeys(roles, notifications);
