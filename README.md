
# VerdiCarbon

## Project Description
VerdiCarbon is a decentralized carbon credit wallet and trading platform built on the Stellar blockchain. It allows users to securely buy, sell, transfer, and burn carbon credits using a digital wallet. The system tracks user balances, maintains transaction history, and ensures that operations are only possible when wallets are unlocked. Through an efficient and transparent design, VerdiCarbon makes carbon offset participation accessible and traceable for everyone.

## Vision Statement
VerdiCarbon aims to democratize the carbon credit ecosystem by leveraging blockchain technology for transparency, accessibility, and accountability. With VerdiCarbon, individuals and organizations can manage carbon credits easily while contributing to the global fight against climate change. By simplifying carbon credit trading and integrating robust wallet security features, we envision a greener, more responsible digital economy.

## Software Development Plan
1. **Smart Contract Core Design**
   - Implement Wallet struct with fields: `balance`, `carbon_credit`, `history`, and `isLocked`.
   - Develop core functions:
     - `mint`, `burn`, `transfer`, `buyCarbonCredit`, `sellCarbonCredit`, `lockWallet`, `unlockWallet`.
     - Each function manages balance, credit logic, and wallet lock state.

2. **Error Handling & Logging**
   - Use Rust `Result` enums to return success or failure.
   - Append formatted messages to the `history` vector for audit trails.

3. **Business Logic Enforcement**
   - Ensure wallets must be unlocked to operate.
   - Require sufficient credit or balance for buy/sell/transfer.

4. **Frontend Interface**
   - Use React + TypeScript with Tabs for Buy, Sell, Burn functionality.
   - Disable inputs when wallet is locked.
   - Display real-time feedback and history.

5. **Integration with Stellar**
   - Compile Rust smart contract to be deployed on Stellar via Anchor.
   - Connect front-end to on-chain wallet logic.

6. **Deployment**
   - Deploy smart contracts to Stellar testnet.
   - Host frontend on Vercel or Netlify.

## Personal Story Summary
We, Erdem Yavuz Çeltek and Aral Özokçular(@araloz), are committed to addressing environmental issues with cutting-edge technology. With VerdiCarbon, we aim to merge climate consciousness with blockchain innovation to make sustainability actionable, transparent, and efficient for all.

