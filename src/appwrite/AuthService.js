import EnvironmentVariable from "../environment_variable/EnvironmentVariable";
import { Client, ID, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  // getting start to appwrite
  constructor() {
    this.client
      .setEndpoint(EnvironmentVariable.appwriteUrl)
      .setProject(EnvironmentVariable.appwriteProjectId);
    this.account = new Account(this.client);
    console.log();
  }

  // signup auth
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: signup :: error", error);
    }
  }

  // login auth
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession({ email, password });
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
    }
  }

  // logout auth
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  // checking if the user is login or not
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: error", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
