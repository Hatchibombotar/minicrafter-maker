export type Preset = {
    name?: string;
    image: string;
    version: number;
    elements: {
        [key: string]: [string[], Colour?];
    };
}

export type Colour = [number, number, number]

export type ElementList = {
    id: string;
    elements: string[];
    parts: {
        [key: string]: {
            elements: string[];
            colour: boolean;
        }
    };
    currentlySelected: string[];
    colour: Colour;
    defaultColours: Colour[];
    customColours?: boolean;
    limitSelections?: boolean;
    showElements?: boolean;
}[];