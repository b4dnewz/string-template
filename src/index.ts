interface IReplacements {
    [key: string]: any;
}

interface IFormatOptions {
    pattern?: string;
    ignoreErrors?: boolean;
}

const wordPattern = "(?!\\.)([a-zA-Z0-9_.]+)(?<!\\.)";
const defaultPattern = "{%s}";

/**
 * Gets an object property with dot notation support
 */
function get(object: any, path: string | string[]): any {
    path = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, ".$2").split(".");
    object = object[path[0]];
    if (object && path.length > 1) {
        return get(object, path.slice(1));
    }
    return object;
}

/**
 * Replace template variables found in string with object name mapped values
 */
export function template(str: string, props: IReplacements, options: IFormatOptions = {}) {
    const matches: any = {};
    const pattern = options.pattern || defaultPattern;
    const capturePattern = pattern.replace("%s", wordPattern);
    const reg = new RegExp(capturePattern, "gm");

    let match = null;

    do {

        match = reg.exec(str);

        if (match !== null) {
            const [, key] = match;

            if (typeof matches[key] !== "undefined") {
                continue;
            }

            const val = get(props, key);

            if (typeof val === "undefined" && !options.ignoreErrors) {
                throw new Error(`Found invalid property "${key}" value is missing from replacements.`);
            }

            matches[key] = val;
        }

    } while (match);

    // When no replace matches are found return the string as it is
    if (Object.keys(matches).length === 0) { return str; }

    // Iterate through matches and replace them
    for (const key in matches) {
        if (matches.hasOwnProperty(key)) {
            const keyPattern = pattern.replace("%s", key);
            str = str.replace(new RegExp(keyPattern, "g"), matches[key]);
        }
    }

    return str;
}

/**
 * Creates a new template engine function with default parameters
 */
export function engine(options: IFormatOptions) {
    return (str: string, props: IReplacements, opts?: IFormatOptions) => {
        return template(str, props, {
            ...options,
            ...opts,
        });
    };
}

export default template;
