'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/primitives/Logo';
import { AuthBackdrop } from '@/components/primitives/AuthBackdrop';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [signupSuccess, setSignupSuccess] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin',
          full_name: fullName,
        },
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data.session) {
      // Session exists immediately -> redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Email confirmation required or pending activation
      setSignupSuccess(true);
    }
  }

  return (
    <>
      <Header />
      <main className="relative flex min-h-[calc(100vh-68px)] items-center justify-center overflow-x-hidden bg-slate-50/70 px-4 py-24">
        <AuthBackdrop />
        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex justify-center">
              <Link
                href="/"
                aria-label="Mango home"
                className="inline-flex rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                <Logo className="h-9 w-auto" />
              </Link>
            </div>
            <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-900">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Get started with Mango AI to launch your automated AI workspace.
            </p>

            {signupSuccess ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h3 className="mt-3 text-base font-semibold text-emerald-950">
                  Account Created Successfully!
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                  We sent a confirmation email to <strong>{email}</strong>. Please check your inbox to confirm your account and get started.
                </p>
                <div className="mt-5">
                  <Link
                    href="/signin"
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
                  >
                    Go to Sign in
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {errorMsg && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourcompany.com"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>

                  <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create account'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                  Already have an account?{' '}
                  <Link
                    href="/signin"
                    className="font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
