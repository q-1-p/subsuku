import { atom } from "jotai";

import type { CancellationMethodDetail } from "@/domain/type";

export const cancellationMethodsAtom = atom<CancellationMethodDetail[]>([]);
