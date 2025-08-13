import { Client, ID, Databases, Query, Storage } from 'appwrite'
import conf from '../conf/conf'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebase'
import { supabase } from '../supabaseClient'



export class Service {
    firestore;
    databases;
    bucket;

    constructor() {
        // this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)

        this.firestore = getFirestore(app);

    }

    async createPost({ title, slug, content, featuredImage, status, userId, imagePath }) {
        try {
            // return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status, userId });

            // const docRef = await addDoc(collection(this.firestore, 'blog'), {
            //     title: title,
            //     content: content,
            //     featuredImage: featuredImage,
            //     status: status,
            //     userId: userId,

            // })

            console.log(status);
            
            const docRef = await supabase.from('blog').insert({
                title: title,
                content: content,
                featuredImage: featuredImage,
                status: status,
                userId: userId,
                slug: slug,
                imagePath: imagePath,
            }).select()

            // console.log(docRef.data[0].id);

            return docRef.data[0].id;

        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ", error);

        }
    }

    async updatePost( id, { title, slug, content, featuredImage, status, userId, imagePath }) {
        try {
            // return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status });
            const docRef = await supabase.from('blog').update({
                title: title,
                content: content,
                featuredImage: featuredImage,
                status: status,
                userId: userId,
                slug: slug,
                imagePath: imagePath,
            }).eq('id', id).select()

            return docRef.data[0].id;
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error ", error);

        }
    }

    async deletePost(slug) {
        try {
            // await deleteDoc(doc(this.firestore, "blog", slug));
            await supabase.from('blog').delete().eq('id', slug)
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error ", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            // const docRef = doc(this.firestore, 'blog', slug)
            // return await getDoc(docRef);

            const { data } = await supabase.from('blog').select().eq('id', slug);

            // console.log(data[0]);

            return data[0]


        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ", error);
            return false
        }
    }

    async getPosts(column, value) {
        try {
            // return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);

            // const querySnapshot = await getDocs(collection(this.firestore, "article"));

            const {data} = await supabase.from('blog').select().eq(column, value)
            console.log(data);
            
            return data
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error ", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            // return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
            const userId = (await supabase.auth.getSession()).data.session.user.id

            console.log(String(userId) + '/' + 'asdnwonqdnsladqwo');


            return await supabase.storage.from('images').upload(`${userId}/${file.name}`, file)
            // return  data
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
            return false
        }
    }

    async deleteFile(filePath) {
        try {
            // await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            await supabase.storage.from('images').remove([filePath])
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
            return false
        }
    }

    getFilePreview(filePath) {
        // return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);

        const { data } = supabase.storage.from('images').getPublicUrl(filePath)
        // console.log(data.publicUrl);

        return data.publicUrl

    }

}



const service = new Service()

export default service