import EnvironmentVariable from "../environment_variable/EnvironmentVariable";
import { Client, ID, Databases, Storage } from "appwrite";

export class FileService {
  client = new Client();
  databases;
  Storage;

  constructor() {
    this.client
      .setEndpoint(EnvironmentVariable.appwriteUrl)
      .setProject(EnvironmentVariable.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // upload file
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        EnvironmentVariable.appwriteBucketId,
        // file Id  created and Id is provided to featuredImage
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        EnvironmentVariable.appwriteBucketId,
        fileId,
      );
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);
    }
  }

  // preview file
  async getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(
        EnvironmentVariable.appwriteBucketId,
        fileId,
      );
    } catch (error) {
      console.log("Appwrite Service :: preview file :: error", error);
    }
  }
}

const fileService = new FileService();
export default fileService;
