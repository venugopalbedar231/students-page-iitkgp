/**
 * Returns the base API URL for CLIENT-SIDE requests (browser).
 * Uses NEXT_PUBLIC_API_URL — throws if missing.
 */
export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || !apiUrl.trim()) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing. Please configure NEXT_PUBLIC_API_URL in your environment variables (e.g. .env.local, Vercel environment variables, or Docker build args)."
    );
  }
  return apiUrl.trim().replace(/\/+$/, "");
}

/**
 * Returns the base API URL for SERVER-SIDE requests (SSR / Route Handlers running in Node.js).
 * Prefers INTERNAL_API_URL (internal Docker hostname) so that SSR fetches reach the backend
 * via the Docker network rather than going out through the public internet.
 * Falls back to NEXT_PUBLIC_API_URL if INTERNAL_API_URL is not set.
 */
export function getServerApiUrl(): string {
  const internal = process.env.INTERNAL_API_URL;
  if (internal && internal.trim()) {
    return internal.trim().replace(/\/+$/, "");
  }
  return getApiUrl();
}
