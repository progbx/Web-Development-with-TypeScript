import { Router } from "express";
import { getContacts, createContact, deleteContact } from "./controller.js";

export const contactsRouter = Router();

contactsRouter.route("/").get(getContacts);
contactsRouter.route("/").post(createContact);
contactsRouter.route("/:contactId").delete(deleteContact);
