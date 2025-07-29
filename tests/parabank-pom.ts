export class ParaBankLoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }
  page: any;
  usernameInput: any;
  passwordInput: any;
  loginButton: any;
  constructor(page: any) {
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export class ParaBankRegisterPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id="customer.address.state"]');
    this.zipInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmInput = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }
  page: any;
  registerLink: any;
  firstNameInput: any;
  lastNameInput: any;
  addressInput: any;
  cityInput: any;
  stateInput: any;
  zipInput: any;
  phoneInput: any;
  ssnInput: any;
  usernameInput: any;
  passwordInput: any;
  confirmInput: any;
  registerButton: any;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await this.registerLink.click();
  }

  async register(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipInput.fill(user.zip);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmInput.fill(user.password);
    await this.registerButton.click();
  }
}

export class ParaBankOverviewPage {
  constructor(page) {
    this.page = page;
  }
  page: any;
  }

  async isLoggedIn() {
    await this.page.waitForURL(/.*overview\.htm/);
    await this.page.getByText('Welcome').waitFor();
    await this.page.getByText('Account Services').waitFor();
  }
}

export class ParaBankUpdateProfilePage {
  constructor(page) {
    this.page = page;
    this.updateContactLink = page.getByRole('link', { name: 'Update Contact Info' });
    this.addressInput = page.locator('[id="customer.address.street"]');
    this.updateButton = page.getByRole('button', { name: 'Update Profile' });
  }
  page: any;
  updateContactLink: any;
  addressInput: any;
  updateButton: any;
  }

  async goto() {
    await this.updateContactLink.click();
  }

  async updateAddress(newAddress) {
    await this.addressInput.fill(newAddress);
    await this.updateButton.click();
  }

  async verifyAddressUpdated(newAddress) {
    await this.page.getByText('Profile Updated').waitFor();
    await expect(this.addressInput).toHaveValue(newAddress);
  }
}
