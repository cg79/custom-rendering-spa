import { IComponentEvent } from "./IComponentEvent";

export type IEventInfo = {
        func:Function,
        id: string
};

export type IEventType = {
    [ key in IComponentEvent ] ?: Array<IEventInfo>
};

export type IEventDeclaration = {
    name: IComponentEvent,
    func:Function,
    id: string,
};
