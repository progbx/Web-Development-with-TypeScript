import "@testing-library/jest-dom";
import path from "path";
import {
    act,
    render,
    fireEvent,
    screen,
    waitFor,
    cleanup,
} from "@testing-library/react";
import { readJsonFile } from "./utils/readJsonFile";
import { mergePackageDependenciesNames } from "./utils/mergePackageDependenciesNames";
import { importModuleWithIgnoredErrors } from "./utils/importModuleWithIgnoredErrors";

describe("Async Redux", () => {
    let packageJsonParsed: any;
    let projectRootPath: string;
    let storeModule: any;
    let App: any;
    let Provider: any;
    let infoSliceModule: any;

    let getContactsPromise: Promise<unknown>;
    let contacts: Record<string, string>[];

    let getContactsCallCount: number;
    let newName: string;
    let newPhoneNumber: string;

    beforeEach(async () => {
        projectRootPath = path.resolve(__dirname, "../");
        const packageJsonPath = path.resolve(projectRootPath, "package.json");

        const packageJSONFileReadResult = await readJsonFile(packageJsonPath);
        packageJsonParsed = packageJSONFileReadResult.fileJSON;

        const storeModulePath = path.join(projectRootPath, "src/redux/store");
        const AppModulePath = path.join(projectRootPath, "src/App");
        const reactReduxPath = "react-redux";
        const infoSliceModulePath = path.join(
            projectRootPath,
            "src/features/infoSlice"
        );

        getContactsCallCount = 0;
        contacts = [
            {
                id: "111",
                name: "Contact1",
                phone: "111111",
            },
            {
                id: "222",
                name: "Contact2",
                phone: "222222",
            },
        ];
        newName = "New Name";
        newPhoneNumber = "333555";

        getContactsPromise = Promise.resolve(fetchResponseFactory(contacts));

        infoSliceModule = await importModuleWithIgnoredErrors(
            infoSliceModulePath
        );

        storeModule = await importModuleWithIgnoredErrors(storeModulePath);
        const AppModule = await importModuleWithIgnoredErrors(AppModulePath);
        const reactReduxModule = await importModuleWithIgnoredErrors(
            reactReduxPath
        );

        App = AppModule?.default;
        Provider = reactReduxModule?.Provider;
    });

    afterEach(cleanup);

    // Store need to be reset after each test
    afterEach(() => {
        if (storeModule?.store?.dispatch && infoSliceModule?.setLastAction) {
            storeModule?.store?.dispatch(infoSliceModule?.setLastAction(null));
        }
    });

    function renderWithProvider(ui: React.ReactElement) {
        return render(<Provider store={storeModule?.store}>{ui}</Provider>);
    }

    function fetchResponseFactory(data: any) {
        return new Response(JSON.stringify(data));
    }

    function mockFetchWithContactsData() {
        (fetch as any).mockResponse((req: any) => {
            getContactsCallCount++;
            const isGetContactsRequest =
                req.method === "GET" &&
                req.url === "http://localhost:3033/api/contacts/";

            if (isGetContactsRequest) {
                return getContactsPromise;
            }

            return Promise.resolve(fetchResponseFactory({}));
        });
    }

    describe("1. Configure the store", () => {
        it("required dependencies should be installed", () => {
            const mergedDepAndDevDeps =
                mergePackageDependenciesNames(packageJsonParsed);

            expect(mergedDepAndDevDeps.includes("react-redux")).toBe(true);
            expect(mergedDepAndDevDeps.includes("@reduxjs/toolkit")).toBe(true);
        });

        it("should have a src/redux/store file", () => {
            expect(storeModule).not.toBeNull();
        });

        it("should define store", () => {
            // These function always exist in Redux Store
            // So, if they defined, it is a redux store
            expect(storeModule?.store).toEqual(
                expect.objectContaining({
                    getState: expect.any(Function),
                    dispatch: expect.any(Function),
                    subscribe: expect.any(Function),
                    replaceReducer: expect.any(Function),
                })
            );
        });
    });

    describe("2. Configure contactsApi", () => {
        let contactsApiModule: any;
        let contactsApi: any;
        let endpoints: any;

        beforeEach(async () => {
            const contactsApiModulePath = path.join(
                projectRootPath,
                "src/features/contactsApi"
            );

            contactsApiModule = await importModuleWithIgnoredErrors(
                contactsApiModulePath
            );

            contactsApi = contactsApiModule?.contactsApi;
            endpoints = contactsApi?.endpoints;
        });

        it("should have a src/features/contactsApi file", () => {
            expect(contactsApiModule).not.toBeNull();;
        });

        it("should define contactsApi and export it", () => {
            // These function always exist in Redux Store
            // So, if they defined, it is a redux store
            expect(contactsApiModule?.contactsApi).toBeDefined();
        });

        it("should have 'contactsApi' reducer path", () => {
            expect(contactsApi.reducerPath).toEqual("contactsApi");
        });

        describe("endpoints", () => {
            it("should define getContacts query", () => {
                const getContacts = endpoints?.getContacts;

                expect(getContacts?.name).toBe("getContacts");
                expect(getContacts?.useQuery).toBeDefined();
            });

            it("should define addContact mutation", () => {
                const addContact = endpoints?.addContact;

                expect(addContact?.name).toBe("addContact");
                expect(addContact?.useMutation).toBeDefined();
            });

            it("should define removeContact mutation", () => {
                const removeContact = endpoints?.removeContact;

                expect(removeContact?.name).toBe("removeContact");
                expect(removeContact?.useMutation).toBeDefined();
            });
        });

        describe("exported hooks", () => {
            it("should export useGetContactsQuery hook", () => {
                expect(contactsApiModule?.useGetContactsQuery).toBeDefined();
                expect(contactsApiModule?.useGetContactsQuery).toBe(
                    endpoints?.getContacts.useQuery
                );
            });

            it("should export useAddContactMutation hook", () => {
                expect(contactsApiModule?.useAddContactMutation).toBeDefined();
                expect(contactsApiModule?.useAddContactMutation).toBe(
                    endpoints?.addContact.useMutation
                );
            });

            it("should export useRemoveContactMutation hook", () => {
                expect(
                    contactsApiModule?.useRemoveContactMutation
                ).toBeDefined();
                expect(contactsApiModule?.useRemoveContactMutation).toBe(
                    endpoints?.removeContact.useMutation
                );
            });
        });

        describe("use contactsApi", () => {
            let contactsApiFromStore: any;

            beforeEach(() => {
                const state = storeModule?.store?.getState();
                contactsApiFromStore = state?.contactsApi;
            });

            it("should add contactsApi to the store", () => {
                expect(contactsApiFromStore).toEqual(
                    expect.objectContaining({
                        queries: {},
                        mutations: {},
                        provided: {},
                    })
                );
            });
        });
    });

    describe("3. Use contactsApi", () => {
        it("should render contacts", async () => {
            mockFetchWithContactsData();

            renderWithProvider(<App />);

            const ul = await screen.findByRole("list");
            const lis = ul.querySelectorAll("li");
            const loadingMask = screen.queryByText("Loading...");

            expect(loadingMask).toBeNull();
            expect(ul).toBeInTheDocument();
            expect(lis.length).toBe(2);
        });

        describe("add contact", () => {
            it("should add contact using API", async () => {
                mockFetchWithContactsData();
                renderWithProvider(<App />);

                const nameInput = await screen.findByPlaceholderText(
                    "Contact Name"
                );
                const phoneInput = await screen.findByPlaceholderText(
                    "Phone Number"
                );
                const addContactButton = await screen.findByText("Add Contact");

                act(() => {
                    fireEvent.change(nameInput, {
                        target: { value: newName },
                    });
                    fireEvent.change(phoneInput, {
                        target: { value: newPhoneNumber },
                    });

                    fireEvent.click(addContactButton);
                });

                await waitFor(() => Promise.resolve());

                expect(fetch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: "POST",
                        url: "http://localhost:3033/api/contacts/",
                        body: Buffer.from(
                            JSON.stringify({
                                name: newName,
                                phone: newPhoneNumber,
                            })
                        ),
                    })
                );
            });

            it("should refetch after adding contact", async () => {
                mockFetchWithContactsData();
                renderWithProvider(<App />);

                const nameInput = await screen.findByPlaceholderText(
                    "Contact Name"
                );
                const phoneInput = await screen.findByPlaceholderText(
                    "Phone Number"
                );
                const addContactButton = await screen.findByText("Add Contact");

                act(() => {
                    fireEvent.change(nameInput, {
                        target: { value: newName },
                    });
                    fireEvent.change(phoneInput, {
                        target: { value: newPhoneNumber },
                    });

                    fireEvent.click(addContactButton);
                });

                await waitFor(() => Promise.resolve());

                expect(getContactsCallCount).toBe(2);
            });
        });

        describe("remove contact", () => {
            it("should add contact using API", async () => {
                mockFetchWithContactsData();
                renderWithProvider(<App />);

                const removeButtons = await screen.findAllByText("Remove");

                act(() => {
                    fireEvent.click(removeButtons[1]);
                });

                await waitFor(() => Promise.resolve());

                expect(fetch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        method: "DELETE",
                        url: `http://localhost:3033/api/contacts/${contacts[1].id}`,
                    })
                );
            });

            it("should refetch after adding contact", async () => {
                mockFetchWithContactsData();
                renderWithProvider(<App />);

                const removeButtons = await screen.findAllByText("Remove");

                act(() => {
                    fireEvent.click(removeButtons[1]);
                });

                await waitFor(() => Promise.resolve());

                expect(getContactsCallCount).toBe(2);
            });
        });
    });

    describe("4. Adding a new state slice to the store", () => {
        afterEach(() => {
            if (
                storeModule?.store?.dispatch &&
                infoSliceModule?.resetLastAction
            ) {
                storeModule?.store?.dispatch(
                    infoSliceModule?.resetLastAction()
                );
            }
        });

        it("should have a src/features/contactsApi file", () => {
            expect(infoSliceModule).not.toBeNull();;
        });

        it("should add slice to store", () => {
            const state = storeModule?.store?.getState();

            expect(infoSliceModule?.infoSlice?.name).toBe("info");
            expect(state?.info).toBeDefined();
        });

        it("lastAction should be null intially", () => {
            const state = storeModule?.store?.getState();

            expect(state?.info.lastAction).toBeNull();
        });

        it("setLastAction should be defined and exported", () => {
            expect(infoSliceModule?.setLastAction).toBeDefined();
        });

        it("resetLastAction should be defined and exported", () => {
            expect(infoSliceModule?.resetLastAction).toBeDefined();
        });
    });

    describe('5. Updating "info" when a user performs an action', () => {
        it("should show 'No Updates...' text by default", async () => {
            mockFetchWithContactsData();
            renderWithProvider(<App />);

            const noUpdateTextElement = await screen.findByText(
                "No Updates in This Session"
            );

            expect(noUpdateTextElement).toBeInTheDocument();
            expect(noUpdateTextElement?.className).toBe("info-last-action");
        });

        it("should show the remove action was the last after it", async () => {
            mockFetchWithContactsData();
            renderWithProvider(<App />);

            const removeButtons = await screen.findAllByText("Remove");

            act(() => {
                fireEvent.click(removeButtons[1]);
            });

            await waitFor(() => Promise.resolve());

            const lastActionElement =
                document.querySelector(".info-last-action");

            expect(lastActionElement?.textContent).toBe(
                "Last Action: Remove Contact"
            );
        });

        it("should show the add action was the last after it", async () => {
            mockFetchWithContactsData();
            renderWithProvider(<App />);

            const nameInput = await screen.findByPlaceholderText(
                "Contact Name"
            );
            const phoneInput = await screen.findByPlaceholderText(
                "Phone Number"
            );
            const addContactButton = await screen.findByText("Add Contact");

            act(() => {
                fireEvent.change(nameInput, {
                    target: { value: newName },
                });
                fireEvent.change(phoneInput, {
                    target: { value: newPhoneNumber },
                });

                fireEvent.click(addContactButton);
            });

            await waitFor(() => Promise.resolve());

            const lastActionElement =
                document.querySelector(".info-last-action");

            expect(lastActionElement?.textContent).toBe(
                "Last Action: Add Contact"
            );
        });
    });
});
