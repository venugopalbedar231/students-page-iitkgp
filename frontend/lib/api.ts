/**
 * Returns the base API URL configured in the NEXT_PUBLIC_API_URL environment variable.
 * Throws a descriptive error if the variable is missing to prevent silent fallback to localhost.
 */
export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || !apiUrl.trim()) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing. Please configure NEXT_PUBLIC_API_URL in your environment variables (e.g. .env.local, Vercel environment variables, or Docker build args)."
    );
  }
  // Remove any trailing slashes for consistent endpoint concatenation
  return apiUrl.trim().replace(/\/+$/, "");
}
