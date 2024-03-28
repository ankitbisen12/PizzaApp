import React from 'react';
import Image from 'next/image';
import classes from './HeaderImg.module.css'
import mealsImage from '../../assets/meals.jpg';

const HeaderImg = () => {
  return (
    <div className={classes["main-image"]}>
        <Image
          src={mealsImage}
          alt="Picture of the author"
          width={1000}
          height={500}
        />
        {/* <img src='/images/mealsImage.jpg' alt="A table full of delicious food!" /> */}
      </div>
  )
}

export default HeaderImg