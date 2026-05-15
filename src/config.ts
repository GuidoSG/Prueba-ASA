const VALID_TOKEN = 'challenge-access-2024'

export function validateAccess(): void {
  const token = import.meta.env.VITE_ACCESS_TOKEN
  if (!token || token !== VALID_TOKEN) {
    throw new Error('401: Unauthorized. Invalid or missing access token. Check your environment configuration.')
  }
}
