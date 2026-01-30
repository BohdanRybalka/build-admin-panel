/**
 * API Configuration
 * Centralizes API base URL configuration based on environment
 */

// Use environment variable if available, otherwise default to /api for nginx proxy
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Helper function to build full API endpoint URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  // Ensure API_BASE_URL doesn't end with slash
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

  return `${baseUrl}/${cleanEndpoint}`;
};
