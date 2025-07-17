'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FaCopy, FaTelegramPlane, FaUsers } from 'react-icons/fa';

export default function DashboardPage() {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [downlineCount, setDownlineCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUserAndData = async () => {
      // Get current logged in user from Supabase Auth
      const { data: authData } = await supabase.auth.getUser();
      const email = authData?.user?.email;

      if (!email) return;

      setUserEmail(email);

      // Construct referral link using consistent query param 'invited_by'
      // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const link = `${siteUrl}/auth/sign-up?invited_by=${email}`;
      setReferralLink(link);

      // Fetch user record from 'users' table to get invites array
      const { data: userRecord, error } = await supabase
        .from('users')
        .select('invites')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Failed to fetch user invites:', error.message);
        setDownlineCount(0);
      } else {
        setDownlineCount(userRecord?.invites?.length ?? 0);
      }
    };

    fetchUserAndData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Welcome Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
          Welcome, {userEmail ? userEmail.split('@')[0] : 'User'}!
        </h1>

        {/* Referral Link Section */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-4">
          <p className="font-semibold text-gray-800">Your Invitation Link:</p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm text-gray-700 w-full truncate text-center sm:text-left sm:flex-1">
              {referralLink}
            </span>
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md transition text-sm font-medium ${
                copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <FaCopy /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Downline Section */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaUsers size={28} className="text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Active Downlines</p>
              <p className="text-xl font-bold text-blue-600">{downlineCount}</p>
            </div>
          </div>
        </div>

        {/* Telegram Section */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md text-center">
          <p className="font-semibold text-gray-800 mb-2">Telegram Support:</p>
          <a
            href="https://t.me/Awokemu19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-blue-600 hover:underline"
          >
            <FaTelegramPlane className="mr-2" /> @Awokemu19
          </a>
        </div>
      </div>
    </div>
  );
}
