import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/5310794.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "../lib/axios";
import { notifications } from "@mantine/notifications";
import { Order } from "../lib/models";

export default function OrderPage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const orderCreateForm = useForm({
    initialValues: {
        customer_name: "",
        menu_name: "",
        order_amount: 0,
        comment: "",
    },

    validate: {
      customer_name: isNotEmpty("กรุณาระบุชื่อของคุณ"),
      menu_name: isNotEmpty("กรุณาระบุชื่อเมนูที่ต้องการสั่ง"),
      order_amount: (value) =>
        value > 0 ? null : "กรุณาระบุจำนวนที่ต้องการสั่ง",
    },
  });

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await api.post<{
        message: string;
        order: Order;
      }>(`/orders`, values);
      notifications.show({
        title: "เพิ่มข้อมูลหนังสือสำเร็จ",
        message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/orders/${response.data.order.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } 
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">สั่งกาแฟ</h1>
          <h2>เลือกเมนูกาแฟของคุณที่ต้องการสั่ง</h2>
        </section>

        <Container className="mt-8">
            <h1 className="text-xl">สั่งกาแฟของคุณที่นี่!</h1>

            <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
                label="ชื่อของคุณ"
                placeholder="ชื่อของคุณ"
                {...orderCreateForm.getInputProps("customer_name")}
            />

            <TextInput
                label="เมนูที่ต้องการสั่ง"
                placeholder="เมนูที่ต้องการสั่ง"
                {...orderCreateForm.getInputProps("menu_name")}
            />
            <NumberInput
                label="จำนวนที่ต้องการสั่ง"
                placeholder="จำนวนที่ต้องการสั่ง"
                {...orderCreateForm.getInputProps("order_amount")}
            />
            <TextInput
                label="หมายเหตุ"
                placeholder="หมายเหตุ"
                {...orderCreateForm.getInputProps("comment")}
            />
            <Divider />

            <Button type="submit" loading={isProcessing}>
                บันทึกข้อมูล
            </Button>
            </form>
        </Container>
        <br></br>
      </Layout>
    </>
  );
}
