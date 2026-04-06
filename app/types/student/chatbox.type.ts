export interface IChatBoxMessage {
    ask: string;
};
export interface IChatBoxResponse {
    message: string;
}
export interface IMessage {
    role: "user" | "assistant";
    content: string;
};