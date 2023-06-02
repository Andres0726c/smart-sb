export interface Coverage{
  businessRules: Object,
  claimReservation:[],
  clauses:[],
  complementaryData:[],
  deductibles:[],
  description: string,
  events:{},
  id:number,
  name:string,
  payRollData:[],
  rates:[],
  waitingTime:Object
}

// export interface BusinessRules{
//   initializeRule: [],
//   selectionRule:[],
//   validateRule: [],
// }
