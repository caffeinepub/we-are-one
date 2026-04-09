import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const FestivalsPage = lazy(() => import("./pages/FestivalsPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const LineupPage = lazy(() => import("./pages/LineupPage"));
const DonationsPage = lazy(() => import("./pages/DonationsPage"));
const SponsorsPage = lazy(() => import("./pages/SponsorsPage"));
const RavePage = lazy(() => import("./pages/RavePage"));
const NightclubPage = lazy(() => import("./pages/NightclubPage"));

function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      style={{ color: "oklch(0.65 0.2 180)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full"
          style={{
            border: "2px solid oklch(0.25 0.02 260)",
            borderTopColor: "oklch(0.65 0.2 180)",
          }}
        />
        <span className="font-display text-sm uppercase tracking-widest glow-cyan">
          Loading...
        </span>
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const festivalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/festivals",
  component: FestivalsPage,
});

const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: PackagesPage,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: NewsPage,
});

const lineupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/festivals/$id/lineup",
  component: LineupPage,
});

const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donations",
  component: DonationsPage,
});

const sponsorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sponsors",
  component: SponsorsPage,
});

const raveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rave",
  component: RavePage,
});

const nightclubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nightclub",
  component: NightclubPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  festivalsRoute,
  packagesRoute,
  jobsRoute,
  contactRoute,
  adminRoute,
  newsRoute,
  lineupRoute,
  donationsRoute,
  sponsorsRoute,
  raveRoute,
  nightclubRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
