export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  inbox: "/inbox",
  email: (id: string) => `/inbox/${id}`,
  chat: "/chat",
  analytics: "/analytics",
  settings: "/settings",
} as const;

/** Routes that don't require an authenticated session. */
export const PUBLIC_ROUTES: string[] = [ROUTES.home, ROUTES.login];

/** Route prefixes that require an authenticated session. */
export const PROTECTED_ROUTE_PREFIXES: string[] = [
  ROUTES.dashboard,
  ROUTES.inbox,
  ROUTES.chat,
  ROUTES.analytics,
  ROUTES.settings,
];
