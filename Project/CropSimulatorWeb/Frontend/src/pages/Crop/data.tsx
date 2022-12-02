export const nameData: string[] = ['CRPNAM']

export const emergenceData: string[] = ['TBASEM', 'TEFFMX', 'TSUMEM']

export const phenologyData: string[] = [
  'IDSL',
  'DLO',
  'DLC',
  'TSUM1',
  'TSUM2',
  'DTSMTB',
  'DVSI',
  'DVSEND',
]

export const initialData: string[] = ['TDWI', 'LAIEM', 'RGRLAI']

export const greenAreaData: string[] = ['SLATB', 'SPA', 'SSATB', 'SPAN', 'TBASE']

export const assimilationData: string[] = ['KDIFTB', 'EFFTB', 'AMAXTB', 'TMPFTB', 'TMNFTB']

export const conversionOfAssimilatesIntoBiomassData: string[] = ['CVL', 'CVO', 'CVR', 'CVS']

export const maintenanceRespirationData: string[] = ['Q10', 'RML', 'RMO', 'RMR', 'RMS', 'RFSETB']

export const partitioningData: string[] = ['FRTB', 'FLTB', 'FSTB', 'FOTB']

export const deathRatesData: string[] = ['PERDL', 'RDRRTB', 'RDRSTB']

export const waterUseData: string[] = ['CFET', 'DEPNR', 'IAIRDU', 'IOX']

export const rootingData: string[] = ['RDI', 'RRI', 'RDMCR']

export const inStorageOrgansData: string[] = [
  'NMINSO',
  'NMAXSO',
  'PMINSO',
  'PMAXSO',
  'KMINSO',
  'KMAXSO',
]

export const inVegetativeOrgansData: string[] = [
  'NMINVE',
  'NMAXVE',
  'PMINVE',
  'PMAXVE',
  'KMINVE',
  'KMAXVE',
]

export const nutrientsData: string[][] = [
  inStorageOrgansData,
  inVegetativeOrgansData,
  ['YZERO', 'NFIX'],
]

export const cropKeys: string[] = [
  'CRPNAM',
  'TBASEM',
  'TEFFMX',
  'TSUMEM',
  'IDSL',
  'DLO',
  'DLC',
  'TSUM1',
  'TSUM2',
  'DTSMTB',
  'DVSI',
  'DVSEND',
  'TDWI',
  'LAIEM',
  'RGRLAI',
  'SLATB',
  'SPA',
  'SSATB',
  'SPAN',
  'TBASE',
  'KDIFTB',
  'EFFTB',
  'AMAXTB',
  'TMPFTB',
  'TMNFTB',
  'CVL',
  'CVO',
  'CVR',
  'CVS',
  'Q10',
  'RML',
  'RMO',
  'RMR',
  'RMS',
  'RFSETB',
  'FRTB',
  'FLTB',
  'FSTB',
  'FOTB',
  'PERDL',
  'RDRRTB',
  'RDRSTB',
  'CFET',
  'DEPNR',
  'IAIRDU',
  'IOX',
  'RDI',
  'RRI',
  'RDMCR',
  'NMINSO',
  'NMAXSO',
  'PMINSO',
  'PMAXSO',
  'KMINSO',
  'KMAXSO',
  'NMINVE',
  'NMAXVE',
  'PMINVE',
  'PMAXVE',
  'KMINVE',
  'KMAXVE',
  'YZERO',
  'NFIX',
]

export const descriptions: any = {
  CRPNAM: 'crop name',
  TBASEM: 'lower threshold temp. for emergence [cel]',
  TEFFMX: 'max. eff. temp. for emergence [cel]',
  TSUMEM: 'temperature sum from sowing to emergence [cel d]',
  IDSL: 'indicates whether pre-beet growth development depends on temp. (=0), daylength (=1) , or both (=2)',
  DLO: 'optimum daylength for development [hr]',
  DLC: 'critical daylength (lower threshold) [hr]',
  TSUM1: 'temp. sum from emergence to init. beet growth [cel d]',
  TSUM2: 'temp. sum from init. beet growth to maturity [cel d]',
  DTSMTB: 'daily increase in temp. sum as function of av. temp. [cel; cel d]',
  DVSI: 'initial DVS',
  DVSEND: 'development stage at harvest (in this case a dummy)',
  TDWI: 'initial total crop dry weight [kg ha-1]',
  LAIEM: 'leaf area index at emergence [ha ha-1]',
  RGRLAI: 'maximum relative increase in LAI [ha ha-1 d-1]',
  SLATB: 'specific leaf area as a function of DVS [-; ha kg-1]',
  SPA: 'specific pod area [ha kg-1]',
  SSATB: 'specific stem area [ha kg-1] as function of DVS',
  SPAN: 'life span of leaves growing at 35 Celsius [d]',
  TBASE: 'lower threshold temp. for ageing of leaves [cel]',
  KDIFTB: 'extinction coefficient for diffuse visible light [-]  as function of DVS',
  EFFTB: 'light-use effic. single leaf [kg ha-1 hr-1 j-1 m2 s] as function of daily mean temp.',
  AMAXTB: 'max. leaf CO2 assim. rate function of DVS [-; kg ha-1 hr-1]',
  TMPFTB: 'reduction factor of AMAX as function of av. temp. [cel; -]',
  TMNFTB: 'red. factor of gross assim. rate as function of low min. temp. [cel; -]',
  CVL: 'efficiency of conversion into leaves [kg kg-1]',
  CVO: 'efficiency of conversion into storage org. [kg kg-1]',
  CVR: 'efficiency of conversion into roots [kg kg-1]',
  CVS: 'efficiency of conversion into stems [kg kg-1]',
  Q10: 'rel. incr. in resp. rate per 10 Cel temp. incr. [-]',
  RML: 'rel. maint. resp. rate leaves [kg CH2O kg-1 d-1]',
  RMO: 'rel. maint. resp. rate stor.org. [kg CH2O kg-1 d-1]',
  RMR: 'rel. maint. resp. rate roots [kg CH2O kg-1 d-1]',
  RMS: 'rel. maint. resp. rate stems [kg CH2O kg-1 d-1]',
  RFSETB: 'red. factor for senescence as function of DVS [-; -]',
  FRTB: 'fraction of total dry matter to roots as a function of DVS [-; kg kg-1]',
  FLTB: 'fraction of above-gr. DM to leaves',
  FSTB: 'fraction of above-gr. DM to stems',
  FOTB: 'fraction of above-gr. DM to stor. org. as a function of DVS [-; kg kg-1]',
  PERDL: 'max. rel. death rate of leaves due to water stress',
  RDRRTB: 'rel. death rate of stems as a function of DVS [-; kg kg-1 d-1]',
  RDRSTB: 'rel. death rate of roots as a function of DVS [-; kg kg-1 d-1]',
  CFET: 'correction factor transpiration rate [-]',
  DEPNR: 'crop group number for soil water depletion [-]',
  IAIRDU: 'air ducts in roots present (=1) or not (=0)',
  IOX: 'oxygen stress disabled',
  RDI: 'initial rooting depth [cm]',
  RRI: 'maximum daily increase in rooting depth [cm d-1]',
  RDMCR: 'maximum rooting depth [cm]',
  NMINSO: 'minimum concentrations of N in storage organs',
  NMAXSO: 'maximun concentrations of N in storage organs',
  PMINSO: 'minimum concentrations of P in storage organs',
  PMAXSO: 'maximun concentrations of P in storage organs',
  KMINSO: 'minimum concentrations of K in storage organs',
  KMAXSO: 'maximun concentrations of K in storage organs',
  NMINVE: 'minimum concentrations of N in vegetative organs',
  NMAXVE: 'maximun concentrations of N in vegetative organs',
  PMINVE: 'minimum concentrations of P in vegetative organs',
  PMAXVE: 'maximun concentrations of P in vegetative organs',
  KMINVE: 'minimum concentrations of K in vegetative organs',
  KMAXVE: 'maximun concentrations of K in vegetative organs',
  YZERO: 'max. amount veg. organs at zero yield [kg ha-1]',
  NFIX: 'fraction of N-uptake from biol. fixation [kg kg-1]',
}

export const types: any = {
  CRPNAM: 'string',
  TBASEM: 'number',
  TEFFMX: 'number',
  TSUMEM: 'number',
  IDSL: 'number',
  DLO: 'number',
  DLC: 'number',
  TSUM1: 'number',
  TSUM2: 'number',
  DTSMTB: 'number[]',
  DVSI: 'number',
  DVSEND: 'number',
  TDWI: 'number',
  LAIEM: 'number',
  RGRLAI: 'number',
  SLATB: 'number[]',
  SPA: 'number',
  SSATB: 'number[]',
  SPAN: 'number',
  TBASE: 'number',
  KDIFTB: 'number[]',
  EFFTB: 'number[]',
  AMAXTB: 'number[]',
  TMPFTB: 'number[]',
  TMNFTB: 'number[]',
  CVL: 'number',
  CVO: 'number',
  CVR: 'number',
  CVS: 'number',
  Q10: 'number',
  RML: 'number',
  RMO: 'number',
  RMR: 'number',
  RMS: 'number',
  RFSETB: 'number[]',
  FRTB: 'number[]',
  FLTB: 'number[]',
  FSTB: 'number[]',
  FOTB: 'number[]',
  PERDL: 'number',
  RDRRTB: 'number[]',
  RDRSTB: 'number[]',
  CFET: 'number',
  DEPNR: 'number',
  IAIRDU: 'number',
  IOX: 'number',
  RDI: 'number',
  RRI: 'number',
  RDMCR: 'number',
  NMINSO: 'number',
  NMAXSO: 'number',
  PMINSO: 'number',
  PMAXSO: 'number',
  KMINSO: 'number',
  KMAXSO: 'number',
  NMINVE: 'number',
  NMAXVE: 'number',
  PMINVE: 'number',
  PMAXVE: 'number',
  KMINVE: 'number',
  KMAXVE: 'number',
  YZERO: 'number',
  NFIX: 'number',
}
