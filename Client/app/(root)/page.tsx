import Baner from "../../components/landingpage/Baner";
import Category from "../../components/landingpage/Category";
import Carsection from "../../components/landingpage/Carsection";
import Howsection from "@/components/landingpage/Howsection";
import Whysection from "@/components/landingpage/Whysection";
import Testimonial from "@/components/landingpage/Testimonialsection";

export default function Home() {
  return (
    <div>
      <Baner />
      {/* <Category /> */}
      <Carsection/>
      {/* <Howsection/> */}
      <Whysection/>
      <Testimonial/>
    </div >
  );
}
