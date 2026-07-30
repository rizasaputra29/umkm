import { auth } from "./auth";
import { headers } from "next/headers";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Sesi tidak valid. Silakan login kembali.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Akses ditolak. Hanya admin yang dapat melakukan operasi ini.");
  }

  return session;
}
