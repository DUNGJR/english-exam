import Slider from "react-slick";
import { Image } from "antd";

const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return (
<div className="grid" style={{ marginTop: '20px', boxShadow: '5px 5px 5px #ccc' }}>
      <Slider {...settings}>
        {arrImages.map((image) => {
          return <Image src={image} alt="slider" width="100%" height="500px" preview={false}></Image>;
        })}
      </Slider>
    </div>
  );
};
export default SliderComponent;
