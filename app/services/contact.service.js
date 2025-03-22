const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    };

    //Dinh nghia cac phuong thuc
    extractConactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        //Remote undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true}
        );
        return result;
    }

    async find(filter) {
        const curror = await this.Contact.find(filter);
        return await curror.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        }  );
    }
}

module.exports = ContactService;