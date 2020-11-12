declare interface GameData
{
    id: number;
    title: string;
    system: string;
    systemid: number;
    dm: string;
    dmid: number;
    day: string;
    dayid: number;
    time: string;
    timeid: number;
    registermax: number;
    registered: number[];
    waitlistmax: number;
    waitlisted: number[];
    description: string;
}