import { contactsMock } from "./contacts-mock.js";

import { v4 as uuidV4 } from "uuid";

let savedContacts = [...contactsMock];

export const getContacts = (_, res) => {
    setTimeout(() => {
        res.send(savedContacts);
    }, 700);
};

export const createContact = (req, res) => {
    const newContact = req.body;
    const newContactName = newContact.name ? newContact.name.trim() : "";
    const hasValidName =
        !!newContact.name &&
        !savedContacts.some(({ name }) => name === newContactName);
    let success = false;

    if (hasValidName) {
        const newId = uuidV4();
        const newPhone = newContact.phone;

        savedContacts.push({
            id: newId,
            name: newContactName,
            phone: newPhone,
        });

        success = true;
    }

    setTimeout(() => {
        res.send({ success });
    }, 200);
};

export const deleteContact = (req, res) => {
    const contactId = req.params.contactId;
    savedContacts = savedContacts.filter(({ id }) => id !== contactId);

    setTimeout(() => {
        res.send({ success: true });
    }, 200);
};
