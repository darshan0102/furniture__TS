import orderModel from "../model/order.model";

export default class OrderService {
    // ADD ORDER
    addNewOrder = async (body: any) => {
        return await orderModel.create(body);
    }

    // GET ALL ORDER
    getAllOrder = async (body: any) => {
        return await orderModel.find(body);
    }

    // GET SPECIFIC ORDER
    getOrder = async (body: any) => {
        return await orderModel.findOne(body);
    }

    // GET SPECIFIC ORDER BY ID
    getOrderById = async (body: any) => {
        return await orderModel.findById(body);
    }

    // UPDATE ORDER
    updateOrder = async (id: string, body: any) => {
        return await orderModel.findByIdAndUpdate(id, {$set: body }, { new: true });
    }

}