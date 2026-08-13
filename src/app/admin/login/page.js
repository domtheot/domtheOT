'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo login — replace with Supabase auth in production
    if (email === 'dom@domtheot.com' && password === 'admin123') {
      localStorage.setItem('dom-admin-auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid email or password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <Image
          src="/images/logo.png"
          alt="Dom the OT"
          width={160}
          height={48}
          className="admin-login__logo"
        />
        <h1 className="admin-login__title">Welcome Back</h1>
        <p className="admin-login__subtitle">Sign in to your admin dashboard</p>

        {error && (
          <div
            style={{
              background: 'rgba(212, 75, 75, 0.08)',
              border: '1px solid rgba(212, 75, 75, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-error)',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="admin-email" className="form-label" style={{ textAlign: 'left' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-warm-gray-light)',
                }}
              />
              <input
                type="email"
                id="admin-email"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="admin-password" className="form-label" style={{ textAlign: 'left' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-warm-gray-light)',
                }}
              />
              <input
                type="password"
                id="admin-password"
                className="form-input"
                style={{ paddingLeft: '44px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn--primary btn--lg btn--full ${isLoading ? 'btn--loading' : ''}`}
            disabled={isLoading}
            style={{ marginTop: 'var(--space-4)' }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p
          style={{
            marginTop: 'var(--space-6)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-warm-gray-light)',
          }}
        >
          Demo: dom@domtheot.com / admin123
        </p>
      </div>
    </div>
  );
}
