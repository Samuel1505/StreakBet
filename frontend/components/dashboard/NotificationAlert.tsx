"use client";

import { Bell, Gift, AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface NotificationAlertProps {
  unclaimedPrizes: number;
  closingSoonBets: number;
  onClaimAll?: () => void;
}

export default function NotificationAlert({ 
  unclaimedPrizes, 
  closingSoonBets,
  onClaimAll 
}: NotificationAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || (unclaimedPrizes === 0 && closingSoonBets === 0)) {
    return null;
  }

  return (
    <div className="mb-8 space-y-3">
      {/* Unclaimed Prizes Alert */}
      {unclaimedPrizes > 0 && (
        <div className="relative bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4 animate-pulse">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 text-green-400 hover:text-green-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-500/30 rounded-lg">
              <Gift className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-400 font-semibold mb-1">
                🎉 You have {unclaimedPrizes} unclaimed {unclaimedPrizes === 1 ? "prize" : "prizes"}!
              </h3>
              <p className="text-green-300/80 text-sm mb-3">
                Claim your winnings now to add them to your wallet
              </p>
              {onClaimAll && (
                <button
                  onClick={onClaimAll}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-all"
                >
                  Claim All Prizes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Closing Soon Alert */}
      {closingSoonBets > 0 && (
        <div className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-yellow-400 font-semibold mb-1">
                ⏰ {closingSoonBets} {closingSoonBets === 1 ? "bet" : "bets"} closing within 24 hours
              </h3>
              <p className="text-yellow-300/80 text-sm">
                Review your active predictions before they close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}