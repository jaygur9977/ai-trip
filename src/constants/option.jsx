import { ChatSession } from "@google/generative-ai";

export const SelectTravelesList=[
    {
        id:1,
        title:"just me",
        dis:"Enjoy your trip!",
        icon:'✈️',
        people:'1',

    },
    {
        id:2,
        title:"A couple",
        dis:"Enjoy your your partner!",
        icon:'🥂',
        people:'2',

    },
    {
        id:3,
        title:"family",
        dis:"Enjoy your with your family & stay safe!",
        icon:'🏡',
        people:'3 to 5',

    },
    {
        id:4,
        title:"friends",
        dis:"enter a world of thrill with friends!",
        icon:'⛵',
        people:'8 to 12',

    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"cheap",
        dis:"stay consious about your cost",
        icon:'💰',

    },
    {
        id:2,
        title:"moderate",
        dis:"Next time try to increase budget!",
        icon:'💵',
   

    },
    {
        id:3,
        title:"Expensive",
        dis:"Enjoy and explore world & stay safe!",
        icon:'💲',
    
    },
    
]

export default { SelectBudgetOptions, SelectTravelesList  };
export const AI_PROMPT="Generate day wise trip plan for Location: {location}, for {totaldays} days for {traveler} with a {budget} budget,  suggest itinerary with place Name, Place Details, Place Image Url,  ticket Pricing, rating, Time travel each of the location for total days with each day plan with best time to visit and give as in JSON format";
