declare interface GameData
{
    id: number;
    title: string;
    systemid: number;
    dmid: number;
    dayid: number;
    timeid: number;
    registermax: number;
    registered: number[];
    waitlistmax: number;
    waitlisted: number[];
    description: string;
}