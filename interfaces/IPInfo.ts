// created by ZL(lzhx@bu.edu), to carry IP information type
// this is not used in the current version
// as the current IPCheck require only ip string but no other info
// yet this is kept in case of further need

export interface IPInfo {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
    readme: string;
}