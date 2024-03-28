import React from 'react'
import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'


const Meals = (props) => {
  // console.log(props);
  return (
    <React.Fragment>
        <MealsSummary/>
        <AvailableMeals pizzas={props.pizza}/>
    </React.Fragment>
  )
}

export default Meals