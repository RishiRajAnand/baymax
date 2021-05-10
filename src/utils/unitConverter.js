const gramsSynonyms = ["gm", "grams", "gms", "gram", "g"];
const kiloGramsSynonyms = ["kg", "kilograms", "kgs", "kilogram"];
const milliGramsSynonyms = ["mg", "mgs", "milligrams", "milligram"];
const litresSynonyms = ["lt", "ltr", "litre", "litres"];
const millilitresSynonyms = ["ml", "millilitres", "millilitre"];
export const convertUnit = (input, output) => {
    if (gramsSynonyms.includes(input)) {
        if (kiloGramsSynonyms.includes(output)) {
            // its a gms to kgs conversion
            return 1 / 1000;
        } else if (milliGramsSynonyms.includes(output)) {
            // its a gram to mgs conversion
            return 1 * 1000;
        }
    } else if (kiloGramsSynonyms.includes(input)) {
        if (gramsSynonyms.includes(output)) {
            // its a gms to kgs conversion
            return 1 * 1000;
        } else if (milliGramsSynonyms.includes(output)) {
            // its a gram to mgs conversion
            return 1 * 1000000;
        }
    } else if (milliGramsSynonyms.includes(input)) {
        if (kiloGramsSynonyms.includes(output)) {
            // its a gms to kgs conversion
            return 1 / 1000000;

        } else if (gramsSynonyms.includes(output)) {
            // its a gram to mgs conversion
            return 1 / 1000;
        }
    } else if (litresSynonyms.includes(input)) {
        if (millilitresSynonyms.includes(output)) {
            // its a gms to kgs conversion
            return 1 * 1000;

        }
    } else if (millilitresSynonyms.includes(input)) {
        if (litresSynonyms.includes(output)) {
            // its a gms to kgs conversion
            return 1 / 1000;

        } else if (gramsSynonyms.includes(output)) {
            // its a gram to mgs conversion
            return 1 / 1000;
        }
    }

    return -100;

};

