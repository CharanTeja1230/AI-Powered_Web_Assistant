/* LUMO Providers Module */
export const loadProviders = async () => {
    return [{ name: "LUMO", model: "LUMO Oracle", status: "online" }];
};

export const createClient = () => ({
    sendMessage: async (prompt) => prompt
});

export const providerLocalStorage = {
    get: (key) => localStorage.getItem(key),
    set: (key, val) => localStorage.setItem(key, val)
};

export const captureUserTierHeaders = () => ({ "x-user-tier": "Pro" });
export const mergeToolCalls = (calls) => calls;
export const Puter = { isAvailable: () => false };
