
import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { useGetContactsQuery, useAddContactMutation, useRemoveContactMutation } from "./features/contactsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setLastAction, resetLastAction } from "./features/infoSlice";

const App: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const dispatch = useDispatch();

    const { data: contacts, isLoading, refetch } = useGetContactsQuery();
    const contactsList = Array.isArray(contacts) ? contacts : [];
    const [addContact] = useAddContactMutation();
    const [removeContact] = useRemoveContactMutation();
    const lastAction = useSelector((state: RootState) => state.info.lastAction);

    const processResetsetLastAction = () => {
        dispatch(resetLastAction());
    };

    const handleAddContact = async () => {
        if (name && phone) {
            try {
                await addContact({ name, phone }).unwrap();
                setName("");
                setPhone("");
                await refetch();
                dispatch(setLastAction("Add Contact"));
            } catch (err) {
                console.error("Failed to add contact:", err);
            }
        }
    };

    const handleRemoveContact = async (id: string) => {
        try {
            await removeContact(id).unwrap();
            await refetch();
            dispatch(setLastAction("Remove Contact"));
        } catch (err) {
            console.error("Failed to remove contact:", err);
        }
    };

    return (
        <div className="App">
            <h1>Contact List </h1>
            <div className="info">
                <span className="info-last-action">
                    {lastAction === null
                        ? "No Updates in This Session"
                        : `Last Action: ${lastAction}`}
                </span>
                <button onClick={processResetsetLastAction}>Reset</button>
            </div>
            <div className="form">
                <div>
                    <label>
                        Contact Name:
                        <input
                            name="contact-name"
                            type="text"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            placeholder="Contact Name"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Phone Number:
                        <input
                            name="contact-phone"
                            type="text"
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                    </label>
                </div>

                <button
                    className="add-contact-button"
                    onClick={handleAddContact}
                >
                    Add Contact
                </button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="contact-list">
                    {contactsList.map((contact) => (
                        <li key={contact.id}>
                            <span>
                                {contact.name} - {contact.phone}
                            </span>
                            <button
                                onClick={() => handleRemoveContact(contact.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
