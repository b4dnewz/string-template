import { engine, template } from "../src";

describe("string-template", () => {

    const testStr = "That's an awfully hot {item}, did {person} kill himself? Probably {answer}.";
    const outStr = "That's an awfully hot coffee pot, did Jeffrey Epstein kill himself? Probably not.";
    const params = {
        answer: "not",
        item: "coffee pot",
        person: "Jeffrey Epstein",
    };

    it("should return when no parameters match on string", () => {
        const str = "This string has no interpolation.";
        expect(template(str, { foo: "bar" })).toEqual(str);
    });

    it("should throw error when unexisting properties are found", () => {
        expect(() => {
            template(testStr, {
                month: "october",
            });
        }).toThrowError(/invalid/);
    });

    it("should ignore error with options", () => {
        expect(() => {
            template(testStr, {
                month: "october",
            }, {
                ignoreErrors: true,
            });
        }).not.toThrow();
    });

    it("should replace object mapped values", () => {
        expect(template(testStr, params)).toEqual(outStr);
    });

    it("should support custom replace pattern", () => {
        const str = "That's an awfully hot :item, did :person kill himself? Probably :answer.";
        expect(template(str, params, {
            pattern: ":%s",
        })).toEqual(outStr);
    });

    it("should support multiple parameters on string", () => {
        const str = "The {animal} {animal} went over the {animal}.";
        expect(template(str, {
            animal: "fox",
        })).toEqual(
            "The fox fox went over the fox.",
        );
    });

    it("should support dot notation", () => {
        const str = "That's an {item.description} hot {item.name}, did {person.name} kill himself? Probably {answer}.";
        expect(template(str, {
            answer: "not",
            item: {
                description: "awfully",
                name: "coffee pot",
            },
            person: {
                name: "Jeffrey Epstein",
            },
        })).toEqual(outStr);
    });

    describe("engine", () => {

        it("should return a function", () => {
            const t = engine({});
            expect(typeof t).toEqual("function");
        });

        it("should use default properties", () => {
            const str = "That's an awfully hot {{item}}, did {{person}} kill himself? Probably {{answer}}.";
            const t = engine({
                pattern: "{{%s}}",
            });
            expect(t(str, {
                answer: "not",
                item: "coffee pot",
                person: "Jeffrey Epstein",
            })).toEqual(outStr);
        });

    });

})