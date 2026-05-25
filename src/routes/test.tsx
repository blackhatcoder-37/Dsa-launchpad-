import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: TestPage,
});

function TestPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>✅ VERCEL BUILD WORKING</h1>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>If you see this page, Vercel successfully deployed the latest code.</p>
      <a href="/" style={{ display: "block", marginTop: "1rem", color: "blue" }}>
        Back to home
      </a>
    </div>
  );
}
