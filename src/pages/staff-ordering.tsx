import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/5310794.jpg";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Alert, Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "../lib/axios";
import { notifications } from "@mantine/notifications";
import { Order } from "../lib/models";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Staff_OrderPage() {
    const { data: orders, error } = useSWR<Order[]>("/orders");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
            
          <h1 className="text-5xl mb-2">รายการสั่งกาแฟทั้งหมด</h1>
          <h2>จัดการรายการกาแฟภายในร้าน</h2>
        </section>
        <section className="container mx-auto py-8">
            <div className="flex justify-between">
            <h1>รายการหนังสือ</h1>
          </div>

          {!orders && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {orders?.map((order) => (
              <div className="border border-solid border-neutral-200" key={order.id}>
                <img
                  src="https://placehold.co/150x200"
                  alt={order.menu_name}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{order.menu_name}</h2>
                  <p className="text-xs text-neutral-500">โดย {order.customer_name}</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button component={Link} to={`/orders/${order.id}`} size="xs" variant="default">
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        </Layout>
    </>
  );
}
