import { atom } from "jotai";

import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export const cancellationMethodsAtom = atom<ICancellationMethod[]>([]);
