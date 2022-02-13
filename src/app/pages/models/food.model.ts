export class FoodModel {
  
    constructor( 
        public id: number,
        public resName: string, 
        public name: string, 
        public img: string, 
        public price: number, 
        public qty: number, 
        public userId: string, 
       ){
      
    }
}