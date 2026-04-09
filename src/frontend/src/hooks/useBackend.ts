import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Analytics,
  Festival,
  FestivalInput,
  LineupEntry,
  LineupInput,
  NewsArticle,
  NewsInput,
  Package,
  PackageInput,
} from "../backend";
import {
  STATIC_ANALYTICS,
  STATIC_FESTIVALS,
  STATIC_PACKAGES,
} from "../types/festival";

// ──────────────────────────────────────────────
// Query Hooks
// ──────────────────────────────────────────────

export function useFestivals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Festival[]>({
    queryKey: ["festivals"],
    queryFn: async () => {
      if (!actor) return STATIC_FESTIVALS;
      try {
        const result = await actor.getFestivals();
        return result.length > 0 ? result : STATIC_FESTIVALS;
      } catch {
        return STATIC_FESTIVALS;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_FESTIVALS,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePackages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return STATIC_PACKAGES;
      try {
        const result = await actor.getPackages();
        return result.length > 0 ? result : STATIC_PACKAGES;
      } catch {
        return STATIC_PACKAGES;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_PACKAGES,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAnalytics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Analytics[]>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) return STATIC_ANALYTICS;
      try {
        const result = await actor.getAnalytics();
        return result.length > 0 ? result : STATIC_ANALYTICS;
      } catch {
        return STATIC_ANALYTICS;
      }
    },
    enabled: !isFetching,
    placeholderData: STATIC_ANALYTICS,
    staleTime: 1000 * 60 * 5,
  });
}

// ──────────────────────────────────────────────
// Admin Mutation Hooks
// ──────────────────────────────────────────────

export function useAdminLogin() {
  const { actor } = useActor(createActor);
  return useMutation<string | null, Error, string>({
    mutationFn: async (password: string) => {
      if (actor) {
        try {
          return await actor.adminLogin(password);
        } catch {
          // fallback to hardcoded check
        }
      }
      // Hardcoded admin login fallback
      if (password === "b9bkzisthebest") {
        return "admin-session-token";
      }
      return null;
    },
  });
}

export function useAddFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, FestivalInput>({
    mutationFn: async (input: FestivalInput) => {
      if (actor) return actor.addFestival(input);
      return BigInt(Math.floor(Math.random() * 1000));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useUpdateFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: FestivalInput }>({
    mutationFn: async ({ id, input }) => {
      if (actor) return actor.updateFestival(id, input);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useDeleteFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (actor) return actor.deleteFestival(id);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useToggleFestivalStatus() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (actor) return actor.toggleFestivalStatus(id);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useSetFestivalImage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; imageUrl: string }>({
    mutationFn: async ({ id, imageUrl }) => {
      if (actor) return actor.setFestivalImage(id, imageUrl);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

// ── Ticket URL (persisted in backend canister) ────────────────────────────────

export function useSetFestivalTicketUrl() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; ticketUrl: string }>({
    mutationFn: async ({ id, ticketUrl }) => {
      if (actor) return actor.setFestivalTicketUrl(id, ticketUrl.trim());
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useTicketUrls() {
  const { data: festivals = [] } = useFestivals();
  const map: Record<string, string> = {};
  for (const f of festivals) {
    if (f.ticketUrl) map[f.id.toString()] = f.ticketUrl;
  }
  return { data: map };
}

export function useAddPackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, PackageInput>({
    mutationFn: async (input: PackageInput) => {
      if (actor) return actor.addPackage(input);
      return BigInt(Math.floor(Math.random() * 1000));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useUpdatePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: PackageInput }>({
    mutationFn: async ({ id, input }) => {
      if (actor) return actor.updatePackage(id, input);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useDeletePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (actor) return actor.deletePackage(id);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
}

// ──────────────────────────────────────────────
// News Hooks
// ──────────────────────────────────────────────

export function useNews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NewsArticle[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNews();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useNewsArticle(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NewsArticle | null>({
    queryKey: ["news", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getNewsArticle(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, NewsInput>({
    mutationFn: async (input: NewsInput) => {
      if (actor) return actor.addNews(input);
      return BigInt(Math.floor(Math.random() * 1000));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: NewsInput }>({
    mutationFn: async ({ id, input }) => {
      if (actor) return actor.updateNews(id, input);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => {
      if (actor) return actor.deleteNews(id);
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

// ──────────────────────────────────────────────
// Lineup Hooks
// ──────────────────────────────────────────────

export function useLineup(festivalId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LineupEntry[]>({
    queryKey: ["lineup", festivalId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getLineup(festivalId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAddLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, LineupInput>({
    mutationFn: async (input: LineupInput) => {
      if (actor) return actor.addLineupEntry(input);
      return BigInt(Math.floor(Math.random() * 1000));
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["lineup", vars.festivalId.toString()],
      }),
  });
}

export function useUpdateLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: LineupInput }>({
    mutationFn: async ({ id, input }) => {
      if (actor) return actor.updateLineupEntry(id, input);
      return true;
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["lineup", vars.input.festivalId.toString()],
      }),
  });
}

export function useDeleteLineupEntry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; festivalId: bigint }>({
    mutationFn: async ({ id }) => {
      if (actor) return actor.deleteLineupEntry(id);
      return true;
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["lineup", vars.festivalId.toString()],
      }),
  });
}
