import EnvironmentVariable from "../environment_variable/EnvironmentVariable";
import { Client, Databases, Storage, Query } from "appwrite";

export class StorageService {
  // Getting started with appwrite
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(EnvironmentVariable.appwriteUrl)
      .setProject(EnvironmentVariable.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Create Post
  // slug is used as document Id
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        EnvironmentVariable.appwriteDatabaseId,
        EnvironmentVariable.appwriteCollectionId,
        { title, slug, content, featuredImage, status, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: create Post :: error", error);
    }
  }

  // update Post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        EnvironmentVariable.appwriteDatabaseId,
        EnvironmentVariable.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status },
      );
    } catch (error) {
      console.log("Appwrite service :: update post :: error ", error);
    }
  }

  // delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        EnvironmentVariable.appwriteDatabaseId,
        EnvironmentVariable.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: delete post :: error", error);
      return false;
    }
  }

  // get Single Post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        EnvironmentVariable.appwriteDatabaseId,
        EnvironmentVariable.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return false;
    }
  }

  // get Document only having active status.
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        EnvironmentVariable.appwriteDatabaseId,
        EnvironmentVariable.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite Service :: get posts :: error", error);
    }
  }
}

const storageService = new StorageService();
export default storageService;
