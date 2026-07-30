"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Email atau password salah");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-medium text-[#1A1A1A]">Masuk</h1>
        <p className="text-sm text-[#6B6B6B]">
          Selamat datang kembali
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-[#D94F4F]/5 px-4 py-3 text-sm text-[#D94F4F]">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <FieldLabel htmlFor="email" className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="h-10 border-0 border-b border-[#D5D0CA] bg-transparent px-0 text-sm text-[#1A1A1A] focus-visible:ring-0 focus-visible:border-[#1A1A1A]"
            required
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="password" className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 border-0 border-b border-[#D5D0CA] bg-transparent px-0 text-sm text-[#1A1A1A] focus-visible:ring-0 focus-visible:border-[#1A1A1A]"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="coffee"
        className="w-full h-10 gap-2 text-sm"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Masuk
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-[#6B6B6B]">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-[#C8603D] hover:text-[#1A1A1A] transition-colors"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-[#F5F3F0]">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[#1A1A1A]"
          >
            UMKM Lokal
          </Link>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-[#6B6B6B]" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
