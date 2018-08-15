export const DefaultCharacterState = {
    name: "Guy",
    class: "Fighter",
    hp: "10",
    maxHp: "10",
    level: "1",
    exp: "0",
    gold: "0",
    damage: "d10",
    str: "0",
    dex: "0",
    con: "0",
    int: "0",
    wis: "0",
    cha: "0",
};

export const DefaultInventoryState = {
    name: "",
    items: [
        {
            amount: "",
            type: "",
            name: "",
            description: "",
            active: false,
        },
    ],
};

export const DefaultQuestState = {
    name: "",
    content: "",
    objective: "",
    location: "",
    rewards: "",
    difficulty: "NORMAL",
};

export const DefaultShopState = {
    name: "",
    coins: "0",
    items: [{ name: "", cost: "0", description: "" }],
};
