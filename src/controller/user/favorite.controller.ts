import FavoriteServices from "../../services/favorite.service";
import { Request, Response } from "express";
const favoriteService = new FavoriteServices();

declare global {
  namespace Express {
      interface Request {
          favorite?: any;
      }
  }
}

// ADD NEW FAVORITE
export const addNewFavorite = async (req: Request,res: Response) => {
  try {
    let favorite = await favoriteService.getFavorite({
      product: req.body.product,
      user: (req.user as any )._id,
      isDelete: false,
    });
    if (favorite) {
      return res.status(400).json({ Message: "Favorite is alredy exist" });
    }
    favorite = await favoriteService.addNewFavorite({ ...req.body, user: (req.user as any )._id });
    res.status(201).json({ favorite, Message: "Favorite is Added..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
  }
};

// GET ALL FAVORITE
export const getAllFavorite = async (req: Request,res: Response) => {
  try {
    let favorite = await favoriteService.getAllFavorite(req.query);
    res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
  }
}

// DELETE FAVORITE
export const deleteFavorite = async (req: Request,res: Response) => {
  try {
    let favorite = await favoriteService.getFavoriteById(req.query.Id);
    if (!favorite) {
      return res.status(404).json({ Message: "favorite is not found" });
    }
    favorite = await favoriteService.updateFavorite(favorite._id, {
      isDelete: true,
    });
    res.status(202).json({ favorite, Message: "favorite is Deleted..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
  }
};