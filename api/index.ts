import { Readable } from "node:stream";

import server from "../src/server";

function toHeaders(input: any): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(input ?? {})) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, String(value));
    }
  }

  return headers;
}

function getRequestUrl(request: { headers: Record<string, string | string[] | undefined>; url?: string }) {
  const forwardedProto = request.headers["x-forwarded-proto"];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "https";
  const hostHeader = request.headers.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader || "localhost:3000";
  return `${protocol}://${host}${request.url || "/"}`;
}

export default async function handler(request: any, response: any) {
  try {
    const method = String(request.method || "GET").toUpperCase();
    const body = method === "GET" || method === "HEAD" ? undefined : Readable.toWeb(request);
    const fetchRequest = new Request(getRequestUrl(request), {
      method,
      headers: toHeaders(request.headers),
      body,
      duplex: body ? "half" : undefined,
    });

    const fetchResponse = await server.fetch(fetchRequest, process.env, {});

    response.statusCode = fetchResponse.status;
    fetchResponse.headers.forEach((value, key) => {
      response.setHeader(key, value);
    });

    if (method === "HEAD") {
      response.end();
      return;
    }

    const buffer = Buffer.from(await fetchResponse.arrayBuffer());
    response.end(buffer);
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.setHeader("content-type", "text/plain; charset=utf-8");
    response.end("Internal Server Error");
  }
}