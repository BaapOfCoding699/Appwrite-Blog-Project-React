import conf from "../conf/conf.js";
import { Client , ID , TablesDB , Storage , Query } from "appwrite";

export class Service{
    client = new Client()
    TablesDB
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title , slug , content , featuredImage ,status , userId}){
        try {
            
            return await this.tablesDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title , 
                    content ,
                    featuredImage,
                    status , 
                    userId,
                }
        )
        } catch (error) {
            console.log("appwrite service :: createPost :: error ",error);
        }
    }

    async updatePost( slug , {title , content ,featuredImage ,status ,userId }){
        try {
            return await this.tablesDB.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error ",error);
        }
    }

    async deletePost( slug ){
        try {
            await this.tablesDB.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deletePost :: error ",error);
            
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.tablesDB.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error ",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.tablesDB.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries,
            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error ",error);
            return false
        }
    }

    // File Upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error ",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf,appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error ",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service