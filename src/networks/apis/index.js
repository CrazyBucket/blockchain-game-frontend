import ApiBase from "../api_base";

class Apis extends ApiBase {
  constructor() {
    super();
    this.urls = {
      createUser: "/users/create",
      login: "/token",
      newTransaction: "/transactions/new",
      mine: "/mine",
      getChain: "/chain",
      listUsers: "/users",
      getCards: "/cards",
      getUserInfo: "/users/me",
    };
  }

  async createUser(userData) {
    const res = await this.service.post(this.urls.createUser, userData);
    return res.data;
  }

  async login(formData) {
    const encodedData = new URLSearchParams(formData).toString();
    const res = await this.service.post(this.urls.login, encodedData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  }

  async newTransaction(transactionData) {
    const res = await this.service.post(
      this.urls.newTransaction,
      transactionData
    );
    return res.data;
  }

  async mine() {
    const res = await this.service.post(this.urls.mine);
    return res.data;
  }

  async getChain() {
    const res = await this.service.get(this.urls.getChain);
    return res.data;
  }
    
  async getUserInfo() {
    const res = await this.service.get(this.urls.getUserInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data;
  }

  async getCards() {
    const res = await this.service.get(this.urls.getCards);
    return res.data;
  }

  async listUsers() {
    const res = await this.service.get(this.urls.listUsers);
    return res.data;
  }
}

export const apis = new Apis();
