import CommunicationController from "./CommunicationController";


const getOrderStatus = async (oid, sid) => {
    try {
        console.log("(orderStatusModel) sid: ", sid);
        const query = { sid: sid };
        const orderStatus = await CommunicationController.genericRequest(`/order/${oid}`, 'GET', query, {});   
        console.log('(orderStatusModel) orderStatus: ', orderStatus);
        return orderStatus;
    } catch (error) {
        console.error('Error during order status request: ', error);
        throw error;
        
    }
}

export default getOrderStatus;