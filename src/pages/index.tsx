import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things
            โค้ดชุดนี้เป็นโค้ดตัวอย่างในหัวข้อ Hono และ React ในวิชานี้
          </p>

          <div>
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
          <h1 className="text-3xl font-bold mb-4">
             ยินดีต้อนรับสู่ คาเฟ่ของผม
          </h1>
          <p className="text-2xl">
            ผม <span className="font-semibold">เน๊ตเต้ ปิยพล อินทร์ตลาดชุม </span> 
            รหัสประจำตัวนักศึกษา <span className="font-mono"> 66070118 </span> 
            ขอเชิญทุกคนมาสัมผัสบรรยากาศสุดชิลในคาเฟ่แห่งนี้
          </p>
          <p className="mt-3">
            คาเฟ่นี้มีเสน่ห์ไม่เหมือนใคร ที่จอดรถกว้างถึง <span className="font-semibold">8 ลี้ </span> 
            มาพร้อมมุมถ่ายรูปสุดเก๋ ชิงช้าให้นั่งเล่นสบาย ๆ  
            และความบันเทิงแบบไม่ต้องลงทุน—เพราะแค่เห็นหน้าพนักงานและเจ้าของร้าน 
            ก็ตลกรับประทานแล้ว 😂
          </p>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
