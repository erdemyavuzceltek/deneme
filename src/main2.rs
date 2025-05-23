use std::collections::HashMap;
#[derive(Debug,Default)]""
struct Wallet{
    id:u32,
    balance : f32,
    carbon_credit :f32,
    pub history : Vec<String>,
    isLocked: bool,
}
impl Wallet{
    pub fn new->Self{
        Wallet{
            balance : 0.0,
            carbon_credit:0.0,
            history : Vec::new(),
            isLocked:false,
        }
    }
    fn mint(&mut self,amount:f32){
        if self.isLocked{
            Return Err("Wallet is locked.".toString());
        }
        self.balance += amount;
        self.history.push(format!("Balance updated current balance is ",amount));
    }
}
fn get_balance(&self)-> f32{
    self.balance
}
fn get_carboncredit(&self)->f32{
    self.carbon_credit
}
fn get history (&self)->&Vec<String>{
    &self.history
}
fn lockWallet(&mut self){
    if self.isLocked{
        return Err("Wallet is already locked.".toString());
    }
    self.isLocked=true;
    Ok(())
}
fn unLockWallet(&mut self){
     if !self.isLocked{
        return Err("Wallet is already unlocked.".toString());
    }
    self.isLocked=false;
    Ok(())
}
fn checkLocked(&mut self)->Result(bool){
    return self.isLocked
}
fn transfer(&mut self,to &mut Wallet,amount :f32) -> Result<(),String>{
    if self.isLock && to.isLock {
        return Err("Wallets are locked cannot make transfer.".toString());
    }
    if self.balance<amount{
        return Err("Not enough balance to transfer.".toString());
    }
    self.balance-=amount;
    to.balance+=amount;
   if self.carbon_credit<1 || to.carbon_credit<1{
    Return Err("Not enough carbon credit to make transfer.".toString());
   }else {
    self.carbon_credit-=1;
    to.carbon_credit-=1;
    }
    Ok(())
}
fn burn(&mut self,amount:f32)->Result <(),String>{
    if self.isLock{
        Return Err("Wallet is locked cannot burn.".toString());
    }
    if self.balance < amount {
        return Err("Not enough credit to burn.".toString());
    }
    self.balance -=amount;
    Ok(())
}
fn checkCarbonCreditForTransfer(&mut self,amount:f32)->Result<(),String>{
    if amount>self.carbon_credit{
        return Err("Not enough carbon credit.".toString());
    }
}
fn transfer_carboncredit(&mut self,
    &mut Wallet,
    cc_amount:f32)->Result <(),String>{
  if self.isLock && to.isLock {
        return Err("Wallets are locked cannot make transfer.".toString());
    }
    if self.balance<carbon_credit{
        return Err("Not enough carbon credit to transfer.".toString());
    }
    else
    self.carbon_credit-=amount;
    to.carbon_credit+=amount;
    Ok(())
}
fn burn_carboncredit(&mut self,amount:f32)->Result<(),String>{
    if self.isLock{
        Return Err("Wallet is locked cannot burn.".toString());
    }
    if self.carbon_credit<amount{
        Return Err("Not enough carbon credit to burn.".toString());
    }
    self.carbon_credit-=amount;
    Ok(())
}
fn buyCarbonCredit(&mut self,carbonCreditToBuy:f32)->Result<(),String>{
    if self.isLocked{
        Return Err("Wallet is locked.".toString());
    }
    if carbonCreditToBuy*1000>self.balance{
        Return Err("Not enough credit to buy.".toString());
    }
self.balance-=carbonCreditToBuy*1000;
self.carbon_credit+=carbonCreditToBuy;
Ok(())
}
fn sellCarbonCredit(&mut self,carbonCreditToSell:f32)->Result<(),String>{
    if self.isLocked{
        Return Err("Wallet is locked.".toString());
    }
    if carbonCreditToSell>self.carbon_credit{
        Return Err("Not enough carbon credit to sell.".toString());
    }
    self.carbon_credit-=carbonCreditToSell;
    self.balance+=carbonCreditToSell*1000;
    Ok(())
}

