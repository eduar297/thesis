export const nameData: string[] = ['SOLNAM']

export const soilWaterRetentionData: string[] = ['SMTAB', 'SMW', 'SMFCF', 'SM0', 'CRAIRC']

export const hydraulicConductivityData: string[] = ['CONTAB', 'K0', 'SOPE', 'KSUB', 'RDMSOL']

export const soilWorkabilityParametersData: string[] = [
  'SPADS',
  'SPODS',
  'SPASS',
  'SPOSS',
  'DEFLIM',
]

export const soilKeys: string[] = [
  'SOLNAM',
  'SMTAB',
  'SMW',
  'SMFCF',
  'SM0',
  'CRAIRC',
  'CONTAB',
  'K0',
  'SOPE',
  'KSUB',
  'RDMSOL',
  'SPADS',
  'SPODS',
  'SPASS',
  'SPOSS',
  'DEFLIM',
]

export const descriptions: any = {
  SOLNAM: 'soil name',
  SMTAB: 'vol. soil moisture content as function of pF [log (cm); cm3 cm-3]',
  SMW: 'soil moisture content at wilting point [cm3/cm3]',
  SMFCF: 'soil moisture content at field capacity [cm3/cm3]',
  SM0: 'soil moisture content at saturation [cm3/cm3]',
  CRAIRC: 'critical soil air content for aeration [cm3/cm3]',
  CONTAB: '10-log hydraulic conductivity as function of pF [log (cm); log (cm/day)]',
  K0: 'hydraulic conductivity of saturated soil [cm day-1]',
  SOPE: 'maximum percolation rate root zone[cm day-1]',
  KSUB: 'maximum percolation rate subsoil [cm day-1]',
  RDMSOL: 'maximum soil rootable depth [cm]',
  SPADS: '1st topsoil seepage parameter deep seedbed',
  SPODS: '2nd topsoil seepage parameter deep seedbed',
  SPASS: '1st topsoil seepage parameter shallow seedbed',
  SPOSS: '2nd topsoil seepage parameter shallow seedbed',
  DEFLIM: 'required moisture deficit deep seedbed',
}

export const types: any = {
  SOLNAM: 'string',
  SMTAB: 'number[]',
  SMW: 'number',
  SMFCF: 'number',
  SM0: 'number',
  CRAIRC: 'number',
  CONTAB: 'number[]',
  K0: 'number',
  SOPE: 'number',
  KSUB: 'number',
  RDMSOL: 'number',
  SPADS: 'number',
  SPODS: 'number',
  SPASS: 'number',
  SPOSS: 'number',
  DEFLIM: 'number',
}
