'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Database, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function DbStatusBanner() {
  const { dbStatus, refreshDbStatus } = useApp();

  return (
    <div className="bg-slate-950/70 border-b border-slate-800/80 backdrop-blur-md px-4 py-2 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-slate-400">Database Engine:</span>
          <span className="font-mono text-amber-300">MySQL ({dbStatus?.host || 'localhost'}:{process.env.NEXT_PUBLIC_DB_PORT || '3306'})</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">DB:</span>
          <span className="font-mono text-slate-200">{dbStatus?.database || 'zenith_it_db'}</span>
        </div>

        <div className="flex items-center gap-3">
          {dbStatus?.connected ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              MySQL Online & Synced
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium" title={dbStatus?.error || 'MySQL is in fallback mode'}>
              <AlertTriangle className="w-3.5 h-3.5" />
              MySQL Standby / Memory Fallback Active
            </span>
          )}

          <button
            onClick={() => refreshDbStatus()}
            className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
            title="Refresh MySQL connection test"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
