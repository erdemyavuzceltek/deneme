use std::io;

#[derive(Debug, Default)]
struct Wallet {
    balance: u32,
    carbon_credit: u32,
    history: Vec<String>,
    is_locked: bool,
}

impl Wallet {
    pub fn new() -> Self {
        Wallet {
            balance: 0,
            carbon_credit: 0,
            history: Vec::new(),
            is_locked: false,
        }
    }

    fn mint(&mut self, amount: u32) {
        self.balance += amount;
        self.history.push(format!("Minted {} credits. New balance: {}", amount, self.balance));
    }

    fn get_history(&self) -> &Vec<String> {
        &self.history
    }

    fn lock_wallet(&mut self) -> Result<(), String> {
        if self.is_locked {
            return Err("Wallet is already locked.".to_string());
        }
        self.is_locked = true;
        Ok(())
    }

    fn unlock_wallet(&mut self) -> Result<(), String> {
        if !self.is_locked {
            return Err("Wallet is already unlocked.".to_string());
        }
        self.is_locked = false;
        Ok(())
    }

    fn transfer(&mut self, to: &mut Wallet, amount: u32) -> Result<(), String> {
        if self.is_locked || to.is_locked {
            return Err("One of the wallets is locked.".to_string());
        }
        if self.balance < amount {
            return Err("Insufficient balance.".to_string());
        }
        self.balance -= amount;
        to.balance += amount;
        self.history.push(format!("Transferred {} credits to another wallet.", amount));
        to.history.push(format!("Received {} credits.", amount));
        Ok(())
    }

    fn burn(&mut self, amount: u32) -> Result<(), String> {
        if self.is_locked {
            return Err("Wallet is locked, cannot burn.".to_string());
        }
        if self.balance < amount {
            return Err("Not enough balance to burn.".to_string());
        }
        self.balance -= amount;
        self.history.push(format!("Burned {} credits.", amount));
        Ok(())
    }

    fn transfer_carbon_credit(&mut self, to: &mut Wallet, amount: u32) -> Result<(), String> {
        if self.is_locked || to.is_locked {
            return Err("One of the wallets is locked.".to_string());
        }
        if self.carbon_credit < amount {
            return Err("Not enough carbon credits.".to_string());
        }
        self.carbon_credit -= amount;
        to.carbon_credit += amount;
        self.history.push(format!("Transferred {} carbon credits.", amount));
        to.history.push(format!("Received {} carbon credits.", amount));
        Ok(())
    }

    fn burn_carbon_credit(&mut self, amount: u32) -> Result<(), String> {
        if self.is_locked {
            return Err("Wallet is locked, cannot burn carbon credits.".to_string());
        }
        if self.carbon_credit < amount {
            return Err("Not enough carbon credits to burn.".to_string());
        }
        self.carbon_credit -= amount;
        self.history.push(format!("Burned {} carbon credits.", amount));
        Ok(())
    }
}

fn main() {
    let mut alice = Wallet::new();
    let mut bob = Wallet::new();

    loop {
        println!("\n--- Menu ---");
        println!("1. Mint credits to Alice");
        println!("2. Transfer credits from Alice to Bob");
        println!("3. Burn credits from Alice");
        println!("4. Lock/Unlock Alice's wallet");
        println!("5. Transfer carbon credits from Bob to Alice");
        println!("6. Burn carbon credits from Bob");
        println!("7. Show Alice's transaction history");
        println!("8. Exit");

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let choice: u32 = match input.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        match choice {
            1 => {
                alice.mint(100);
                println!(" Minted 100 credits to Alice.");
            }
            2 => {
                match alice.transfer(&mut bob, 50) {
                    Ok(_) => println!(" Transfer successful."),
                    Err(e) => println!(" Error: {}", e),
                }
            }
            3 => {
                match alice.burn(20) {
                    Ok(_) => println!(" Burned 20 credits from Alice."),
                    Err(e) => println!("Error: {}", e),
                }
            }
            4 => {
                if alice.is_locked {
                    match alice.unlock_wallet() {
                        Ok(_) => println!(" Alice's wallet has been unlocked."),
                        Err(e) => println!(" Error: {}", e),
                    }
                } else {
                    match alice.lock_wallet() {
                        Ok(_) => println!(" Alice's wallet has been locked."),
                        Err(e) => println!(" Error: {}", e),
                    }
                }
            }
            5 => {
                bob.carbon_credit = 100; // starting credits for example
                match bob.transfer_carbon_credit(&mut alice, 30) {
                    Ok(_) => println!(" Carbon credit transfer successful."),
                    Err(e) => println!(" Error: {}", e),
                }
            }
            6 => {
                match bob.burn_carbon_credit(10) {
                    Ok(_) => println!(" Burned 10 carbon credits from Bob."),
                    Err(e) => println!(" Error: {}", e),
                }
            }
            7 => {
                println!(" --- Alice's Transaction History ---");
                for entry in alice.get_history() {
                    println!("{}", entry);
                }
            }
            8 => {
                println!(" Exiting program...");
                break;
            }
            _ => println!("Invalid selection."),
        }
    }
}
