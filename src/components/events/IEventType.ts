import { IComponentEvent } from "./IComponentEvent";

export type IEventInfo = {
        func:Function,
        id: string
};

export type IEventType = {
    [ key in IComponentEvent ] ?: Array<IEventInfo>
};