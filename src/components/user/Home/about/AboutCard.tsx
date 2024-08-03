import React from "react";
interface Props {
  className?: string;
  title?: string;
  description?: string;
  Icon: any;
}
const AboutCard = ({ className, title, Icon, description }: Props) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className={`w-[100vw] md:w-[25%] z-50 dark:bg-gray-900 bg-white h-[50%] md:h-[90%] shadow-xl rounded-lg mt-10 ${className}`}
    >
      <div className="flex w-full justify-center">
        <img src="/newIcon.png" className="w-20 h-24 object-cover " alt="" />
      </div>
      <h3 className="text-center">{title}</h3>
      <div className="flex w-[90%] md:w-[80%] mx-auto mt-5 items-center justify-center">
        <p className="text-left">{description}</p>
      </div>
    </div>
  );
};

export default AboutCard;
