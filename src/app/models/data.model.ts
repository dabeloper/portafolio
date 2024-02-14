export interface DataModel {
    id: number;
    type: string;
    content: {
        title: string;
        subtitle?: string;
        description: string;
    }
    img: {
        src?: string,
        width?: string,
        height?: string,
        alt?: string,
    },
    style?: {
        class?: string,
        plainStyle?: string,
    },
    lang?: string;
}