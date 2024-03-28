import React from "react";
import classes from "./Description.module.css";
// import img1 from "../../images/imgg1.png";

const Description = () => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1><span className={classes.highlight}>How</span> we <span className={classes.highlight}>Serve</span> You</h1>
      </div>
      <div className={classes.imgContainer}>

          <div className={classes.img_div}>
            <div className={classes.main_img}>
              <img src="../../images/imgg4.png" alt="img1" />
            </div>
            <div className={classes.img_description}>
              <span className={classes.img_span1}>Automated Packaging</span>
              <span className={classes.img_span2}>100% ensulated packing</span>

          </div>
        </div>
        <div className={classes.img_div}>
        <div className={classes.main_img}>
            <img src="../../images/imgg1.png" alt="img2" />
          </div>
          <div className={classes.img_description}>
            <span className={classes.img_span1}>Packed with Love</span>
            <span className={classes.img_span2}>
              We deliever the best experience.
            </span>
          </div>
        </div>
        <div className={classes.img_div}>
          <div className={classes.main_img}>
            <img src="../../images/imgg2.png" alt="img3" />
          </div>
          <div className={classes.img_description}>
            <span className={classes.img_span1}>Packed with Love</span>
            <span className={classes.img_span2}>
              We deliever the best experience.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
