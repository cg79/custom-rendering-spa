import { IComponentEvent } from "./IComponentEvent";

export type IEventType = {
    [ key in IComponentEvent ] ?: Function;
};