import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { roles } from "./roles";

export const queries = mergeQueryKeys(roles);
