/**
 * Mock Auth Integration for Testing
 * Simulates Google OAuth and Supabase auth without real credentials
 */

export type MockUser = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
};

// Mock user database (in-memory for testing)
const mockUsers: Record<string, MockUser> = {
  "test@example.com": {
    id: "mock-user-1",
    email: "test@example.com",
    full_name: "Test Student",
    created_at: new Date().toISOString(),
  },
  "demo@google.com": {
    id: "mock-user-2",
    email: "demo@google.com",
    full_name: "Demo User",
    created_at: new Date().toISOString(),
  },
};

// Mock session storage
let currentSession: { user: MockUser; token: string } | null = null;

export const mockAuth = {
  /**
   * Mock Google OAuth sign-in
   * In testing, this simulates clicking "Continue with Google"
   */
  signInWithOAuth: async (provider: string, options: { redirect_uri: string }) => {
    if (provider !== "google") {
      return { error: { message: "Only Google provider is supported in mock mode" } };
    }

    // Simulate OAuth flow with demo user
    const demoUser = mockUsers["demo@google.com"];
    currentSession = {
      user: demoUser,
      token: "mock-jwt-token-" + Math.random().toString(36),
    };

    // Store in localStorage to persist across page reloads
    localStorage.setItem("mock-session", JSON.stringify(currentSession));

    // Simulate redirect after OAuth
    setTimeout(() => {
      window.location.href = options.redirect_uri;
    }, 500);

    return { error: null };
  },

  /**
   * Get current session
   */
  getSession: () => {
  // Always check localStorage first for latest session
  const stored = localStorage.getItem("mock-session");
  if (stored) {
    try {
      currentSession = JSON.parse(stored);
      return currentSession;
    } catch (e) {
      console.warn("Failed to parse mock session:", e);
      return null;
    }
  }
  return currentSession;
},

  /**
   * Sign out
   */
  signOut: async () => {
    currentSession = null;
    localStorage.removeItem("mock-session");
    return { error: null };
  },

  /**
   * Mock sign up
   */
  signUp: async (email: string, password: string, fullName: string) => {
    if (mockUsers[email]) {
      return { error: { message: "Email already exists" } };
    }

    const newUser: MockUser = {
      id: "mock-user-" + Math.random().toString(36).slice(2),
      email,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };

    mockUsers[email] = newUser;
    currentSession = {
      user: newUser,
      token: "mock-jwt-token-" + Math.random().toString(36),
    };

    localStorage.setItem("mock-session", JSON.stringify(currentSession));
    localStorage.setItem("mock-users", JSON.stringify(mockUsers));

    return { error: null };
  },

  /**
   * Mock sign in
   */
  signIn: async (email: string, password: string) => {
    const user = mockUsers[email];
    if (!user) {
      return { error: { message: "Invalid login credentials" } };
    }

    currentSession = {
      user,
      token: "mock-jwt-token-" + Math.random().toString(36),
    };

    localStorage.setItem("mock-session", JSON.stringify(currentSession));

    return { error: null };
  },
};

/**
 * Get all mock users for debugging
 */
export const getMockUsers = () => mockUsers;

/**
 * Add test user
 */
export const addMockUser = (user: MockUser) => {
  mockUsers[user.email] = user;
  localStorage.setItem("mock-users", JSON.stringify(mockUsers));
};
