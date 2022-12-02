export const nameData: string[] = ['SITENAM']

export const siteData: string[] = ['IFUNRN', 'NOTINF', 'SSI', 'SSMAX', 'WAV', 'SMLIM']

export const siteKeys: string[] = ['SITENAM', 'IFUNRN', 'NOTINF', 'SSI', 'SSMAX', 'WAV', 'SMLIM']

export const descriptions: any = {
  SITENAM: 'site name',
  IFUNRN:
    'Indicates whether non-infiltrating fraction of rain is a function of storm size (1) or not (0). Default 0.',
  NOTINF: 'Maximum fraction of rain not-infiltrating into the soil [0-1], default 0.',
  SSI: 'Maximum depth of water that can be stored on the soil surface [cm].',
  SSMAX: 'Initial depth of water stored on the surface [cm].',
  WAV: 'Initial amount of water in total soil profile [cm].',
  SMLIM: 'Initial maximum moisture content in initial rooting depth zone [0-1], default 0.4.',
}

export const types: any = {
  SITENAM: 'string',
  IFUNRN: 'number',
  NOTINF: 'number',
  SSI: 'number',
  SSMAX: 'number',
  WAV: 'number',
  SMLIM: 'number',
}
