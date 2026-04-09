import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Analytics,
  CategoryInput,
  DonationGoal,
  DonationGoalInput,
  EventCategory,
  Festival,
  FestivalInput,
  LineupEntry,
  LineupInput,
  NewsArticle,
  NewsInput,
  NightclubEvent,
  NightclubEventInput,
  NightclubSet,
  NightclubSetId,
  NightclubSetInput,
  Package,
  PackageInput,
  RaveEvent,
  RaveEventInput,
  RaveSet,
  RaveSetId,
  RaveSetInput,
  SiteEvent,
  SiteEventInput,
  Sponsor,
  SponsorInput,
} from "../backend";
import {
  STATIC_ANALYTICS,
  STATIC_FESTIVALS,
  STATIC_PACKAGES,
} from "../types/festival";

// ── Helper: require actor or throw a user-readable error ─────────────────────

function requireActor<T>(actor: T | null): T {
  if (!actor) {
    throw new Error(
      "Not connected to backend. Please wait a moment and try again.",
    );
  }
  return actor;
}

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
    mutationFn: async (input: FestivalInput) =>
      requireActor(actor).addFestival(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useUpdateFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: FestivalInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateFestival(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useDeleteFestival() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => requireActor(actor).deleteFestival(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useToggleFestivalStatus() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) =>
      requireActor(actor).toggleFestivalStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

export function useSetFestivalImage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; imageUrl: string }>({
    mutationFn: async ({ id, imageUrl }) =>
      requireActor(actor).setFestivalImage(id, imageUrl),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["festivals"] }),
  });
}

// ── Ticket URL (persisted in backend canister) ────────────────────────────────

export function useSetFestivalTicketUrl() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; ticketUrl: string }>({
    mutationFn: async ({ id, ticketUrl }) =>
      requireActor(actor).setFestivalTicketUrl(id, ticketUrl.trim()),
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
    mutationFn: async (input: PackageInput) =>
      requireActor(actor).addPackage(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useUpdatePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: PackageInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updatePackage(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useDeletePackage() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => requireActor(actor).deletePackage(id),
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
    mutationFn: async (input: NewsInput) => requireActor(actor).addNews(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: NewsInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateNews(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id: bigint) => requireActor(actor).deleteNews(id),
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
    mutationFn: async (input: LineupInput) =>
      requireActor(actor).addLineupEntry(input),
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
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateLineupEntry(id, input),
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
    mutationFn: async ({ id }) => requireActor(actor).deleteLineupEntry(id),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["lineup", vars.festivalId.toString()],
      }),
  });
}

// ──────────────────────────────────────────────
// Donation Goal Hooks
// ──────────────────────────────────────────────

export function useDonationGoals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DonationGoal[]>({
    queryKey: ["donationGoals"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getDonationGoals();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useDonationGoal(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DonationGoal | null>({
    queryKey: ["donationGoal", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getDonationGoal(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, DonationGoalInput>({
    mutationFn: async (input) => requireActor(actor).addDonationGoal(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] }),
  });
}

export function useUpdateDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: DonationGoalInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateDonationGoal(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] }),
  });
}

export function useDeleteDonationGoal() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteDonationGoal(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donationGoals"] }),
  });
}

// ──────────────────────────────────────────────
// Sponsor Hooks
// ──────────────────────────────────────────────

export function useSponsors() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sponsor[]>({
    queryKey: ["sponsors"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSponsors();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSponsorsByFestival(festivalId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sponsor[]>({
    queryKey: ["sponsors", "festival", festivalId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSponsorsByFestival(festivalId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, SponsorInput>({
    mutationFn: async (input) => requireActor(actor).addSponsor(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

export function useUpdateSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: SponsorInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateSponsor(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

export function useDeleteSponsor() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteSponsor(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

// ──────────────────────────────────────────────
// Event Category Hooks
// ──────────────────────────────────────────────

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<EventCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getCategories();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, CategoryInput>({
    mutationFn: async (input) => requireActor(actor).addCategory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: CategoryInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateCategory(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

// ──────────────────────────────────────────────
// Rave Event Hooks
// ──────────────────────────────────────────────

export function useRaveEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RaveEvent[]>({
    queryKey: ["raveEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRaveEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useRaveEvent(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RaveEvent | null>({
    queryKey: ["raveEvent", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getRaveEvent(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, RaveEventInput>({
    mutationFn: async (input) => requireActor(actor).addRaveEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] }),
  });
}

export function useUpdateRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: RaveEventInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateRaveEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] }),
  });
}

export function useDeleteRaveEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteRaveEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["raveEvents"] }),
  });
}

// ── Rave Set Hooks ────────────────────────────────────────────────────────────

export function useRaveSets(raveEventId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RaveSet[]>({
    queryKey: ["raveSets", raveEventId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRaveSetsByEvent(raveEventId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAddRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, RaveSetInput>({
    mutationFn: async (input) => requireActor(actor).addRaveSet(input),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["raveSets", vars.raveEventId.toString()],
      }),
  });
}

export function useUpdateRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: RaveSetId; input: RaveSetInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateRaveSet(id, input),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["raveSets", vars.input.raveEventId.toString()],
      }),
  });
}

export function useDeleteRaveSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: RaveSetId; raveEventId: bigint }>({
    mutationFn: async ({ id }) => requireActor(actor).deleteRaveSet(id),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["raveSets", vars.raveEventId.toString()],
      }),
  });
}

// ──────────────────────────────────────────────
// Nightclub Event Hooks
// ──────────────────────────────────────────────

export function useNightclubEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NightclubEvent[]>({
    queryKey: ["nightclubEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNightclubEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useNightclubEvent(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NightclubEvent | null>({
    queryKey: ["nightclubEvent", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getNightclubEvent(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, NightclubEventInput>({
    mutationFn: async (input) => requireActor(actor).addNightclubEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] }),
  });
}

export function useUpdateNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<
    boolean,
    Error,
    { id: bigint; input: NightclubEventInput }
  >({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateNightclubEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] }),
  });
}

export function useDeleteNightclubEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteNightclubEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["nightclubEvents"] }),
  });
}

// ── Nightclub Set Hooks ───────────────────────────────────────────────────────

export function useNightclubSets(nightclubEventId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NightclubSet[]>({
    queryKey: ["nightclubSets", nightclubEventId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getNightclubSetsByEvent(nightclubEventId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAddNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, NightclubSetInput>({
    mutationFn: async (input) => requireActor(actor).addNightclubSet(input),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["nightclubSets", vars.nightclubEventId.toString()],
      }),
  });
}

export function useUpdateNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<
    boolean,
    Error,
    { id: NightclubSetId; input: NightclubSetInput }
  >({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateNightclubSet(id, input),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["nightclubSets", vars.input.nightclubEventId.toString()],
      }),
  });
}

export function useDeleteNightclubSet() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<
    boolean,
    Error,
    { id: NightclubSetId; nightclubEventId: bigint }
  >({
    mutationFn: async ({ id }) => requireActor(actor).deleteNightclubSet(id),
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["nightclubSets", vars.nightclubEventId.toString()],
      }),
  });
}

// ──────────────────────────────────────────────
// Site Event Hooks
// ──────────────────────────────────────────────

export function useSiteEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteEvent[]>({
    queryKey: ["siteEvents"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSiteEvents();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSiteEvent(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteEvent | null>({
    queryKey: ["siteEvent", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSiteEvent(id);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<bigint, Error, SiteEventInput>({
    mutationFn: async (input) => requireActor(actor).addSiteEvent(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] }),
  });
}

export function useUpdateSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { id: bigint; input: SiteEventInput }>({
    mutationFn: async ({ id, input }) =>
      requireActor(actor).updateSiteEvent(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] }),
  });
}

export function useDeleteSiteEvent() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => requireActor(actor).deleteSiteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteEvents"] }),
  });
}
