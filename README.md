# VerdiCarbon

## 🌱 Project Overview

**VerdiCarbon** is a decentralized application (dApp) that facilitates the management and exchange of carbon credits using blockchain technology. Built on the **Stellar** network and written in **Rust**, the platform enables users to securely **mint, transfer, buy, sell, and burn** carbon credits through a digital wallet system. The platform ensures that all transactions are traceable, wallets are secure, and operations are only executed when explicitly authorized by the user.

With a focus on environmental impact and technological integrity, VerdiCarbon promotes transparency, user empowerment, and meaningful participation in the global carbon offset market.

---

## 🌍 Vision Statement

At **VerdiCarbon**, we believe that combating climate change requires open and accessible tools. Our mission is to **democratize carbon offsetting** by integrating blockchain’s transparency and decentralization into a user-friendly platform. We want to empower individuals, businesses, and organizations to participate in **climate-positive actions** by making carbon credit trading:

- Easy to use,
- Secure and auditable,
- Environmentally impactful,
- Economically scalable.

Through our platform, users can not only track and manage their carbon credits but also become part of a larger ecosystem that values accountability and environmental stewardship.

---

## 🛠️ Software Development Plan

### 1. Smart Contract Design (Rust + Stellar)

- Define a `Wallet` structure with:
  - `balance`: native token amount
  - `carbon_credit`: current carbon credit holdings
  - `history`: transaction logs
  - `isLocked`: flag indicating if the wallet is locked

- Core Smart Contract Functions:
  - `mint(amount)`: Create new carbon credits
  - `burn(amount)`: Destroy credits to offset carbon
  - `transfer(to, amount)`: Send credits to another wallet
  - `buyCarbonCredit(amount)`: Purchase credits using balance
  - `sellCarbonCredit(amount)`: Convert credits to balance
  - `lockWallet() / unlockWallet(password)`: Prevent unauthorized operations

### 2. Error Handling & Logging

- Implement error safety using `Result<T, E>` types in Rust.
- Maintain a transaction history log by appending human-readable records to the `history` vector.

### 3. Core Business Rules

- All wallet operations require the wallet to be **unlocked**.
- Enforce checks for:
  - Sufficient balance during purchase
  - Sufficient credits during sale/transfer

### 4. Frontend Interface (React + TypeScript)

- Modular tabbed interface for:
  - **Buy**
  - **Sell**
  - **Burn**
- Dynamic feedback for operations (success, error)
- Disable all actions if the wallet is locked
- Show real-time transaction history

### 5. Stellar Blockchain Integration

- Use Anchor framework to compile and deploy Rust smart contracts to the **Stellar testnet**
- Integrate wallet interactions via Stellar’s SDK into the frontend
- Optionally include federated identity and on-chain account abstraction

### 6. Deployment

- Smart contracts deployed to **Stellar testnet**
- Web frontend hosted via **Vercel** or **Netlify**

---

## 👨‍💻 Team & Story

**Developed by:**  
- *Erdem Yavuz Çeltek*  
- *Aral Özokçular*

We are two tech enthusiasts with a passion for sustainability and emerging technologies. VerdiCarbon is our contribution to bridging the gap between climate responsibility and decentralized finance. Through this project, we hope to inspire responsible innovation and promote positive environmental change.

---

## 📎 Additional Information

If you’d like us to include:
- API documentation,
- Smart contract `.rs` files,
- Screenshots or UI diagrams,
- User stories or testing scenarios,

just send them my way, and I’ll update the `README.md` accordingly!
