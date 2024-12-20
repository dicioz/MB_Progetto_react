import CommunicationController from "./CommunicationController";


const getOrderStatus = async (oid, sid) => {
    try {
        const body = { sid: sid };
        const orderStatus = await CommunicationController.genericRequest(`/order/${oid}`, 'GET', null, body);   
        console.log('(orderStatusModel) orderStatus: ', orderStatus);
        return orderStatus;
    } catch (error) {
        console.error('Error during order status request: ', error);
        throw error;
        
    }
}

export default getOrderStatus;