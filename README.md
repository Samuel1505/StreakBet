# 🏆 StreakBet 🔥  
### The Gamified Prediction Market on Base  

![Show Image](#)
![Show Image](#)
![Show Image](#)

**StreakBet** is the first prediction market that rewards consistency through gamified streaks.  
Build winning streaks to earn prize multipliers up to **2x**, compete on global leaderboards, and turn your prediction accuracy into a daily habit.

🌐 **Website:** [streak-bet.verce.app](#)  
📱 **App:** [streak-bet.verce.app](#)  
---

## 📖 Table of Contents
- [Overview](#-overview)
- [Why StreakBet?](#-why-streakbet)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
  - [For Users](#for-users)
  - [For Creators](#for-creators)
- [Smart Contract Architecture](#-smart-contract-architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview
**StreakBet** combines the engagement mechanics of *Duolingo* with the financial incentives of prediction markets.  
Unlike traditional platforms like Polymarket where each prediction is isolated, StreakBet rewards users for maintaining accuracy over time through:

- 🔥 **Streak Multipliers** — Up to 2x prize multipliers for consecutive correct predictions  
- 🏆 **Triple Leaderboards** — Compete on streaks, total winnings, and accuracy  
- 🛡️ **Streak Savers** — Buy insurance to protect your streak once  
- ⚡ **Built on Base** — Fast, cheap transactions (~$0.01 per prediction)  
- 🎮 **Gamified Experience** — Daily engagement hooks that create habits  

---

## 💡 Why StreakBet?

### The Problem  
Existing prediction markets suffer from low engagement and retention:
- Users make one prediction and never return (5–10% DAU rate)
- No rewards for consistency
- No social competition or public reputation systems
- Boring, transactional experiences with no game mechanics

### Our Solution  
StreakBet transforms prediction markets from one-time transactions into an addictive daily habit:

| Feature | Traditional Markets | StreakBet |
|----------|--------------------|------------|
| **Daily Engagement** | 5–10% DAU | 30–40% DAU target |
| **Consistency Rewards** | None | Up to 2x multipliers |
| **Social Competition** | None | 3 public leaderboards |
| **Loss Protection** | None | Streak Savers |
| **Transaction Costs** | $0.50–$5 | ~$0.01 on Base |

---

## ✨ Key Features

### 1. **Streak-Based Prize Multipliers 🔥**

Build your winning streak to unlock bigger prizes:
- 3-day streak → **1.2x multiplier**
- 5-day streak → **1.5x multiplier**
- 10+ day streak → **2.0x multiplier**

**Example:**
- Base prize: `0.1 ETH`  
- 10-day streak: `0.2 ETH` (2x multiplier)  
- You earn **100% more** for the same prediction.

---

### 2. **Triple Leaderboard System 🏆**

Compete publicly on three leaderboards:
- 🔥 **Streak Leaders** – Longest active streaks  
- 💰 **Winnings Leaders** – Total ETH earned  
- 🎯 **Accuracy Leaders** – Highest win rate (min 5 predictions)

All stats are **on-chain and verifiable** — build your reputation as a top predictor.

---

### 3. **Streak Savers (Loss Protection) 🛡️**

Buy a Streak Saver for **0.01 ETH** to protect your streak:
- Activates automatically on wrong prediction  
- Preserves your streak and multiplier  
- One-time use (buy multiple if desired)  
- Adds strategy: *“Do I risk my 15-day streak on this?”*

---

### 4. **Community-Driven Markets ✨**

**Anyone can create prediction markets:**
- Set your question and options  
- Add initial prize pool (min 0.01 ETH)  
- Define entry fee and timeframes  

**Examples:**
- Will ETH hit $3,000 by Friday?  
- Will the Lakers win tonight?  
- Will Bitcoin reach a new ATH this month?  
- Will Base TVL exceed $2B this week?  

---

### 5. **Fair Dispute Resolution ⚖️**
If a creator resolves incorrectly:
1. Anyone can challenge by staking **0.01 ETH**  
2. Community voting opens for 3 days  
3. Majority decision determines the correct outcome  

---

### 6. **Simple Prize Pool Model 💰**

🛠️ Technology Stack

Smart Contracts

Solidity 0.8.19

Framework: Foundry / Hardhat

Library: OpenZeppelin

Network: Base Mainnet (Chain ID 8453)

Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

wagmi v2 / viem / RainbowKit / Tanstack Query

Backend (Optional)

Supabase / Firebase

Redis / The Graph

Infrastructure

Hosting: Vercel

RPC: Alchemy / Infura

Storage: IPFS (Pinata)

Analytics: Mixpanel / PostHog

🚀 Getting Started
For Users

Requirements:

Web3 wallet (MetaMask, Coinbase, etc.)

ETH on Base

Steps:

Visit app.streakbet.xyz

Connect wallet

Get Base ETH via bridge.base.org

Make your first prediction 🔥

Track stats & buy Streak Savers

For Developers

Prerequisites:

Node.js 18+

pnpm / yarn / npm

Git

Base Sepolia testnet ETH

📦 Installation
git clone https://github.com/yourusername/streakbet.git
cd streakbet


Install Dependencies

# Frontend
cd frontend && pnpm install

# Smart Contracts
cd ../contracts && forge install

💻 Usage

Run Frontend Locally

cd frontend
pnpm dev


Visit: http://localhost:3000

Run Tests

cd contracts
forge test -vvv
forge coverage

🚢 Smart Contract Deployment

Deploy to Base Sepolia

forge script script/Deploy.s.sol \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  --verify


Deploy to Base Mainnet

forge script script/Deploy.s.sol \
  --rpc-url $BASE_RPC_URL \
  --broadcast --verify --slow

🧪 Testing

Coverage (>95%)

✅ Prediction creation

✅ Resolution & streak logic

✅ Leaderboards

✅ Streak Saver

✅ Disputes

✅ Integration lifecycle

