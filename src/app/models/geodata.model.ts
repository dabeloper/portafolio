export class GeoData {
    ip: string;
    isp: string;
    location: {
        country: string,
        region: string,
        city: string,
        lat: number,
        lng: number,
        postalCode: string, 
        timezone: string,
        geonameId: number,
    };
    domains: [];
    as: {
        asn: number,
        name: string,
        route: string,
        domain: string,
        type: string
    };
    proxy: {
        proxy: boolean;
        vpn: boolean;
        tor: boolean
    };

  constructor(data?: any) {
    data = data || {};
    this.ip = data.ip || '';
    this.isp = data.isp || '';
    this.location = data.location;
    this.domains = data.domains;
    this.as = data.as;
    this.proxy = data.proxy;
  }
}
