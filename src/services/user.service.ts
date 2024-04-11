import userModel from "../model/user.model";

 export default class UserService {
    // ADD USER
    addNewUser = async (body:any) => {
       return await userModel.create(body);
    }

    // GET ALL USER
    getAllUser = async (body:any) => {
        return await userModel.find(body);
    }

    // GET SPECIFIC USER
    getUser = async (body:any) => {
        return await userModel.findOne(body);
    }


    // GET SPECIFIC BY ID
    getUserById = async (body:any) => {
        return await userModel.findById(body);
    }

    // UPDATE USER
    updateUser = async (id:string , body:any) => {
        return await userModel.findByIdAndUpdate(id, {$set: body}, {new: true});
    }

    // DELETE USER
    deleteUser = async (id:string) => {
        return await userModel.findByIdAndDelete(id);
    }
}