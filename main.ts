import inquirer from "inquirer";

// bank account interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

//bank account class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;
  constructor(accountNumber: number, balance: number) {
    (this.accountNumber = accountNumber), (this.balance = balance);
  }

  // debit money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `withdrawal of $${amount} successful. Remaining balance: $${this.balance}`
      );
    } else {
      console.log("insufficient balance");
    }
  }

  //Credit money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful Remaining balance: $${this.balance}`
    );
  }
  //check balance
  checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
  }
}

//create customer class

class customer {
  name: string;
  fullname: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    name: string,
    fullname: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.name = name;
    this.fullname = fullname;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}
// Create Bank Account

const accounts: BankAccount[] = [
  new BankAccount(101, 500),
  new BankAccount(102, 1000),
  new BankAccount(103, 5000),
];

// Create new customers

const customers: customer[] = [
  new customer("sion", "uchiha", "male", 18, 3238732983, accounts[0]),
  new customer("toji", "uchiha", "male", 35, 3238762833, accounts[1]),
  new customer("gojo", "uchiha", "male", 29, 3276832983, accounts[2]),
];

// Function to interact with bank account

async function service() {
  do {
    const accountNumberinput = await inquirer.prompt({
      name: "accountnumber",
      type: "number",
      message: "Please Enter your account number",
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberinput.accountnumber
    );
    if (customer) {
      console.log(`WELCOME ${customer.name} ${customer.fullname}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "select an operation",
          choices: ["Deposit", "Withdraw", "Check Balance", "exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: "Enter the Amount To Deposit:",
            },
          ]);
          customer.account.deposit(depositAmount.amount);

          break;

        case "Withdraw":
          const WithdrawAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: "Enter the Amount To Withdraw",
            },
          ]);
          customer.account.withdraw(WithdrawAmount.amount);
          break;

        case "Check Balance":
          console.log(customer.account.balance);
          break;
        case "exit":
          console.log("Exiting The Bank...");
          console.log(
            "\nThank You For Using Our Bank Services.Have a Great Day"
          );
          return;
      }
    } else {
      console.log("invalid Account Number. Please Try Again.");
    }
  } while (true);
}

service();
