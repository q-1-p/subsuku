import { atom } from "jotai";

import type { SubscriptionDetail } from "@/domain/type";

export const subscriptionsAtom = atom<SubscriptionDetail[]>([]);
