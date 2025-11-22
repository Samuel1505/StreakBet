interface ExportBet {
  id: string;
  question: string;
  selectedOption: string;
  entryFee: string;
  timestamp: Date;
  endTime: Date;
  status: string;
  prizeAmount?: string;
  claimed?: boolean;
  totalParticipants: number;
}

interface ExportStats {
  totalPredictions: number;
  correctPredictions: number;
  currentStreak: number;
  longestStreak: number;
  totalWinnings: string;
  accuracyPercentage: number;
  totalPoints: number;
  walletBalance: string;
}

export const exportBetsToCSV = (bets: ExportBet[], stats: ExportStats, userAddress: string) => {
  // Create CSV header
  const headers = [
    "Bet ID",
    "Question",
    "Your Prediction",
    "Entry Fee (ETH)",
    "Placed At",
    "Closes At",
    "Status",
    "Prize Amount (ETH)",
    "Claimed",
    "Participants"
  ];

  // Create CSV rows
  const rows = bets.map(bet => [
    bet.id,
    `"${bet.question.replace(/"/g, '""')}"`, // Escape quotes
    bet.selectedOption,
    bet.entryFee,
    bet.timestamp.toISOString(),
    bet.endTime.toISOString(),
    bet.status,
    bet.prizeAmount || "N/A",
    bet.claimed ? "Yes" : "No",
    bet.totalParticipants.toString()
  ]);

  // Add summary section
  const summary = [
    [],
    ["SUMMARY"],
    ["Total Predictions", stats.totalPredictions],
    ["Correct Predictions", stats.correctPredictions],
    ["Win Rate", `${stats.accuracyPercentage.toFixed(1)}%`],
    ["Current Streak", stats.currentStreak],
    ["Longest Streak", stats.longestStreak],
    ["Total Winnings", `${stats.totalWinnings} ETH`],
    ["Total Points", stats.totalPoints],
    ["Wallet Balance", `${stats.walletBalance} ETH`],
    [],
    ["Wallet Address", userAddress],
    ["Export Date", new Date().toISOString()]
  ];

  // Combine all data
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(",")),
    ...summary.map(row => row.join(","))
  ].join("\n");

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `streakbet_dashboard_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};