import favoriteModel from "../model/favorite.model";

export default class FavoriteService {
    // ADD TO FAVORITE
    addNewFavorite = async (body: any) => {
        return await favoriteModel.create(body);
    }

    // GET ALL FAVORITE
    getAllFavorite = async (body: any) => {
        return await favoriteModel.find(body);
    }

    // GET SPECIFIC FAVORITE
    getFavorite = async (body: any) => {
        return await favoriteModel.findOne(body);
    }

    // GET SPECIFIC FAVORITE BY ID
    getFavoriteById = async (body: any) => {
        return await favoriteModel.findById(body);
    }

    // UPDATE FAVORITE
    updateFavorite = async (id: string, body: any) => {
        return await favoriteModel.findByIdAndUpdate(id, {$set: body }, { new: true });
    }
}