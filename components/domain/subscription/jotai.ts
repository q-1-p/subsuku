import { atom } from "jotai";

import type { ISubscription } from "@/domain/subscription/subscription";

export const subscriptionsAtom = atom<ISubscription[]>([]);
